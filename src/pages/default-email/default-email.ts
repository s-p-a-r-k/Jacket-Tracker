import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { mailgun } from '../../environment';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, DatabaseSnapshot } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the DefaultEmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-default-email',
  templateUrl: 'default-email.html',
})
export class DefaultEmailPage {
  defaultEmail: Observable<any[]>;
  iter = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDB: AngularFireDatabase, public alertCtrl: AlertController, private afAuth: AngularFireAuth) {
    this.defaultEmail = afDB.list('email-messages').valueChanges();
    this.defaultEmail.subscribe(_afDB => {this.iter = _afDB});
    console.log(this.defaultEmail);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DefaultEmailPage');
  }

  selectDefault() {

  }
}
