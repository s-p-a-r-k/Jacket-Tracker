import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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
  emailList = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, private afDB: AngularFireDatabase, private afAuth: AngularFireAuth, public alertCtrl: AlertController) {
    this.defaultEmail = afDB.list('email-messages').valueChanges();
    this.defaultEmail.subscribe(_afDB => {this.emailList = _afDB});
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

  // a draft before to do real email sending process
  sendDefaultEmail(message) {
    let alert = this.alertCtrl.create({
      title: 'Email Content',
      message: 'default email content',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('OK clicked');
          }
        }
      ]
    });

    alert.present();
  }
}
