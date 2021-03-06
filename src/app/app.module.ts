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
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/resetPassword/resetPassword';
import { UniformCheckoutPage } from '../pages/uniformCheckout/uniformCheckout';
import { QuickmanagementPage } from '../pages/quickmanagement/quickmanagement';
import { SearchPage } from '../pages/search/search';
import { EmailManagementPage } from '../pages/emailManagement/emailManagement';
import { SendEmailPage } from '../pages/send-email/send-email';
import { AccountManagementPage } from '../pages/accountManagement/accountManagement';
import { ChangeUserEmailPage } from '../pages/changeUserEmail/changeUserEmail';
import { WaiverManagementPage } from '../pages/waiverManagement/waiverManagement';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WaiverService } from '../service/waiver.service';
import { MailService } from '../service/mail.service';
import { UniformRegistrationPage } from '../pages/uniform-registration/uniform-registration';


import { RegisterPage } from '../pages/register/register';
import { QuickmanagementPage2 } from '../pages/quickmanagement2/quickmanagement2';
import { ViewUniformsPage } from '../pages/view-uniforms/view-uniforms';
import { ViewAssignmentsPage } from '../pages/view-assignments/view-assignments';






export const gapiClientConfig = {
    client_id: gapiKeys.client_id,
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"],
    scope: [
        "https://www.googleapis.com/auth/gmail.readonly",
        "https://www.googleapis.com/auth/gmail.send"
    ].join(" ")
}

@NgModule({
  declarations: [
    MyApp,
    LandingPage,
    LoginPage,
    ResetPasswordPage,
    QuickmanagementPage,
    UniformCheckoutPage,
    SearchPage,
    EmailManagementPage,
    SendEmailPage,
    RegisterPage,
    AccountManagementPage,
    ChangeUserEmailPage,
    WaiverManagementPage,
    UniformRegistrationPage,
    QuickmanagementPage2,
    ViewUniformsPage,
    ViewAssignmentsPage
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
    LoginPage,
    ResetPasswordPage,
    QuickmanagementPage,
    UniformCheckoutPage,
    SearchPage,
    EmailManagementPage,
    SendEmailPage,
    RegisterPage,
    AccountManagementPage,
    ChangeUserEmailPage,
    WaiverManagementPage,
    UniformRegistrationPage,
    QuickmanagementPage2,
    ViewUniformsPage,
    ViewAssignmentsPage

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
