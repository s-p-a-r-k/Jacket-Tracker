import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the UniformRegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-uniform-registration',
  templateUrl: 'uniform-registration.html',
})
export class UniformRegistrationPage {
  type: any;
  size: any;
  status: any;
  id: any;
  firstname: any;
  lastname: any;
/*
  private size: AngularFireList<any[]>;
*/
  private types = [
    {'name': 'Jacket', 'size': ['small', 'medium', 'large', 'x-large']},
    {'name': 'Pants', 'size': ['small', 'medium', 'large', 'x-large']},
    {'name': 'Sash', 'size': ['small', 'medium', 'large', 'x-large']},
    {'name': 'Shako', 'size': ['small', 'medium', 'large', 'x-large']},
    {'name': 'Vest', 'size': ['small', 'medium', 'large', 'x-large']},
    {'name': 'Gloves', 'size': ['small', 'medium', 'large', 'x-large']}
  ];
/*
  private selectOptions = {
    title: 'Select your section',
    mode: 'md'
  };
  private uniformRequest: FormGroup;
*/
  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: AngularFireDatabase, private fireAuth: AngularFireAuth, private formBuilder: FormBuilder, private alertCtrl: AlertController,) {
    //this.initForm()
  }
/*
  initForm() {
    this.uniformRequest = this.formBuilder.group({
      section: ['', Validators.required],
      size: this.formBuilder.array([
        //Dynamically created on section <select> change
      ]),
      agree: [false, Validators.requiredTrue],
    });
  }

  initEquipment() {
    const array = <FormArray> this.uniformRequest.controls.size;
    array.controls = []
    if (this.uniformRequest.value.section.size) {
      for (let sizeType of this.uniformRequest.value.section.size) {
        array.push(this.formBuilder.group({
          type: ['', Validators.required]
        }));
      }
    }
  }
*/
  ionViewDidLoad() {
    console.log('ionViewDidLoad UniformRegistrationPage');
  }

  selected(type) {
  }

  sizeSelected(size) {
  }

  clearClicked()
  {
    this.id = null;
    this.type = null;
    this.size = null;
    this.status = null;
    this.firstname = null;
    this.lastname = null;
  }

  registerClicked() {
    if (this.id != null && this.type != null && this.size != null) {
      let studentlist;
      let templist = [];

      const equipRecordsRef = this.fire.object('/equipment/' + this.type + '/' + this.id + '/');
      equipRecordsRef.update({size: this.size});
      equipRecordsRef.update({status: this.status});

      if (this.firstname != null && this.lastname != null) {
          // declaring variables to be used inside firebase iteration because variables already defined are not recognized inside the loop for some reason
          const fire = this.fire;
          const tempFirstname = this.firstname
          const tempLastname = this.lastname
          const tempType = this.type
          const tempId = this.id
          var currID: any;

          this.fire.object('/students/')
                .snapshotChanges()
                .subscribe(action => {
                var datasnapshot = action.payload;
                      datasnapshot.forEach(function(childSnapshot) {
                        if (childSnapshot.child("firstname").val().toLowerCase() == tempFirstname.toLowerCase()
                            && childSnapshot.child("lastname").val().toLowerCase() == tempLastname.toLowerCase()) {
                          var key = childSnapshot.key;
                          var childData = childSnapshot.val();

                          equipRecordsRef.update({student: key});

                          fire.object('/students/' + key + '/equipment/' + tempType + '/id/')
                          .valueChanges().subscribe(change => {
                            if (change != null && change != tempId) {
                              const uniformStudentRef = fire.object('/equipment/' + tempType + '/' + change + '/');
                              uniformStudentRef.update({student: ""});
                            }
                          });

                          const studentUniformRef = fire.object('/students/' + key + '/equipment/' + tempType + '/');
                          studentUniformRef.update({id: tempId});
                        }
                        return false;
                    });
                });
      }
      else {
          equipRecordsRef.update({student: ""});
      }


      let alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: this.type + ' #' + this.id,
        message: 'Successfully registered uniform.',
        buttons: [{
          text: 'OK',
          handler: () => {
//            this.navCtrl.pop();
          }
        }]
      }).present();
    }
    this.clearClicked();
  }
}