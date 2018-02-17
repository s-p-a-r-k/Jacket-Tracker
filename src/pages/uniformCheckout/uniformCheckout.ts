import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-uniformCheckout',
  templateUrl: 'uniformCheckout.html'
})
export class UniformCheckoutPage {

  //TODO: Replace this with actual band values
  private sections = [
    {'name': 'Drums', 'equipment': ['Hat', 'Jacket', 'Drumsticks']},
    {'name': 'Trombone', 'equipment': ['Cover', 'Wax']}
  ];
  private selectOptions = {
    title: 'Select your section',
    mode: 'md'
  };
  private uniformRequest: FormGroup;

  constructor(private fire: AngularFireDatabase,
              private formBuilder: FormBuilder) {
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
    const studentRecordsRef = this.fire.list('students');
    studentRecordsRef.push(form)
      .then((result) => console.log(result))
  }
}
