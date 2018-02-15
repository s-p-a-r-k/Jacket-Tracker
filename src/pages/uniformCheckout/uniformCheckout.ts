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
  private instruments = [
    {'name': 'Drums', 'equipment': ['Hat', 'Jacket', 'Drumsticks']},
    {'name': 'Trombone', 'equipment': ['Cover', 'Wax']}
  ];
  private selectOptions = {
    title: 'Select your instrument',
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
      instrument: ['', Validators.required],
      equipment: formBuilder.array([
        //Dynamically created on instrument <select> change
      ]),
      agree: [false, Validators.requiredTrue],
    })
  }

  initEquipment() {
    const array = <FormArray> this.uniformRequest.controls.equipment;
    array.controls = []
    for (let equipmentType of this.uniformRequest.value.instrument.equipment) {
      array.push(this.formBuilder.group({
        type: ['', Validators.required],
        id: ['', Validators.required]
      }));
    }
  }

  //Disable certain values before saving so that unncessary data not persisted
  submitForm() {
    const form = this.uniformRequest.controls;
    form.agree.disable()
    form.instrument.disable()
    const studentRecordsRef = this.fire.list('students');
    console.log(studentRecordsRef)
    console.log(this.uniformRequest.value)
    studentRecordsRef.push(this.uniformRequest.value)
      .then((result) => console.log(result))
    form.agree.enable()
    form.instrument.enable()
  }
}
