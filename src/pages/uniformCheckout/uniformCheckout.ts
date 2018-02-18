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
  //TODO: Replace this with actual band values
  private sections = [
    {'name': 'Alto Saxophone', 'equipment': ['Jacket', 'Pants', 'Sash', 'Shako']},
    {'name': 'Baritone', 'equipment': ['Jacket', 'Pants', 'Sash', 'Shako']},
    {'name': 'Piccolo', 'equipment': ['Jacket', 'Pants', 'Sash', 'Shako']},
    {'name': 'Clarinet', 'equipment': ['Jacket', 'Pants', 'Sash', 'Shako']},
    {'name': 'Mellophone', 'equipment': ['Jacket', 'Pants', 'Sash', 'Shako']},
    {'name': 'Tenor Sax', 'equipment': ['Jacket', 'Pants', 'Sash', 'Shako']},
    {'name': 'Trombone', 'equipment': ['Jacket', 'Pants', 'Sash', 'Shako']},
    {'name': 'Trumpet', 'equipment': ['Jacket', 'Pants', 'Sash', 'Shako']},
    {'name': 'Tuba', 'equipment': ['Jacket', 'Pants', 'Gloves']},
    {'name': 'Drum Majors', 'equipment': ['Jacket', 'Pants', 'Gloves', 'Sash', 'Vest']},
    {'name': 'Base Drum', 'equipment': ['Jacket', 'Pants', 'Shako']},
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

  uniformOwner: string;
  i = -1; //-1 if the student field is empty/ otherwise not 1
  clickSubmit() {


    // USER_LOCATION: 'https://jacket-tracker-90b5c.firebaseio.com/';
    // userRef: new Firebase(this.USER_LOCATION);    


    //check database
    // this.equipment.contain('Jacket',{'1':{size: "small", status: "clean", student: "empty"}});
    // this.uniformOwner = this.equipment.update('Jacket',{'1':{size: "small", status: "clean", student: "empty"}});
    //add algorithm form checking database 

    //success
    if(this.i = -1) {
      let alert = this.alertCtrl.create({
        title: 'Success',

        //TODO: need to figure out how to get the first and last name
        // subTitle: this.firstname + ' ' + this.lastname + '\nSuccessfully Assigned',
        subTitle:'Successfully Assigned',
        buttons: ['OK']
      }).present();
    } else {
      //when fail
      let alert2 = this.alertCtrl.create({
        title: 'Fail',
        subTitle: 'One of your uniform piece is checked out. \nContact the uniform lieutenant ',
        buttons: ['OK']
      }).present();
    }
  }

  //Reshape form values before saving to index by equipment and remove unncessary data not persisted
  submitForm() {
    this.clickSubmit();
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

    this.navCtrl.push(UniformCheckoutPage);
  }

  backToLanding() {
    this.navCtrl.push(LandingPage);
  }
}
