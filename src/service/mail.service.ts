import { Injectable } from '@angular/core';
import { GoogleApiService } from 'ng-gapi';
import { gapiClientConfig } from '../app/app.module';
import { gapiKeys } from '../environment';


@Injectable()
export class MailService {

  private loaded = false;

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
            // gapi.auth2.getAuthInstance().signIn();
            this.loaded = true;
        });
      });
    });
  }

  //Replace this with the actual mailing method(s)
  testGmailCall() {
    return new Promise((resolve, reject) => {
      if (this.loaded) {
        (gapi.client as any).gmail.users.labels.list({
          //'me' is currently signed-in user
          'userId': 'me'
        }).then((result) => {
          resolve(result);
        });
      } else {
        reject('gapi not initialized');
      }
    });
  }

}
