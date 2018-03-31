import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mailgun } from '../environment';


@Injectable()
export class MailgunService {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  sendMail(emailList, subject, body) {
    return this.http.request(
      "POST", "https://api.mailgun.net/v3/" + mailgun.mailgunUrl + "/messages",
      {
        body: "from=sender@example.com&to=" + emailList + "&subject=" + subject + "&text=" + body,
        headers: {"Authorization": "Basic " + window.btoa("api:" + mailgun.mailgunApiKey),
        "Content-Type": "application/x-www-form-urlencoded"}
      }
    );
  }

}
