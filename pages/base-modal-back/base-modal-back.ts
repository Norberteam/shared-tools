import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'base-modal-back',
    templateUrl: 'base-modal-back.html',
})
export class BaseModalPageBack {
    @Output() onAction: EventEmitter<null> = new EventEmitter();
    @Output() onBack: EventEmitter<null> = new EventEmitter();
    @Input('actionEnabled') public actionEnabled: boolean = true;
    @Input('actionLabel') public actionLabel;
    @Input('showAction') public showAction = true;

    public actionClicked() {
        this.onAction.emit(null);
    }

    public backClicked() {
        this.onBack.emit(null);
    }
}
