import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { ResetPasswordPage } from '../resetPassword/resetPassword';
import { ChangeUserEmailPage } from '../changeUserEmail/changeUserEmail';

@Component({
  selector: 'page-accountManagement',
  templateUrl: 'accountManagement.html',
})
export class AccountManagementPage {

  constructor(private navCtrl: NavController) { }

  changeEmail() {
    this.navCtrl.push(ChangeUserEmailPage);
  }

  resetPassword() {
    this.navCtrl.push(ResetPasswordPage);
  }

}
