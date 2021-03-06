import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'fd-avatar',
  templateUrl: 'fd-avatar.html'
})
export class FlitdeskAvatarComponent {
  @Input('image') image: string;
  @Input('icon') icon: string;
  @Input('initial') initial: string;
  @Input('size') size: number;
  @Output('onClick') onClick: EventEmitter<any> = new EventEmitter(); 

  public showContent: boolean = false;

  constructor(public sanitizer: DomSanitizer) {
  }

  avatarClicked(){
    this.onClick.emit(null);
  }

  sanitizeImage(image: string){
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }
}
