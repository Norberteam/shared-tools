import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AbstractValueAcessor, MakeProvider } from '../abstract-value-acessor';

@Component({
  selector: 'fd-checkbox',
  templateUrl: 'fd-checkbox.html',
  providers: [ MakeProvider(FlitdeskCheckboxComponent) ]
})
export class FlitdeskCheckboxComponent extends AbstractValueAcessor<boolean>  {
  @Input('label') label: string;
  @Input('html-label') htmlLabel: boolean;
  @Input('checked') checked: boolean;
  @Input('disabled') disabled: boolean;
  @Input('orientation') orientation: string;
  @Output('onChecked') onChecked: EventEmitter<null> = new EventEmitter();
  @Output('onUnchecked') onUnchecked: EventEmitter<null> = new EventEmitter();

  constructor() {
    super();
  }
  
  toggleCheck(event){
    if(event && event.value === false){
      this.onUnchecked.emit(null);
    }else{
      this.onChecked.emit(null);
    }
  }

}
