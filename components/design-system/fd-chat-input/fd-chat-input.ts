import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fd-chat-input',
  templateUrl: 'fd-chat-input.html'
})
export class FlitdeskChatInputComponent {
  @ViewChild('input') input: ElementRef;
  @Input('options') options: boolean = false;
  @Input('placeholder') placeholder: string;
  @Input('button-label') buttonLabel: string;
  @Input('fixed') fixed: boolean = true;
  @Output('onSend') onSend: EventEmitter<null> = new EventEmitter();
  constructor() {}

  public rowControl: number = 1;
  public showButton: boolean = false;  

  /**
   * Checking when the user typed something and evaluating it. 
   * @param event the keyup event value
   */
  handleKeyEvent(event){
    if(event.target.value && event.target.value.replace(/\s/g, '').length > 0) this.showButton = true;
    else this.showButton = false;

    if(event.target.scrollHeight > (event.target.offsetHeight * this.rowControl)){
      this.rowControl++;
    }
    event.target.style.height = `${event.target.scrollHeight}px`;
  }

  /**
   * Detecting when the user pressed the backspace.
   * @param event the keyup event value
   */
  clear(event){
    this.rowControl = 1;
    event.target.style.height = 'auto';
  }

  /**
   * If the user opted to show a button together with the textarea, this function handles it's click.
   */
  send(){
    this.onSend.emit(this.input && this.input.nativeElement ? this.input.nativeElement.value : '');
    let input = this.input.nativeElement;
    if(input){
      input.value = '';
      input.rows = 1;
      input.style.height = 'auto';
    }
  }  
}
