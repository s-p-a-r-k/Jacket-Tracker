import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewAssignmentsPage } from './view-assignments';

@NgModule({
  declarations: [
    ViewAssignmentsPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewAssignmentsPage),
  ],
})
export class ViewAssignmentsPageModule {}
