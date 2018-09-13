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
}
