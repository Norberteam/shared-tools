import { Component, Input, Output, EventEmitter, ViewChild, ViewChildren, ElementRef, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'fd-chat',
  templateUrl: 'fd-chat.html',
  providers: [DatePipe]
})
export class FlitdeskChatComponent {
  @ViewChild('chat') chat: ElementRef;
  @ViewChild('content') content;
  @ViewChildren('messageBubbles') messageBubbles;
  @Input('messages') messages: BehaviorSubject<any>; //The messages should be received as an observable in order to receive data and upload the DOM
  @Input('send-button') sendButton: string;
  @Input('input') input: boolean = true;
  @Input('input-options') inputOptions: boolean;
  @Input('input-placeholder') inputPlaceholder: string;
  @Input('admin') admin: boolean = false;
  @Output('onMessage') onMessage: EventEmitter<any> = new EventEmitter();
  public messageRecord: any = [];
  public messageList: any = [];
  public now = new Date();

  constructor(private datePipe: DatePipe, private changeDetection: ChangeDetectorRef) {}

  ngOnInit(){
    //Subscribing to an observable of messages to be able to proccess it before showing.
    if(this.messages && this.messages.subscribe){
      this.messages.subscribe((messages: any) => {
        if(messages){
          this.messageRecord = messages;
          this.messageList = this.organizeMessages(messages);
          //Using change detection to reload the DOM
          this.changeDetection.markForCheck();
        }
      });
    }

    this.handleHeight();
  }

  /**
   * Adding a message to the list
   * @param message what the user has typed
   */
  addMessage(message: string){
    this.onMessage.emit(message); //Sending the message to be stored
    let newMessage = { created: new Date().toISOString(), text: message };
    this.messageRecord.push(newMessage);
    this.messageList = this.organizeMessages(this.messageRecord);
    //Subscribing when a message is added to the list
    this.messageBubbles.changes.subscribe(messages => {
      let content = this.content._scrollContent.nativeElement;
      let dayTitle = content.querySelector('.day__title') ? content.querySelector('.day__title').offsetHeight : 0; //Querying any title, that is supposed to be the same height as the others
      let last = messages && messages.last && messages.last.nativeElement ? messages.last.nativeElement.offsetHeight : null; //Getting the last message on the list, in order to know its height
      let scroll = this.content._scrollContent.nativeElement.scrollTop;
      this.content._scrollContent.nativeElement.scrollTop = scroll + last + dayTitle; //Adding the height of the last message to the scroll.
    });

  }

  /**
   * Organizing the height of the component
   */
  handleHeight(){
    let scrollContent = this.chat.nativeElement.closest('.scroll-content');
    let input = this.chat.nativeElement.querySelector('.fd__chat-input');
    let chatContent = this.chat.nativeElement.querySelector('.scroll-content');
    let padding = 32;
    scrollContent.style.paddingTop = 0;
    chatContent.style.height = `${scrollContent.offsetHeight - input.offsetHeight - (padding / 2)}px`;
    chatContent.style.paddingBottom = `${input.offsetHeight + (padding / 2)}px`;
  }

  /**
   * Organizing the message list by date
   * @param list list of messages received by Input
   */
  organizeMessages(list: any){
    //Sorting the messages before organizing them
    list.sort((a, b) => {
      if(!a.created || !b.created) return 0;
      return new Date(a.created) < new Date(b.created) ? -1 : (new Date(a.created) > new Date(b.created) ? 1 : 0);
    });
    
    let organized = [];

    list.forEach((message: any) => {
      let created = new Date(message.created);
      let id = created ? `${created.getMonth() + 1}${created.getDate()}${created.getFullYear()}` : 'TestId';
      let day = { id: id };

      //organized array is empty for the moment, so we need to populate it with the first records
      if(organized.length === 0 || organized.findIndex(item => item.id === day.id) === -1){
        let messages = [];
        day['groups'] = []; 

        messages.push(message);
        day['groups'].push({ id: this.datePipe.transform(created, 'HH'), hour: created, messages: messages }); // Inserting the hours array for that particular day
        organized.push(day);

      }else if(organized.findIndex(item => item.id === day.id) !== -1){ //If there's a record for the day
        let index = organized.findIndex(item => item.id === day.id);
        
        if(organized[index].groups && organized[index].groups.findIndex(group => group.id === this.datePipe.transform(created, 'HH')) !== -1){ //If there's a record for the hour
          let groupIndex = organized[index].groups.findIndex(group => group.id === this.datePipe.transform(created, 'HH'));
          organized[index].groups[groupIndex].messages.push(message);
        }else{ //If there isn't a record for the hour
          let messages = [];
          if(!organized[index].groups) organized[index]['groups'] = [];

          messages.push(message);
          organized[index].groups.push({ id: this.datePipe.transform(created, 'HH'), hour: created, messages: messages });
        }

      }
    });

    return organized;
  }

  isSender(bubble: any){
    if(bubble && bubble.type) return bubble.type === 'TASK.MESSAGE.FROM_ADMIN' ? (this.admin ? false : true) : bubble.type === 'TASK.MESSAGE.FROM_USER' ? (this.admin ? true : false) : null;
  }

}
