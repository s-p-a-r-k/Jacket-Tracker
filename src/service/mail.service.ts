import { Injectable } from '@angular/core';
import { GoogleApiService } from 'ng-gapi';
import { gapiClientConfig } from '../app/app.module';
import { gapiKeys } from '../environment';

@Injectable()
export class MailService {

  constructor(gapiService: GoogleApiService) {
    gapiService.onLoad().subscribe(() => {
      gapi.load('client:auth2', () => {
        gapi.client.init({
          apiKey: gapiKeys.api_key,
          clientId: gapiClientConfig.client_id,
          discoveryDocs: gapiClientConfig.discoveryDocs,
          scope: gapiClientConfig.scope
        }).then(() => {
            //Not needed when MailService used after user is signed in
            gapi.auth2.getAuthInstance().signIn();
        });
      });
    });
  }

  //Replace this with the actual mailing method(s)
  testGmailCall() {
    return new Promise((resolve, reject) => {
      (gapi.client as any).gmail.users.labels.list({
        'userId': 'me'
      }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject('gapi not initialized');
      });
    });
  }

  sendMail(emailList, subject, body) {
    //To and Subject are formatted in the encoded email
    let email = 'To: ' + emailList.join(",");
    email += '\r\n';
    email += 'Subject: ' + subject + '\r\n';
    email += '\r\n' + body;
    let base64EncodedEmail = window.btoa(email);
    return new Promise((resolve, reject) => {
      (gapi.client as any).gmail.users.messages.send({
        //'me' is currently signed-in (authenticated) user
        'userId': 'me',
        'resource': {
          'raw': base64EncodedEmail
        }
      }).then(result => {
        resolve('Success: ' + JSON.stringify(result));
      }).catch(error => {
        reject('Email failed to send: ' + JSON.stringify(error));
      });
    });
  }
}
