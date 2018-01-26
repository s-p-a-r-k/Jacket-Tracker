import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the CreateaccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createaccount',
  templateUrl: 'createaccount.html',
})
export class CreateaccountPage {

  @ViewChild('username') user;
  @ViewChild('password') password;

  constructor(private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateaccountPage');
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Created Account',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  registerUser() {
//    console.log('Would create account with', this.user.value, this.password.value);
    this.fire.auth.createUserWithEmailAndPassword(this.user.value, this.password.value)
    .then(data => {
      console.log('got data', data);
      this.alert('Registered!');
    })
    .catch(error => {
      console.log('got an error', error);
      this.alert(error.message);
    })


    console.log('would register with', this.user.value, this.password.value);

/*    let alert = this.alertCtrl.create({
      title: 'You will create an account with the entered username and password',
      buttons: ['OK']
    });
    alert.present();*/
    
  }

}
