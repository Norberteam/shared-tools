import { NgModule } from '@angular/core';
import { IonicModule }  from 'ionic-angular';
import { FlitdeskInputComponent } from './fd-input/fd-input';
import { FlitdeskCheckboxComponent } from './fd-checkbox/fd-checkbox';
import { FlitdeskButtonComponent } from './fd-button/fd-button';
import { FlitdeskCardComponent } from './fd-card/fd-card';

@NgModule({
    declarations: [
        FlitdeskInputComponent,
        FlitdeskCheckboxComponent,
        FlitdeskButtonComponent,
        FlitdeskCardComponent
    ],
    imports: [
        IonicModule,
    ],
    exports: [
        FlitdeskInputComponent,
        FlitdeskCheckboxComponent,
        FlitdeskButtonComponent,
        FlitdeskCardComponent
    ]
})
export class FlitdeskModule { }