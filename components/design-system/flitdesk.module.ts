import { NgModule } from '@angular/core';
import { IonicModule }  from 'ionic-angular';
import { FlitdeskInputComponent } from './fd-input/fd-input';
import { FlitdeskCheckboxComponent } from './fd-checkbox/fd-checkbox';
import { FlitdeskButtonComponent } from './fd-button/fd-button';
import { FlitdeskCardComponent } from './fd-card/fd-card';
import { FlitdeskAvatarComponent } from './fd-avatar/fd-avatar';

@NgModule({
    declarations: [
        FlitdeskInputComponent,
        FlitdeskCheckboxComponent,
        FlitdeskButtonComponent,
        FlitdeskCardComponent,
        FlitdeskAvatarComponent
    ],
    imports: [
        IonicModule,
    ],
    exports: [
        FlitdeskInputComponent,
        FlitdeskCheckboxComponent,
        FlitdeskButtonComponent,
        FlitdeskCardComponent,
        FlitdeskAvatarComponent
    ]
})
export class FlitdeskModule { }