import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { MyApp } from './app.component';
import { LandingPage } from '../pages/landing/landing';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { LoggedinPage } from '../pages/loggedin/loggedin';
import { CreateaccountPage } from '../pages/createaccount/createaccount';
import { UniformCheckoutPage } from '../pages/uniformCheckout/uniformCheckout';
import { WaiverService } from '../waiver.service';
import mailgun from 'mailgun-js';

import {QuickmanagementPage} from '../pages/quickmanagement/quickmanagement';
import {SearchPage} from '../pages/search/search'
import { RestProvider } from '../providers/rest/rest';

const firebaseAuth = {
  apiKey: "AIzaSyDPr_smunA_RpcWByjClYrTcWdDJyb0--M",
  authDomain: "jacket-tracker-90b5c.firebaseapp.com",
  databaseURL: "https://jacket-tracker-90b5c.firebaseio.com",
  projectId: "jacket-tracker-90b5c",
  storageBucket: "jacket-tracker-90b5c.appspot.com",
  messagingSenderId: "674608756377"
};


@NgModule({
  declarations: [
    MyApp,
    LandingPage,
    ListPage,
    LoginPage,
    CreateaccountPage,
    LoggedinPage,
    QuickmanagementPage,
    UniformCheckoutPage,
    SearchPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(firebaseAuth),
    PdfViewerModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LandingPage,
    ListPage,
    LoginPage,
    CreateaccountPage,
    LoggedinPage,
    QuickmanagementPage,
    UniformCheckoutPage,
    SearchPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    WaiverService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider
  ]
})
export class AppModule {}
