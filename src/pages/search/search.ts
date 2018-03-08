import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoggedinPage } from '../loggedin/loggedin';
import { QuickmanagementPage } from '../quickmanagement/quickmanagement';
import { AngularFireDatabase, DatabaseSnapshot } from 'angularfire2/database';


/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  searchLocation: any;
  type: any;
  uniformID: any;
  other: any;
  firstName: any;
  lastName: any;
  gtid: any;
  email: any;
  section: any;

  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.searchLocation = "student";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  
  backToHome() {
    this.navCtrl.setRoot(LoggedinPage);
  }

  searchClicked() {
    this.navCtrl.setRoot(QuickmanagementPage);

  }

}
