import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';


import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { SendEmailPage } from '../send-email/send-email'


import { Events } from 'ionic-angular';

/**
 * Generated class for the ViewUniformsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-uniforms',
  templateUrl: 'view-uniforms.html',
})
export class ViewUniformsPage {

  items: Observable<any[]>;
  selectAll = false;
  itemarr = [];
  arrChosen = [];
  radioOpen = false;
  radioResult: any;
  equipRecordRef;
  studentRecordRef;
  matchlist: any[];
  returnlist = [];
  len = 0;
  studentRecord: Observable<any[]>;
  studentlist;





  constructor(public navCtrl: NavController, private afDB: AngularFireDatabase, public alertCtrl: AlertController, public events: Events, private navParams: NavParams) {
    this.items = afDB.list('students').valueChanges();
    this.items.subscribe(_afDB => {this.itemarr = _afDB})
    this.studentRecord = afDB.list('students').valueChanges();
    this.studentRecord.subscribe(_afDB => {this.studentlist = _afDB})
    this.equipRecordRef = this.afDB.list('equipment');
    this.studentRecordRef = this.afDB.list('students');
    this.matchlist = navParams.get('match');
    this.returnlist = [];


    console.log('========================================');
    console.log(this.matchlist);
    console.log("Student " + this.studentlist);

    console.log('========================================');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuickmanagementPage');
  }

  allChecked() {
    if (this.selectAll) {
      this.selectAll = false;
    } else {
      this.selectAll = true;
    }
  }

  checked(event, item) {
    if (event.checked) {
      this.arrChosen.push(item);
      this.arrChosen = this.arrChosen.reduce((x,y) => x.findIndex(e => e.email==y.email) < 0 ? [...x, y]: x, []);
    } else {
      this.arrChosen.splice(this.arrChosen.indexOf(item), 1);
    }
  }

  quickManageSubmit(selectedAction) {
      if (selectedAction == "email") {
        console.log('email option selected');
        this.navCtrl.push(SendEmailPage, {arrChosen: this.arrChosen});

      } else if (selectedAction == "uniform"){
        console.log('uniform status option selected');
        this.doRadio();


        this.equipRecordRef.update('Jacket/17', {status: 'dirty'});

        this.doRadio();
        this.equipRecordRef.update('Sash/7', {status: 'alteration needed'});
      } else if (selectedAction == "student"){
        console.log('student information option selected');

      } else if (selectedAction == "return"){
        this.arrChosen.forEach(item => this.returnlist.push(item.equipment));
        for (var i = 0; i < this.returnlist.length; i++) {

          for (var name1 in this.returnlist[i]) {

            this.equipRecordRef.update(name1 + "/" + this.returnlist[i][name1].id, {student: ''});
          }
        }
      }
  }

  updateStatus(result, student, equiptype) {
    this.arrChosen[student].equipment[equiptype].status = this.radioResult;
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
        alert.dismiss().then(() => {this.radioResult = data});

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

  backToHome() {
    this.navCtrl.pop();
  }




}
