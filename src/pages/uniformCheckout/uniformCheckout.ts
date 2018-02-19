import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { AlertController, NavController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { updateDate } from 'ionic-angular/util/datetime-util';
import { LandingPage } from '../landing/landing';
import { WaiverService } from '../../waiver.service';


@Component({
  selector: 'page-uniformCheckout',
  templateUrl: 'uniformCheckout.html'
})
export class UniformCheckoutPage {

  private equipment: AngularFireList<any[]>;
  private sections = [
    {'name': 'Alto Saxophone', 'equipment': ['Jacket', 'Pants', 'Sash', 'Shako']},
    {'name': 'Baritone', 'equipment': ['Jacket', 'Pants', 'Sash', 'Shako']},
    {'name': 'Piccolo', 'equipment': ['Jacket', 'Pants', 'Sash', 'Shako']},
    {'name': 'Bass Drum', 'equipment': ['Jacket', 'Pants', 'Shako']},
    {'name': 'Clarinet', 'equipment': ['Jacket', 'Pants', 'Sash', 'Shako']},
    {'name': 'Mellophone', 'equipment': ['Jacket', 'Pants', 'Sash', 'Shako']},
    {'name': 'Tenor Sax', 'equipment': ['Jacket', 'Pants', 'Sash', 'Shako']},
    {'name': 'Trombone', 'equipment': ['Jacket', 'Pants', 'Sash', 'Shako']},
    {'name': 'Trumpet', 'equipment': ['Jacket', 'Pants', 'Sash', 'Shako']},
    {'name': 'Tuba', 'equipment': ['Jacket', 'Pants', 'Gloves']},
    {'name': 'Drum Majors', 'equipment': ['Jacket', 'Pants', 'Gloves', 'Sash', 'Vest']},
    {'name': 'Pit/Front Ensemble', 'equipment': ['Jacket', 'Pants', 'Sash']},
    {'name': 'Snare', 'equipment': ['Jacket', 'Pants', 'Sash', 'Shako']},
    {'name': 'Quads', 'equipment': ['Jacket', 'Pants', 'Sash', 'Shako']},
    {'name': 'Cymbals', 'equipment': ['Jacket', 'Pants', 'Sash', 'Shako']}
  ];
  private selectOptions = {
    title: 'Select your section',
    mode: 'md'
  };
  private waiverSrc: Observable<String | null>;
  private uniformRequest: FormGroup;

  constructor(private fire: AngularFireDatabase,
              private formBuilder: FormBuilder,
              private waiverService: WaiverService,
              private alertCtrl: AlertController,
              public db: AngularFireDatabase,
              private navCtrl: NavController) {
    this.equipment = db.list('/equipment');
    waiverService.getWaiverURL()
      .subscribe(
        url => this.waiverSrc = waiverService.replaceOrigin(url)
      )
    this.uniformRequest = formBuilder.group({
      firstname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]*'), Validators.required])],
      lastname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]*'), Validators.required])],
      gtid: ['', Validators.compose([Validators.maxLength(9), Validators.minLength(9), Validators.pattern('[0-9]*'), Validators.required])],
      email: ['', Validators.email],
      section: ['', Validators.required],
      equipment: formBuilder.array([
        //Dynamically created on section <select> change
      ]),
      agree: [false, Validators.requiredTrue],
    })
  }

  initEquipment() {
    const array = <FormArray> this.uniformRequest.controls.equipment;
    array.controls = []
    for (let equipmentType of this.uniformRequest.value.section.equipment) {
      array.push(this.formBuilder.group({
        type: ['', Validators.required],
        id: ['', Validators.required]
      }));
    }
  }

  //For each equipment, ID pair, checks against the database to ensure
  //student has not already checked it out
  async verifyEquipment(form: Object) {

    let failures = [];
    const firstname = form['firstname'];
    const lastname = form['lastname'];
    const equipmentForm = form['equipment']

    await Promise.all(Object.keys(equipmentForm).map(k => {
      const inputId = equipmentForm[k].id
      return new Promise(resolve => {
        this.db.object('/equipment/' + k + '/' + inputId)
          .snapshotChanges()
          .subscribe(action => {
            const obj = action.payload.val();
            if (obj == null || obj['student'] == null) {
              failures.push(k + ' #' + inputId + ' was not found.');
            } else if (String(obj['student']) != "") {
              failures.push(k + ' #' + inputId + ' has already been assigned.')
            } else {
              //TODO: update the equipment entry with new student
            }
            resolve()
          })
      });
    })).then(() => {
      //Wait for all database queries to finish
    });

    return new Promise((resolve, reject) => {
      if (failures.length == 0) {
        this.alertSuccess(firstname, lastname)
        resolve()
      } else {
        this.alertFailure(failures)
        reject(failures)
      }
    })
  }

  alertSuccess(firstname: String, lastname: String) {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: firstname + '    ' + lastname,
      message: 'Successfully Assigned',
      buttons: ['OK']
    }).present();
  }

  alertFailure(failures) {
    var msgHtml = '';
    for (let failure of failures) {
      msgHtml += (failure + '<br>')
    }
    let alert = this.alertCtrl.create({
      title: 'Failure',
      subTitle: 'Please contact a Uniforms Lieutenant',
      message: msgHtml,
      //TODO add navigation to override popup
      buttons: ['OK']
    }).present();
  }

  //Reshape form values before saving to index by equipment and remove unncessary data not persisted
  submitForm() {
    const form = Object.assign({}, this.uniformRequest.value);
    delete form.agree;
    delete form.section;
    const equipmentObjs = form.equipment
    form.equipment = {};
    for (let equip of equipmentObjs) {
      var newKey = equip.type;
      form.equipment[newKey] = {
        id: equip.id
      }
    }
    this.verifyEquipment(form).then(() => {
      const studentRecordsRef = this.fire.list('students');
      studentRecordsRef.push(form)
        .then((result) => console.log(result))
    }).catch((failures) => {
      //TODO: Clear form or clear error values
    });
  }
}
