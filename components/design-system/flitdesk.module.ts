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
import { FlitdeskSelectComponent, FlitdeskSelectList } from './fd-select/fd-select';
import { FlitdeskNavbarComponent } from './fd-navbar/fd-navbar';
import { FlitdeskStickyDirective } from './fd-sticky/fd-sticky';
import { FlitdeskRatingComponent } from './fd-rating/fd-rating';
import { FlitdeskStatusComponent } from './fd-status/fd-status';
import { FlitdeskChatComponent } from './fd-chat/fd-chat';
import { FlitdeskChatBubbleComponent } from './fd-chat-bubble/fd-chat-bubble';
import { FlitdeskChatInputComponent } from './fd-chat-input/fd-chat-input';

@NgModule({
    declarations: [
        FlitdeskInputComponent,
        FlitdeskTextareaComponent,
        FlitdeskCheckboxComponent,
        FlitdeskButtonComponent,
        FlitdeskCardComponent,
        FlitdeskAvatarComponent,
        FlitdeskSignatureComponent,
        FlitdeskCounterComponent,
        FlitdeskSelectComponent,
        FlitdeskSelectList,
        FlitdeskNavbarComponent,
        FlitdeskStickyDirective,
        FlitdeskRatingComponent,
        FlitdeskStatusComponent,
        FlitdeskChatComponent,
        FlitdeskChatBubbleComponent,
        FlitdeskChatInputComponent
    ],
    imports: [
        IonicModule,
    ],
    entryComponents: [
        FlitdeskSelectList
    ],
    exports: [
        FlitdeskInputComponent,
        FlitdeskTextareaComponent,
        FlitdeskCheckboxComponent,
        FlitdeskButtonComponent,
        FlitdeskCardComponent,
        FlitdeskAvatarComponent,
        FlitdeskSignatureComponent,
        FlitdeskCounterComponent,
        FlitdeskSelectComponent,
        FlitdeskSelectList,
        FlitdeskNavbarComponent,
        FlitdeskStickyDirective,
        FlitdeskRatingComponent,
        FlitdeskStatusComponent,
        FlitdeskChatComponent,
        FlitdeskChatBubbleComponent,
        FlitdeskChatInputComponent
    ]
})
export class FlitdeskModule { }