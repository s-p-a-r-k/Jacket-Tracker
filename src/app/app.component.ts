import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

import { LandingPage } from '../pages/landing/landing';

import { QuickmanagementPage } from '../pages/quickmanagement/quickmanagement';
import { SearchPage } from '../pages/search/search';
import { EmailManagementPage } from '../pages/emailManagement/emailManagement';
import { SendEmailPage } from '../pages/send-email/send-email';
import { AccountManagementPage } from '../pages/accountManagement/accountManagement';
import { WaiverManagementPage } from '../pages/waiverManagement/waiverManagement';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LandingPage;


  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public fire: AngularFireAuth, public alertCtrl: AlertController) {
    this.initializeApp();

    // Used for an example of ngFor and navigation.
    // Menu list but Temp Quick Management was made since we do not have search screen yet.
    this.pages = [
      { title: 'Home', component: SearchPage },
      { title: 'Add New Uniform', component: SearchPage },
      { title: 'View Current Assignments', component: SearchPage },
      { title: 'View Uniforms', component: SearchPage },
      { title: 'Assign Uniforms', component: SearchPage },
      { title: 'Email Management', component: EmailManagementPage },
      { title: 'Account Management', component: AccountManagementPage },
      { title: 'Waiver Management', component: WaiverManagementPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logOut() {
    this.fire.auth.signOut()
      .then(() => {
        this.alert('Sign out succesful')
        this.nav.setRoot(LandingPage)
        console.log('logged out');
      })
      .catch( error => {
        console.log('got an error', error);
        this.alert(error.message);
      })
    console.log("clicked onlogoutclick")
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Sign Out',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }
}
