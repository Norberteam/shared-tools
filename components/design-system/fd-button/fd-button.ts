import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fd-button',
  templateUrl: 'fd-button.html'
})
export class FlitdeskButtonComponent {
  @Input('label') label: string;
  @Input('icon') icon: string;
  @Input('type') type: string;
  @Input('style') style: string;
  @Input('provider') provider: string;
  @Input('disabled') disabled: boolean;
  @Input('full') full: boolean = true;
  @Output('onClick') onClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  fdButtonClick(){
    if(!this.disabled) this.onClick.emit(null);
  }

}