import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-emailManagement',
  templateUrl: 'emailManagement.html',
})
export class EmailManagementPage {

  private newEmail: FormGroup;

  constructor(private fire: AngularFireDatabase, private formBuilder: FormBuilder, private alertCtrl: AlertController) {
    this.newEmail = this.getBlankForm();
  }

  getBlankForm() {
    return this.formBuilder.group({
      subject: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  saveEmail() {
    const savedEmailsRef = this.fire.list('email-messages');
    let key = this.newEmail.value.subject;
    let emailToSave = this.reshapeForm();
    this.verifyEmail(key)
      .then(() => {
        savedEmailsRef.set(key, emailToSave)
          .then(() => this.alertSuccess(key));
      })
      .catch((message) => this.alertFailure(message));
  }

  verifyEmail(key: String) {
    const existingEmailRef = this.fire.object('email-messages/' + key);
    return new Promise ((resolve, reject) => {
      existingEmailRef.snapshotChanges()
      .subscribe(res => {
        if (res.payload.val()) {
          reject('An email with that subject already exists.');
        } else {
          resolve();
        }
      });
    });
  }

  reshapeForm() {
    let reshapedEmail = Object.assign({}, this.newEmail.value);
    delete reshapedEmail.subject;
    return reshapedEmail;
  }

  alertSuccess(emailSubject: String) {
    let alert = this.alertCtrl.create({
      title: 'Success',
      message: "Successfully Saved '" + emailSubject + "'.",
      buttons: [{
        text: 'OK',
        handler: () => {
          this.newEmail.reset(this.getBlankForm());
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
          this.newEmail.patchValue({subject: ''});
        }
      }]
    }).present();
  }
}
