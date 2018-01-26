import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('username') user;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signInUser() {
  //  console.log('Would log in with', this.user.value, this.password.value);
    if (this.user.value == "ul1" && this.password.value == "1234") {
      let alert = this.alertCtrl.create({
        title: 'Login Successful',
        subTitle: 'You are now logged in',
        buttons: ['OK']
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Login Failed',
        subTitle: 'Check if you have entered your username and password correctly.',
        buttons: ['OK']
      });
      alert.present();
    }
    
  }

}
