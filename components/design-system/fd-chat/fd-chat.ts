import { Component, Input } from '@angular/core';

@Component({
  selector: 'fd-chat',
  templateUrl: 'fd-chat.html'
})
export class FlitdeskChatComponent {
  public messageList: any = [];
  @Input('messages') messages: any;
  @Input('send-button') sendButton: string;
  constructor() {}

  ngOnInit(){
    if(this.messages) this.messageList = this.messages;
  }

  addMessage(message: string){
    this.messageList.push({ text: message });
  }

}
