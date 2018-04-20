import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UniformRegistrationPage } from './uniform-registration';

@NgModule({
  declarations: [
    UniformRegistrationPage,
  ],
  imports: [
    IonicPageModule.forChild(UniformRegistrationPage),
  ],
})
export class UniformRegistrationPageModule {}
