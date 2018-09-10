import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ValidateButtonComponent } from './validate-button';
import { FlitdeskModule } from  '../design-system/flitdesk.module';

@NgModule({
  declarations: [
    ValidateButtonComponent
  ],
  imports: [
    IonicModule,
    FlitdeskModule
  ], exports: [
    ValidateButtonComponent,
    FlitdeskModule
  ]
})
export class ValidateButtonComponentModule {}
