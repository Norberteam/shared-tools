import { Component, Input } from '@angular/core';
import { AbstractValueAcessor, MakeProvider } from '../abstract-value-acessor';

@Component({
  selector: 'fd-textarea',
  templateUrl: 'fd-textarea.html',
  providers: [ MakeProvider(FlitdeskTextareaComponent) ]
})
export class FlitdeskTextareaComponent extends AbstractValueAcessor<string> {
  @Input('placeholder') placeholder: string;
  @Input('rows') rows: number;
  @Input('control') control: any;
  @Input('error') error: any;

  constructor() {
    super();
  }

}
