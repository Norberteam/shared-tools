import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fd-chat-bubble',
  templateUrl: 'fd-chat-bubble.html'
})
export class FlitdeskChatBubbleComponent {
  @Input('message') message: string;
  @Input('image') image: string;
  @Input('user-picture') userPicture: string;
  @Input('user-name') userName: string;
  @Input('sender') sender: boolean = false;
  @Input('id') id: string;
  @Output('onImageClick') onImageClick: EventEmitter<string> = new EventEmitter(null);
  public avatarSize: number = 32;
  
  constructor() {}

  ngOnInit(){
  }

  /**
   * Emit when the image on the bubble was clicked
   * @param image the url of the image.
   */
  imageClick(image: string){
    this.onImageClick.emit(image);
  }

}
