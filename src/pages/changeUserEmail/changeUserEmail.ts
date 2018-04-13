import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { LandingPage } from '../landing/landing';

@Component({
  selector: 'page-changeUserEmail',
  templateUrl: 'changeUserEmail.html',
})
export class ChangeUserEmailPage {

  private newEmail: FormGroup;

  constructor(private navCtrl: NavController, private fire: AngularFireAuth, private alertCtrl: AlertController, private formBuilder: FormBuilder) {
    this.newEmail = this.getBlankForm();
  }

  getBlankForm() {
    return this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      emailConfirm: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  saveEmail() {
    let userInput = this.newEmail.value;
    if (userInput.email == userInput.emailConfirm) {
      this.fire.auth.currentUser.updateEmail(userInput.email)
        .then(success => {
          this.alertSuccess(JSON.stringify(success));
          this.fire.auth.signOut();
        })
        .catch(error => {
          this.alertFailure(JSON.stringify(error.message));
        });
    } else {
      this.alertFailure('Emails do not match.');
    }
  }

  alertSuccess(message: string) {
    this.alertCtrl.create({
      title: 'Email successfully changed',
      subTitle: message,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.navCtrl.setRoot(LandingPage);
        }
      }]
    }).present();
  }

  alertFailure(message: string) {
    this.alertCtrl.create({
      title: 'Email change failure',
      subTitle: message,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.newEmail.patchValue({email: ''});
          this.newEmail.patchValue({emailConfirm: ''});
        }
      }]
    }).present();
  }
}
