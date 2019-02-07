import { Component, Input } from '@angular/core';

@Component({
  selector: 'fd-chat-bubble',
  templateUrl: 'fd-chat-bubble.html'
})
export class FlitdeskChatBubbleComponent {
  @Input('message') message: string;
  @Input('user-picture') userPicture: any;
  @Input('user-name') userName: any;
  @Input('admin') admin: boolean = false;
  
  constructor() {}

}
