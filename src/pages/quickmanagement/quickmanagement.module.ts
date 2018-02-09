import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuickmanagementPage } from './quickmanagement';

@NgModule({
  declarations: [
    QuickmanagementPage,
  ],
  imports: [
    IonicPageModule.forChild(QuickmanagementPage),
  ],
})
export class QuickmanagementPageModule {}
