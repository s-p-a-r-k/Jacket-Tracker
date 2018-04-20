import { Component } from '@angular/core';
import { IonicPage, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MailService } from '../../service/mail.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


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
  private emailList = [];

  constructor(private navParams: NavParams, private afDB: AngularFireDatabase, private formBuilder: FormBuilder, private alertCtrl: AlertController, private mailer: MailService) {
    this.items = this.afDB.list('email-messages').valueChanges();
    this.items.subscribe(_afDB => {this.itemarr = _afDB});
    this.arrChosen = this.navParams.get('arrChosen');
    for (let student of this.arrChosen) {
      this.arrNames.push(" " + student.firstname + " " + student.lastname);
      this.emailList.push(student.email);
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
    if (this.emailList.length == 0 || this.customEmail.value.subject == "" || this.customEmail.value.body == "") {
      this.alertBlank();
    } else {
      this.mailer.sendMail(this.emailList, this.customEmail.value.subject, this.customEmail.value.body)
        .then(success => console.log(success))
        .catch(error => console.log());
    }
  }

  alertBlank() {
    this.alertCtrl.create({
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
    this.alertCtrl.create({
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
    this.alertCtrl.create({
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
}
