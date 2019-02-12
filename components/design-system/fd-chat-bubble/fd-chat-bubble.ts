import { Component, Input } from '@angular/core';

@Component({
  selector: 'fd-chat-bubble',
  templateUrl: 'fd-chat-bubble.html'
})
export class FlitdeskChatBubbleComponent {
  @Input('message') message: string;
  @Input('user-picture') userPicture: string;
  @Input('user-name') userName: string;
  @Input('sender') sender: boolean = false;
  public avatarSize: number = 32;
  
  constructor() {}

  ngOnInit(){
  }

}
