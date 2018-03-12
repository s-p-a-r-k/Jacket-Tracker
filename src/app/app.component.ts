import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LandingPage } from '../pages/landing/landing';
import { LoggedinPage } from '../pages/loggedin/loggedin';

import { QuickmanagementPage } from '../pages/quickmanagement/quickmanagement';
import { SearchPage } from '../pages/search/search';
import { EmailManagementPage } from '../pages/emailManagement/emailManagement';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LandingPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // Used for an example of ngFor and navigation.
    // Menu list but Temp Quick Management was made since we do not have search screen yet.
    this.pages = [
      { title: 'Add New Uniform', component: LoggedinPage },
      { title: 'Search', component: SearchPage },
      { title: 'View Current Assignments', component: LoggedinPage },
      { title: 'View Uniforms', component: LoggedinPage },
      { title: 'Manage Acount', component: LoggedinPage },
      { title: 'Assign Uniforms', component: LoggedinPage },
      { title: 'Quick Management', component: QuickmanagementPage },
      { title: 'Email Management', component: EmailManagementPage }
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
}
