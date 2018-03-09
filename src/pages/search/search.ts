import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoggedinPage } from '../loggedin/loggedin';
import { QuickmanagementPage } from '../quickmanagement/quickmanagement';
import { AngularFireDatabase, DatabaseSnapshot } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  searchLocation: any;

  type: any;
  uniformID: any;
  other: any;

  firstName: any;
  lastName: any;
  gtid: any;
  email: any;
  section: any;

  equipRecord: Observable<any[]>;
  studentRecord: Observable<any[]>;
  equiplist;
  studentlist;

  templist = [];
  matchlist = [];
  

  constructor(private afDB: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.searchLocation = "student";
    this.studentRecord = afDB.list('students').valueChanges();
    this.studentRecord.subscribe(_afDB => {this.studentlist = _afDB})
    this.equipRecord = afDB.list('equipment').valueChanges();
    this.equipRecord.subscribe(_afDB => {this.equiplist = _afDB})

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  
  backToHome() {
    this.navCtrl.setRoot(LoggedinPage);
  }
  matchFirstName() {

  }
  searchClicked() {

    //Lieutenant searches through student tab
    if(this.searchLocation == "student") {
      if(this.firstName != null) {
        this.templist = this.studentlist.filter((item)=> {
          return item.firstname.toLowerCase() == this.firstName.toLowerCase();
        });
        this.templist.forEach(item=> this.matchlist.push(item));
      }

      if(this.lastName != null) {
        this.templist = this.studentlist.filter((item)=> {
          return item.lastname.toLowerCase() == this.lastName.toLowerCase();
        });
        this.templist.forEach(item=> this.matchlist.push(item));
      }      

      if(this.gtid != null) {
        this.templist = this.studentlist.filter((item)=> {
          return item.gtid == this.gtid;
        });
        this.templist.forEach(item=> this.matchlist.push(item));
      }

      if(this.email != null) {
        this.templist = this.studentlist.filter((item)=> {
          return item.email == this.email;
        });
        this.templist.forEach(item=> this.matchlist.push(item));
      }

      if(this.email != null) {
        this.templist = this.studentlist.filter((item)=> {
          return item.email == this.email;
        });
        this.templist.forEach(item=> this.matchlist.push(item));
      }
      /* Commented out until storing section is implemented when checking out
      if(this.section != null) {
        this.templist = this.studentlist.filter((item)=> {
          return item.section == this.section;
        });
        this.templist.forEach(item=> this.matchlist.push(item));
      }*/
      /* Commented out until storing other is implemented
      if(this.other != null) {
        this.templist = this.studentlist.filter((item)=> {
          return item.other == this.other;
        });
        this.templist.forEach(item=> this.matchlist.push(item));
      }*/
    }
    //Lieutenant searches through uniform tab
    if(this.searchLocation == "uniform") {

      if(this.type != null) {
        this.templist = this.equiplist.filter((item)=> {
          return item == this.type;
        });
        this.templist.forEach(item=> this.matchlist.push(item));
      }

      if(this.uniformID != null) {
        this.templist = this.equiplist.filter((item)=> {
          return item.uniformID == this.uniformID;
        });
        this.templist.forEach(item=> this.matchlist.push(item));
      }
      /* Commented out until storing other is implemented
      if(this.other != null) {
        this.templist = this.studentlist.filter((item)=> {
          return item.other == this.other;
        });
        this.templist.forEach(item=> this.matchlist.push(item));
      }*/
    }
    //delete duplicates
    this.matchlist = this.matchlist.reduce((x,y) => x.findIndex(e => e.email==y.email) < 0 ? [...x, y]: x, []);
    console.log(this.equiplist);
    console.log(this.studentlist);
    console.log(this.matchlist);

    

  }

}
