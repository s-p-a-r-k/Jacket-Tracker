import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import {LoggedinPage} from '../loggedin/loggedin';

/**
 * Generated class for the QuickmanagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quickmanagement',
  templateUrl: 'quickmanagement.html',
})
export class QuickmanagementPage {

  constructor(private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuickmanagementPage');
  }

  backToHome() {
    this.navCtrl.push(LoggedinPage);
  }

}
