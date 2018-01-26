import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import {LoginPage} from '../login/login';
import {CreateaccountPage} from '../createaccount/createaccount';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('username') uname;
  @ViewChild('password') password;
  items: Observable<any[]>;
  constructor(
    public db: AngularFireDatabase,
    public navCtrl: NavController,
    public alertCtrl: AlertController
  ) {
    this.items = db.list('list').valueChanges();
  }
  logIn() {
    this.navCtrl.push(LoginPage);
  }
  createAcc() {
    this.navCtrl.push(CreateaccountPage);
  }
}
