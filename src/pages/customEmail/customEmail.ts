import { Component, ViewChild } from '@angular/core';
import { NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { mailgun } from '../../environment';

@Component({
  selector: 'page-customEmail',
  templateUrl: 'customEmail.html',
})
export class CustomEmailPage {

  private customEmail: FormGroup;
  private arrChosen = [];
  private arrNames = [];
  private emailList = "";

  http: HttpClient;

  constructor(private navParams: NavParams, private formBuilder: FormBuilder, private alertCtrl: AlertController, http: HttpClient) {
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

  send() {
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
}
