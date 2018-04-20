import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { WaiverService } from '../../service/waiver.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-waiverManagement',
  templateUrl: 'waiverManagement.html',
})
export class WaiverManagementPage {

  uploadPercent: Observable<number>;

  constructor(private navCtrl: NavController, private waiverService: WaiverService) { }

  updateData(event) {
    let file = event.target.files[0];
    this.uploadPercent = this.waiverService.uploadWaiver(file).percentageChanges();
  }

  // uploadWaiver() {
  //   this.uploadPercent =
  // }

}
