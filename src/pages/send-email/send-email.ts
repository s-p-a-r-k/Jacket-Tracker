import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { mailgun } from '../../environment';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, DatabaseSnapshot } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the SendEmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send-email',
  templateUrl: 'send-email.html',
})
export class SendEmailPage {

  email: any;

  defaultEmail: Observable<any[]>;
  iter = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDB: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.defaultEmail = afDB.list('email-messages').valueChanges();
    this.defaultEmail.subscribe(_afDB => {this.iter = _afDB});
    console.log("============================");
    console.log("default Email list");
    console.log(this.defaultEmail);
    console.log("============================");
  }

  emailSubmit(emailType) {
    if (emailType == "saved") {
      this.email = "saved";
      console.log("saved");
    } else if (emailType == "custom") {
      console.log("custom");
      this.email = "custom";
    }
  }

  chooseAction(action) {
    console.log("Action chose");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendEmailPage');
  }

}
