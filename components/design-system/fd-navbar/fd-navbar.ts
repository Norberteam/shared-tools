import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fd-navbar',
  templateUrl: 'fd-navbar.html'
})
export class FlitdeskNavbarComponent {
  @Input('icon-start') iconStart: string;
  @Input('icon-end') iconEnd: string;
  @Input('icon-start-color') iconStartColor: string;
  @Input('icon-end-color') iconEndColor: string;
  @Input('label-start') labelStart: string;
  @Input('label-end') labelEnd: string;
  @Input('button-start') buttonStart: boolean = true;
  @Input('button-end') buttonEnd: boolean = true;
  @Input('title') title: string;
  @Input('box-shadow') boxShadow: boolean;
  @Output('onIconStartClick') onIconStartClick: EventEmitter<null> = new EventEmitter();
  @Output('onIconEndClick') onIconEndClick: EventEmitter<null> = new EventEmitter();

  constructor() {}

  iconStartClick(){
    this.onIconStartClick.emit(null);
  }

  iconEndClick(){
    this.onIconEndClick.emit(null);
  }
}
