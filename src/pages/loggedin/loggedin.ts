import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

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

  email: string;

  constructor(private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    this.email = fire.auth.currentUser.email;
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
    console.log("clicked onlogoutclick")
  }

}
