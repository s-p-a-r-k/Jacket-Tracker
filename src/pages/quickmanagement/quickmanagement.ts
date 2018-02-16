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
  arrChosen = [];
  radioOpen = false;
  radioResult: any;

  constructor(public navCtrl: NavController, afDB: AngularFireDatabase, public alertCtrl: AlertController) {
    this.items = afDB.list('students').valueChanges();
    console.log('========================================');
    console.log(this.items);
    console.log('========================================');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuickmanagementPage');
  }

  backToHome() {
    this.navCtrl.push(LoggedinPage);
  }

  checked(item) {
    console.log(item);
    this.arrChosen.push(item);
    this.arrChosen = this.arrChosen.reduce((x,y) => x.findIndex(e => e.email==y.email) < 0 ? [...x, y]: x, []);

  }

  quickManageSubmit(selectedAction) {
      if (selectedAction == "email") {
        console.log('email option selected');
      } else if (selectedAction == "uniform"){
        console.log('uniform status option selected');
        console.log(this.arrChosen);
        //for (let student in this.arrChosen) {

       // }
      } else {
        console.log('student information option');
      }
  }

  doRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose status');

    alert.addInput({
      type: 'radio',
      label: 'Clean',
      value: 'new',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Dirty',
      value: 'dirty'
    });

    alert.addInput({
      type: 'radio',
      label: 'Alteration needed',
      value: 'alteration'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        console.log('Radio data:', data);
        this.radioOpen = false;
        this.radioResult = data;
      }
    });

    alert.present();
  }

}