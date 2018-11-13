import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'fd-counter',
  templateUrl: 'fd-counter.html'
})
export class FlitdeskCounterComponent {
  @ViewChild('counter') counter: ElementRef;
  @Input('time') time: number;
  @Input('size') size: number;
  @Input('start') start: boolean;
  @Output('onEndCount') onEndCount: EventEmitter<null> = new EventEmitter();

  public displayTime: number;

  constructor() {
    //Need a timeout to wait for the element to render and catch its nativeElement.
    setTimeout(() => {
      this.setTimer(this.size, this.time);
    }, 300);
  }

  getCircleRadius(size){
    return size ? size * 2 * Math.PI : 0;
  }

  /**
   * Creating and setting the counter based on the `time` input
   * Used: http://jsfiddle.net/wz32sy7y/558/ and https://codepen.io/carsy/pen/VvqJwm
   * @param size 
   * @param time 
   */
  setTimer(size: number, time: number){
    if(size && time){
      let offset = this.getCircleRadius((size / 2) - 8);
      let i = 0;
      this.counter.nativeElement.style.strokeDashoffset = offset - (1 * (offset / time));
      this.displayTime = time;
  
      let interval = setInterval(() => {
        if(i === time){
          clearInterval(interval);
          //When the timer ends, send an event
          this.onEndCount.emit(null);
          return;
        }
  
        this.counter.nativeElement.style.strokeDashoffset = offset - ((i + 1) * (offset / time));
        i++;
        this.displayTime--;
      }, 1000);
    }
  }
}
