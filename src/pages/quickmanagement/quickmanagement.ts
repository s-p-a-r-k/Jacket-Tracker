import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController } from 'ionic-angular';

import { AngularFireDatabase, DatabaseSnapshot } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import { LoggedinPage } from '../loggedin/loggedin';
import { CustomEmailPage } from '../customEmail/customEmail';

import { Events } from 'ionic-angular';

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
  selectAll = false;
  itemarr = [];
  arrChosen = [];
  radioOpen = false;
  radioResult: any;
  equipRecordRef;
  studentRecordRef;

  constructor(public navCtrl: NavController, private afDB: AngularFireDatabase, public alertCtrl: AlertController, private afAuth: AngularFireAuth, public events: Events) {
    this.items = afDB.list('students').valueChanges();
    this.items.subscribe(_afDB => {this.itemarr = _afDB})
    this.equipRecordRef = this.afDB.list('equipment');
    this.studentRecordRef = this.afDB.list('students');

    console.log('========================================');
    console.log(this.items);
    console.log('========================================');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuickmanagementPage');
  }

  backToHome() {
    this.navCtrl.setRoot(LoggedinPage);
  }

  allChecked() {
    if (this.selectAll) {
      this.selectAll = false;
    } else {
      this.selectAll = true;
    }
  }

  checked(item) {
    console.log(item);
    if (item.selected) {
      this.arrChosen.push(item);
      this.arrChosen = this.arrChosen.reduce((x,y) => x.findIndex(e => e.email==y.email) < 0 ? [...x, y]: x, []);
    } else {
      this.arrChosen.splice(this.arrChosen.indexOf(item), 1);
    }
  }

  quickManageSubmit(selectedAction) {
      if (selectedAction == "email") {
        console.log('email option selected');
        this.chooseEmail();
      } else if (selectedAction == "uniform"){
        console.log('uniform status option selected');
        this.doRadio();

        this.equipRecordRef.update('Jacket/17', {status: 'dirty'});

        this.doRadio();
        this.equipRecordRef.update('Sash/7', {status: 'alteration needed'});
      } else {
        console.log('student information option selected');
      }
  }

  updateStatus(result, student, equiptype) {
    this.arrChosen[student].equipment[equiptype].status = this.radioResult;
  }

  chooseEmail() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose Email Type');

    alert.addInput({
      type: 'radio',
      label: 'Default Email',
      value: 'DefaultEmailPage',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Custom Email',
      value: CustomEmailPage
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {

        console.log('Radio data:', data);

        let navTransition = alert.dismiss().then(() => {this.navCtrl.push(data, {arrChosen: this.arrChosen})});

        //this.radioResult = data;

        return false;
      }
    });

    alert.present();
  }

  doRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose status');

    alert.addInput({
      type: 'radio',
      label: 'Clean',
      value: 'clean',
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
        let navTransition = alert.dismiss().then(() => {this.radioResult = data});

        //this.radioResult = data;

        return false;
      }
    });

    alert.present();
  }
  doPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Choose status',
      message: 'Enter status',
      inputs: [
        {
          name: 'status',
          placeholder: 'Status'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: () => {
            console.log('Saved clicked');
          }
        }
      ]
    });

    alert.present();
  }

}