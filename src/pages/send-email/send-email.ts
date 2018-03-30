import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
