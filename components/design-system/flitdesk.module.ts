import { NgModule } from '@angular/core';
import { IonicModule }  from 'ionic-angular';
import { FlitdeskInputComponent } from './fd-input/fd-input';
import { FlitdeskTextareaComponent } from './fd-textarea/fd-textarea';
import { FlitdeskCheckboxComponent } from './fd-checkbox/fd-checkbox';
import { FlitdeskButtonComponent } from './fd-button/fd-button';
import { FlitdeskCardComponent } from './fd-card/fd-card';
import { FlitdeskAvatarComponent } from './fd-avatar/fd-avatar';
import { FlitdeskSignatureComponent } from './fd-signature/fd-signature';
import { FlitdeskCounterComponent } from './fd-counter/fd-counter';

@NgModule({
    declarations: [
        FlitdeskInputComponent,
        FlitdeskTextareaComponent,
        FlitdeskCheckboxComponent,
        FlitdeskButtonComponent,
        FlitdeskCardComponent,
        FlitdeskAvatarComponent,
        FlitdeskSignatureComponent,
        FlitdeskCounterComponent
    ],
    imports: [
        IonicModule,
    ],
    exports: [
        FlitdeskInputComponent,
        FlitdeskTextareaComponent,
        FlitdeskCheckboxComponent,
        FlitdeskButtonComponent,
        FlitdeskCardComponent,
        FlitdeskAvatarComponent,
        FlitdeskSignatureComponent,
        FlitdeskCounterComponent
    ]
})
export class FlitdeskModule { }