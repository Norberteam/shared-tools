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
  @Input('label') label: string;
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
