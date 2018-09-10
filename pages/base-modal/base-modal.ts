import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'base-modal',
    templateUrl: 'base-modal.html',
})
export class BaseModalPage {
    @Output() onClear: EventEmitter<null> = new EventEmitter();
    @Output() onSubmit: EventEmitter<null> = new EventEmitter();
    @Output() onClose: EventEmitter<null> = new EventEmitter();
    @Input('showButton') public showButton: boolean = true;
    @Input('buttonLabel') public buttonLabel;
    @Input('rightButtonLabel') public rightButtonLabel;
    @Input('showHeader') showHeader: boolean = true;

    public clearClicked() {
        this.onClear.emit(null);
    }

    public submitClicked() {
        this.onSubmit.emit(null);
    }

    public closeClicked() {
        this.onClose.emit(null);
    }
}
