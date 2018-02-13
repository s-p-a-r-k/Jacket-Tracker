import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-uniformCheckout',
  templateUrl: 'uniformCheckout.html'
})
export class UniformCheckoutPage {

  username: String;
  password: String;
  gtid: String;
  email: String;
  selectOptions: Object;
  instruments = [
    {'name': 'Drums', 'information': 'I am a Drums'},
    {'name': 'Trombone', 'information': 'I am not a Drum'}
  ]
  selectedInstrument: Object;



  constructor(
    public fire: AngularFireDatabase
  ) {
    // this.items = db.list('list').valueChanges();
    this.selectOptions = {
      title: 'Select you instrument',
      mode: 'md'
    };
  }

  submitForm() {
    //TODO: save encrypted data
  }
}
