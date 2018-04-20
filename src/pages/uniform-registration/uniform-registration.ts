import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UniformRegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-uniform-registration',
  templateUrl: 'uniform-registration.html',
})
export class UniformRegistrationPage {

  owner: any;
  size: any;
  gtid: any;
  type: any;
  id: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UniformRegistrationPage');
  }

  clearClicked()
 {

 }

 registerClicked() {
   
 }
}
