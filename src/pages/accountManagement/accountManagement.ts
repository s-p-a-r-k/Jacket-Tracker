import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { ResetPasswordPage } from '../resetPassword/resetPassword';

@Component({
  selector: 'page-accountManagement',
  templateUrl: 'accountManagement.html',
})
export class AccountManagementPage {

  constructor(private fire: AngularFireAuth, private navCtrl: NavController) { }

  changeEmail() {

  }

  resetPassword() {
    this.navCtrl.push(ResetPasswordPage);
  }

}
