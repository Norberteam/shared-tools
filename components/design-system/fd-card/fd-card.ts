import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'fd-card',
  templateUrl: 'fd-card.html'
})
export class FlitdeskCardComponent {
  @Input('chevron') chevron: boolean = true;
  @Input('image') image: string;
  @Input('image-position') imagePosition: string;
  @Input('image-size') imageSize: number;
  @Input('button') button: boolean;
  @Input('button-label') buttonLabel: string;
  @Input('statusbar') statusbar: boolean;
  @Input('statusbar-options') statusbarOptions: FlitDeskCardStatusbarOptions;
  @Input('shadow') shadow: boolean = true;
  @Output('onClick') onClick: EventEmitter<null> = new EventEmitter();
  @Output('buttonClick') buttonClick: EventEmitter<null> = new EventEmitter();

  private defaultImageSize = 105;

  constructor(private sanitizer: DomSanitizer) { }

  fdCardClick(){
    this.onClick.emit(null);
  }

  fdCardButtonClick(){
    this.buttonClick.emit(null);
  }

  getImage(image: string){
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  getImageSize(imageSize: number){
    //Return a image size only if its position is `top`
    return (this.imagePosition === 'top') ? (imageSize) ? `${imageSize}px` : `${this.defaultImageSize}px` : '100%';
  }
}

/**
 * Exporting a new class in order to make dynamic elements in the statusbar element.
 */
export class FlitDeskCardStatusbarOptions {
  fields: FlitDeskCardStatusbarField[]; //For now, requesting a property `field` to accomodate all the options
}

/**
 * Defining required / unrequired properties to ensure that the statusbar will work.
 */
export class FlitDeskCardStatusbarField {
  title: string;
  type?: string;
  status_type?: string;
  count?: number;
}