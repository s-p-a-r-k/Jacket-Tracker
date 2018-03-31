import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DefaultEmailPage } from './default-email';

@NgModule({
  declarations: [
    DefaultEmailPage,
  ],
  imports: [
    IonicPageModule.forChild(DefaultEmailPage),
  ],
})
export class DefaultEmailPageModule {}
