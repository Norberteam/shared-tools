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
  @Input('disabled') disabled: boolean;
  @Output('onClick') onClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  fdButtonClick(){
    this.onClick.emit(null);
  }

}
