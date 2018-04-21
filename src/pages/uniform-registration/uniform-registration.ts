import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-uniform-registration',
  templateUrl: 'uniform-registration.html',
})
export class UniformRegistrationPage {

//  owner: any;
//  size: any;
//  gtid: any;
//  type: any;
//  id: any;

  private size: AngularFireList<any[]>;
  private types = [
    {'name': 'Jacket', 'size': ['Small', 'Medium', 'Large', 'X-Large']},
    {'name': 'Pants', 'size': ['Small', 'Medium', 'Large', 'X-Large']},
    {'name': 'Sash', 'size': ['Small', 'Medium', 'Large', 'X-Large']},
    {'name': 'Shako', 'size': ['Small', 'Medium', 'Large', 'X-Large']},
    {'name': 'Vest', 'size': ['Small', 'Medium', 'Large', 'X-Large']},
    {'name': 'Gloves', 'size': ['Small', 'Medium', 'Large', 'X-Large']}
  ];
  private selectOptions = {
    title: 'Select uniform type',
    mode: 'md'
  };
  private waiverSrc: Observable<String | null>;
  private uniformRequest: FormGroup;

  constructor(private fire: AngularFireDatabase,
              private fireAuth: AngularFireAuth,
              private formBuilder: FormBuilder,
              private alertCtrl: AlertController,
              private navCtrl: NavController,
              public navParams: NavParams) {
    this.equipment = fire.list('/equipment');
    this.initForm()
  }

  initForm() {
    this.uniformRequest = this.formBuilder.group({
      type: ['', Validators.required],
      size: this.formBuilder.array([
        //Dynamically created on type <select> change
      ]),
      agree: [false, Validators.requiredTrue],
    });
  }

  initEquipment() {
    const array = <FormArray> this.uniformRequest.controls.size;
    array.controls = []
    if (this.uniformRequest.value.type.size) {
      for (let sizeType of this.uniformRequest.value.type.size) {
        array.push(this.formBuilder.group({
          type: ['', Validators.required],
          id: ['', Validators.required]
        }));
      }
    }
  }

  alertSuccess(type: String, id: String) {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: type + '    ' + id,
      message: 'Successfully Registered',
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
      subTitle: 'The same uniform already exists. Continue if you would like to update this uniform.',
      buttons: [{
        text: 'SUBMIT',
        handler: data => {
            const form = this.reshapeForm();
            this.saveStudentAndsize(form);
            this.fireAuth.auth.signOut();
            this.navCtrl.pop();
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

  //Reshape form values before saving to index by size and remove unncessary data not persisted
  submitForm() {
    const form = this.reshapeForm()
    this.verifysize(form).then(() => {
      this.saveStudentAndsize(form);
    });
  }

  reshapeForm() {
    const form = Object.assign({}, this.uniformRequest.value);
    delete form.agree;
    let typeName = form.type.name;
    delete form.type;
    form.type = typeName;
    const sizeObjs = form.size
    //form.size = "";
    const id = form.id
    //form.id = ""
    return form;
  }

  saveStudentAndsize(form) {
    const equipSizeRef = fire.list('/equipment/' + form.type + '/' + form.id + '/size/');
    equipSizeRef.set(form.size);
    const equipSizeRef = fire.list('/equipment/' + form.type + '/' + form.id + '/status/');
    equipSizeRef.set("clean");
    const equipSizeRef = fire.list('/equipment/' + form.type + '/' + form.id + '/student/');
    equipSizeRef.set("");
/*
    const studentRecordsRef = this.fire.list('students');
    studentRecordsRef.push(form)
      .then((result) => {
        let student = result.key;
        Object.keys(form.size).forEach((equipType, details) => {
          const id = form.size[equipType].id;
          const equipRecordsRef = this.fire.object('/size/' + equipType + '/' + id + '/student/');
          equipRecordsRef.set(student)
            .then(result => console.log(result));
        });
      }
    );
    */
  }

  clearFormOfFailures(failures) {
    let equipArr = this.uniformRequest.value.size;
    for (let failure of failures) {
      for (let equip of equipArr) {
        if (equip.type == failure.size) {
          equip.id = '';
        }
      }
    }
    this.uniformRequest.patchValue({size: equipArr});
  }

  clearClicked()
 {
  this.reshapeForm();
 }

 registerClicked() {
  saveStudentAndsize(this.reshapeForm());
 }
}
