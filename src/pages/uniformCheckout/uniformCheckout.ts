import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { AlertController, NavController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { updateDate } from 'ionic-angular/util/datetime-util';
import { LandingPage } from '../landing/landing';
import { WaiverService } from '../../service/waiver.service';


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
              private fireAuth: AngularFireAuth,
              private formBuilder: FormBuilder,
              private waiverService: WaiverService,
              private alertCtrl: AlertController,
              private navCtrl: NavController) {
    this.equipment = fire.list('/equipment');
    waiverService.getWaiverURL()
      .subscribe(
        url => this.waiverSrc = url
      );
    this.initForm()
  }

  initForm() {
    this.uniformRequest = this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]*'), Validators.required])],
      lastname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]*'), Validators.required])],
      gtid: ['', Validators.compose([Validators.maxLength(9), Validators.minLength(9), Validators.pattern('[0-9]*'), Validators.required])],
      email: ['', Validators.email],
      section: ['', Validators.required],
      equipment: this.formBuilder.array([
        //Dynamically created on section <select> change
      ]),
      agree: [false, Validators.requiredTrue],
    });
  }

  initEquipment() {
    const array = <FormArray> this.uniformRequest.controls.equipment;
    array.controls = []
    if (this.uniformRequest.value.section.equipment) {
      for (let equipmentType of this.uniformRequest.value.section.equipment) {
        array.push(this.formBuilder.group({
          type: ['', Validators.required],
          id: ['', Validators.required]
        }));
      }
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
        this.fire.object('/equipment/' + k + '/' + inputId)
          .snapshotChanges()
          .subscribe(action => {
            const obj = action.payload.val();
            if (obj == null) {
              let msg = k + ' #' + inputId + ' was not found.';
              let failure = {
                'message': msg,
                'equipment': k
              };
              failures.push(failure);
              resolve()
            } else if (obj['student'] != null && String(obj['student']) != "") {
              //Get student that is assigned the equipment
              const studentRecordsRef = this.fire.object('/students/' + obj['student']);
              studentRecordsRef.snapshotChanges()
                .subscribe(action => {
                  const student = action.payload.val();
                  const otherStudentName = student['firstname'] + ' ' + student['lastname'];
                  let msg = k + ' #' + inputId + ' has already been assigned to ' + otherStudentName + '.';
                  let failure = {
                    'message': msg,
                    'equipment': k
                  };
                  failures.push(failure);
                  resolve()
                });
            } else if (obj['student'] == "") {
              resolve()
            }
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
      }
    })
  }

  alertSuccess(firstname: String, lastname: String) {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: firstname + '    ' + lastname,
      message: 'Successfully Assigned',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.navCtrl.pop();
        }
      }]
    }).present();
  }

  alertFailure(failures) {
    var msgHtml = '';
    for (let failure of failures) {
      msgHtml += (failure.message + '<br>')
    }
    let override = this.alertCtrl.create({
      title: 'Override',
      subTitle: 'Enter Uniforms Lieutenant username and password to override the checkout',
      inputs: [{
        name: 'username',
        placeholder: 'Username'
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password'
      }],
      buttons: [{
        text: 'SUBMIT',
        handler: data => {
          this.fireAuth.auth.signInWithEmailAndPassword(data.username, data.password)
          .then(() => {
            const form = this.reshapeForm();
            this.saveStudentAndEquipment(form);
            this.fireAuth.auth.signOut();
            this.navCtrl.pop();
          });
        }
      }]
    });
    let failure = this.alertCtrl.create({
      title: 'Failure',
      subTitle: 'Please contact a Uniforms Lieutenant',
      message: msgHtml,
      buttons: [{
        text:'RETURN',
        handler: () => {
          this.clearFormOfFailures(failures);
        }
      },
      {
        text: 'OVERRIDE',
        handler: () => {
          override.present();
        }
      }]
    }).present();
  }

  //Reshape form values before saving to index by equipment and remove unncessary data not persisted
  submitForm() {
    const form = this.reshapeForm()
    this.verifyEquipment(form).then(() => {
      this.saveStudentAndEquipment(form);
    });
  }

  reshapeForm() {
    const form = Object.assign({}, this.uniformRequest.value);
    delete form.agree;
    let sectionName = form.section.name;
    delete form.section;
    form.section = sectionName;
    const equipmentObjs = form.equipment
    form.equipment = {};
    for (let equip of equipmentObjs) {
      var newKey = equip.type;
      form.equipment[newKey] = {
        id: equip.id
      }
    }
    return form;
  }

  saveStudentAndEquipment(form) {
    const studentRecordsRef = this.fire.list('students');
    studentRecordsRef.push(form)
      .then((result) => {
        let student = result.key;
        Object.keys(form.equipment).forEach((equipType, details) => {
          const id = form.equipment[equipType].id;
          const equipRecordsRef = this.fire.object('/equipment/' + equipType + '/' + id + '/student/');
          equipRecordsRef.set(student)
            .then(result => console.log(result));
        });
      }
    );
  }

  clearFormOfFailures(failures) {
    let equipArr = this.uniformRequest.value.equipment;
    for (let failure of failures) {
      for (let equip of equipArr) {
        if (equip.type == failure.equipment) {
          equip.id = '';
        }
      }
    }
    this.uniformRequest.patchValue({equipment: equipArr});
  }
}
