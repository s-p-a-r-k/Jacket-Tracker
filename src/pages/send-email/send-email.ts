import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { HttpClient } from '@angular/common/http';
import { mailgun } from '../../environment';

/**
 * Generated class for the SendEmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send-email',
  templateUrl: 'send-email.html',
})
export class SendEmailPage {

  email: any;

  items: Observable<any[]>;
  itemarr = [];

  private customEmail: FormGroup;
  private arrChosen = [];
  private arrNames = [];
  private emailList = "";

  http: HttpClient;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDB: AngularFireDatabase, private formBuilder: FormBuilder, private alertCtrl: AlertController, http: HttpClient) {
    this.items = afDB.list('email-messages').valueChanges();
    this.items.subscribe(_afDB => {this.itemarr = _afDB})

    this.http = http;

    this.arrChosen = navParams.get('arrChosen');
    for (let student of this.arrChosen) {
      this.arrNames.push(" " + student.firstname + " " + student.lastname);
      this.emailList += student.email + ", ";
    }

    this.customEmail = this.getBlankForm();
  }

  getBlankForm() {
    return this.formBuilder.group({
      subject: [""],
      body: [""]
    });
  }

  sendEmail() {
    if (this.emailList == "" || this.customEmail.value.subject == "" || this.customEmail.value.body == "") {
      this.alertBlank();
    } else {
      this.http.request(
        "POST", "https://api.mailgun.net/v3/" + mailgun.mailgunUrl + "/messages",
        {
          body: "from=sender@example.com&to=" + this.emailList + "&subject=" + this.customEmail.value.subject + "&text=" + this.customEmail.value.body,
          headers: {"Authorization": "Basic " + window.btoa("api:" + mailgun.mailgunApiKey),
          "Content-Type": "application/x-www-form-urlencoded"}
        }).subscribe(success => {
        this.alertSuccess();
        console.log("SUCCESS -> " + JSON.stringify(success));
      }, error => {
        this.alertFailure(JSON.stringify(error));
        console.log("ERROR -> " + JSON.stringify(error));
      });
    }
  }

  alertBlank() {
    let alert = this.alertCtrl.create({
      title: 'Cannot Send Email',
      message: "Not enough information!" + "<br/>" + "One or more fields are empty.",
      buttons: [{
        text: 'OK',
        handler: () => {

        }
      }]
    }).present();
  }

  alertSuccess() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      message: "Successfully sent email to " + this.arrNames + ".",
      buttons: [{
        text: 'OK',
        handler: () => {
          this.customEmail.reset(this.getBlankForm());
        }
      }]
    }).present();
  }

  alertFailure(errorMessage: String) {
    let alert = this.alertCtrl.create({
      title: 'Failure',
      message: 'Reason: ' + errorMessage,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.customEmail.reset(this.getBlankForm());
        }
      }]
    }).present();
  }

  emailSubmit(emailType) {
    if (emailType == "saved") {
      this.email = "saved";
      console.log("saved");
    } else if (emailType == "custom") {
      console.log("custom");
      this.email = "custom";
    }
  }

  chooseAction(action) {
    console.log("Action chose");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendEmailPage');
  }

}
