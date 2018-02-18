import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { LoginPage } from '../login/login';
import { CreateaccountPage } from '../createaccount/createaccount';
import { UniformCheckoutPage } from '../uniformCheckout/uniformCheckout';

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})
export class LandingPage {

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}
  logIn() {
    this.navCtrl.push(LoginPage);
  }
  createAcc() {
    this.navCtrl.push(CreateaccountPage);
  }
  uniformCheckout() {
    this.navCtrl.push(UniformCheckoutPage);
  }
}
