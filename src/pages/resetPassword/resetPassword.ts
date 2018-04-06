import { Component, ViewChild } from '@angular/core';
import { IonicPage, AlertController, NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-resetPassword',
  templateUrl: 'resetPassword.html',
})
export class ResetPasswordPage {

  @ViewChild('email') email;

  constructor(private fire: AngularFireAuth, private alertCtrl: AlertController, private navCtrl: NavController) {
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Password successfully reset',
      subTitle: message,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.navCtrl.pop();
        }
      }]
    }).present();
  }

  resetPassword() {
    this.fire.auth.sendPasswordResetEmail(this.email.value)
      .then(() => {
        this.alert('Please check your email to reset your password')
        console.log('email sent');
      })
      .catch( error => {
        console.log('got an error', error);
        this.alert(error.message);
      });
  }

}
