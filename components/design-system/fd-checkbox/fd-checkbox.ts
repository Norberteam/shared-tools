import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AbstractValueAcessor, MakeProvider } from '../abstract-value-acessor';

@Component({
  selector: 'fd-checkbox',
  templateUrl: 'fd-checkbox.html',
  providers: [ MakeProvider(FlitdeskCheckboxComponent) ]
})
export class FlitdeskCheckboxComponent extends AbstractValueAcessor<boolean>  {
  @Input('label') label: string;
  @Input('checked') checked: boolean;
  @Input('disabled') disabled: boolean;
  @Input('orientation') orientation: string;
  @Output('onChecked') onChecked: EventEmitter<null> = new EventEmitter();

  constructor() {
    super();
  }
  
  toggleCheck(){
    this.onChecked.emit(null);
  }

}
