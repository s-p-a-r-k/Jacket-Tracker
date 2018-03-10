import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mailgun } from 'mailgun-js';

import { AngularFireDatabase, DatabaseSnapshot } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import {LoggedinPage} from '../loggedin/loggedin';

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
  mailgun: any

  http: HttpClient;
  mailgunUrl: string;
  mailgunApiKey: string;

  constructor(public navCtrl: NavController, private afDB: AngularFireDatabase, public alertCtrl: AlertController, private afAuth: AngularFireAuth, public events: Events, http: HttpClient) {
    this.items = afDB.list('students').valueChanges();
    this.items.subscribe(_afDB => {this.itemarr = _afDB})
    this.equipRecordRef = this.afDB.list('equipment');
    this.studentRecordRef = this.afDB.list('students');

    this.http = http;
    this.mailgunUrl = "https://api.mailgun.net/v3/sandbox302c0e88ee224fe7b7f423ca1223b1e1.mailgun.org";
    this.mailgunApiKey = window.btoa("key-f0467a5340d0a4b3c82d5592dd65e1f5");
    this.mailgun = Mailgun({apiKey: this.mailgunApiKey, domain: this.mailgunUrl});

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
    this.arrChosen.push(item);
    this.arrChosen = this.arrChosen.reduce((x,y) => x.findIndex(e => e.email==y.email) < 0 ? [...x, y]: x, []);
  }

  quickManageSubmit(selectedAction) {
      if (selectedAction == "email") {
        console.log('email option selected');
        this.send2();
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

  send() {
      var requestHeaders = new HttpHeaders();
      requestHeaders.set("Authorization", "Basic " + this.mailgunApiKey);
      requestHeaders.set("Content-Type", "application/x-www-form-urlencoded");

      this.http.post(this.mailgunUrl + "/messages",
      "from=test@example.com&to=" + "recipient@example.com" + "&subject=" + "test subject" + "&text=" + "test message sent",
      {
        headers: {'Authorization': 'Basic ' + this.mailgunApiKey}
      }).subscribe(success => {
        console.log("SUCCESS -> " + JSON.stringify(success));
      }, error => {
        console.log("ERROR -> " + JSON.stringify(error));
      });

      this.http.request(
        "POST", "https://api.mailgun.net/v3/" + this.mailgunUrl + "/messages",
        {
          body: "from=test@example.com&to=" + "com9368@hotmail.com" + "&subject=" + "Test Subject" + "&text=" + "message sent.",
          headers: {'Authorization': 'Basic ' + this.mailgunApiKey}
        }).subscribe(success => {
        console.log("SUCCESS -> " + JSON.stringify(success));
      }, error => {
        console.log("ERROR -> " + JSON.stringify(error));
      });
  }

  send2() {
    let data = {
      from: 'Excited User <me@samples.mailgun.org>',
      to: 'bar@example.com, YOU@YOUR_DOMAIN_NAME',
      subject: 'Hello',
      text: 'Testing some Mailgun awesomness!'
    };

    this.mailgun.messages().send(data, function (error, body) {
      console.log(body);
    });
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