import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'fd-avatar',
  templateUrl: 'fd-avatar.html'
})
export class FlitdeskAvatarComponent {
  @Input('image') image: string;
  @Input('icon') icon: string;
  @Output('onClick') onClick: EventEmitter<any> = new EventEmitter(); 

  constructor(public sanitizer: DomSanitizer) {
  }

  avatarClicked(){
    this.onClick.emit(null);
  }

  sanitizeImage(image: string){
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }
}
