import { Component, Input } from '@angular/core';
import { AbstractValueAcessor, MakeProvider } from '../abstract-value-acessor';

@Component({
  selector: 'fd-input',
  templateUrl: 'fd-input.html',
  providers: [ MakeProvider(FlitdeskInputComponent) ]
})
export class FlitdeskInputComponent extends AbstractValueAcessor<string> {
  @Input('label') label: string;
  @Input('placeholder') placeholder: string;
  @Input('labelPlacement') labelPlacement: string;
  @Input('icon') icon: string;
  @Input('type') type: string;
  @Input('value') value: string;
  @Input('disabled') disabled: boolean;
  @Input('control') control: any;
  @Input('error') error: any;
  
  constructor() {
    super();
  }

  isUnicode(str){
    let norbert = str.indexOf('norbert-');
    let ion = str.indexOf('ion-');

    return norbert < 0 && ion < 0 ? true : false;
  }

  getPlaceholder(){
    if(this.placeholder){
      return this.icon && this.isUnicode(this.icon) ? `${this.icon} ${this.placeholder}` : this.placeholder;
    }else{
      return '';
    }
  }
}
