import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { LandingPage } from '../landing/landing';


/**
 * Generated class for the LoggedinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loggedin',
  templateUrl: 'loggedin.html',
})
export class LoggedinPage {

  email: String;

  constructor(private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.email = fire.auth.currentUser.email;
  }
  alert(message: string) {
    this.alertCtrl.create({
      title: 'Sign Out',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoggedinPage');
  }
  onAddUniformClick() {
    console.log("clicked onadduniformclick")
  }
  onSearchClick() {
    console.log("clicked onsearchclick")
  }
  onViewAssignmentsClick() {
    console.log("clicked onviewassigmentclick")
  }
  onViewUniformsClick() {
    console.log("clicked onviewuniformsclick")
  }
  onManageAccountClick() {
    console.log("clicked onmanageaccountclick")
  }
  onAssignUniformsClick() {
    console.log("clickedonassignuniformsclick")
  }
  onLogOutClick() {
    this.fire.auth.signOut()
      .then(() => {
        this.alert('Sign out succesful')
        this.navCtrl.setRoot(LandingPage)
        console.log('logged out');
      })
      .catch( error => {
        console.log('got an error', error);
        this.alert(error.message);
      })
    console.log("clicked onlogoutclick")
  }

}
