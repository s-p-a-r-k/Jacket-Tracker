import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class WaiverService {

  private WAIVER_LOCATION = 'uniforms-waiver.pdf';

  constructor(private http: HttpClient, private storage: AngularFireStorage) { }

  getWaiverURL() {
    const ref = this.storage.ref(this.WAIVER_LOCATION);
    return ref.getDownloadURL();
  }
}
