import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AbstractValueAcessor, MakeProvider } from '../abstract-value-acessor';

@Component({
  selector: 'fd-input',
  templateUrl: 'fd-input.html',
  providers: [ MakeProvider(FlitdeskInputComponent) ]
})
export class FlitdeskInputComponent extends AbstractValueAcessor<string> {
  @Input('label') label: string;
  @Input('placeholder') placeholder: string;
  @Input('label-placement') labelPlacement: string;
  @Input('icon') icon: string;
  @Input('icon-placement') iconPlacement: string;
  @Input('icon-color') iconColor: string;
  @Input('icon-size') iconSize: string;
  @Input('type') type: string;
  @Input('value') value: string;
  @Input('disabled') disabled: boolean;
  @Input('readonly') readonly: boolean;
  @Input('can-clear') canClear: boolean;
  @Input('control') control: any;
  @Input('touch-validation') touchValidation: boolean; 
  @Input('error') error: any;
  @Output('onClick') onClick: EventEmitter<null> = new EventEmitter();
  @Output('onClear') onClear: EventEmitter<null> = new EventEmitter();
  @Output('onIconClick') onIconClick: EventEmitter<null> = new EventEmitter();
  
  constructor() {
    super();
  }

  isUnicode(str){
    if(str && typeof str === 'string'){
      let norbert = str.indexOf('norbert-');
      let ion = str.indexOf('ion-');

      return norbert < 0 && ion < 0 ? true : false;
    }
    return false;
  }

  getPlaceholder(){
    if(this.placeholder){
      return this.icon && this.isUnicode(this.icon) ? `${this.icon} ${this.placeholder}` : this.placeholder;
    }else{
      return '';
    }
  }

  onClearClick(){
    this.onClear.emit(null);
  }

  onInputClick(){
    this.onClick.emit(null);
  }

  onIconClicked(){
    this.onIconClick.emit(null);
  }
}