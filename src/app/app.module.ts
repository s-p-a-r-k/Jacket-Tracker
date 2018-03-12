import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig, gapiKeys } from '../environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {
  GoogleApiModule,
  GoogleApiService,
  GoogleAuthService,
  NgGapiClientConfig,
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from 'ng-gapi';

import { MyApp } from './app.component';
import { LandingPage } from '../pages/landing/landing';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { LoggedinPage } from '../pages/loggedin/loggedin';
import { CreateaccountPage } from '../pages/createaccount/createaccount';
import { UniformCheckoutPage } from '../pages/uniformCheckout/uniformCheckout';
import { WaiverService } from '../service/waiver.service';
import { MailService } from '../service/mail.service';

import {QuickmanagementPage} from '../pages/quickmanagement/quickmanagement';
import {SearchPage} from '../pages/search/search'

export const gapiClientConfig = {
    client_id: gapiKeys.client_id,
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"],
    scope: [
        "https://www.googleapis.com/auth/gmail.readonly"
    ].join(" ")
}

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
    PdfViewerModule,
    HttpClientModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    })
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
    MailService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
