import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

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
  items: Observable<any[]>;

  constructor(public navCtrl: NavController, afDB: AngularFireDatabase) {
    this.items = afDB.list('students').valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuickmanagementPage');
  }

  backToHome() {
    this.navCtrl.push(LoggedinPage);
  }

  quickManageSubmit(selectedAction) {
      if (selectedAction == "email") {
        console.log('email option selected');
      } else if (selectedAction == "uniform"){
        console.log('uniform status option selected');
      } else {
        console.log('student information option');
      }
  }

}