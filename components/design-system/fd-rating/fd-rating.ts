import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fd-rating',
  templateUrl: 'fd-rating.html'
})
export class FlitdeskRatingComponent {
  @Input('size') size: number;
  @Input('rated') rated: number;
  @Input('icon-outline') iconOutline: string;
  @Input('icon-fill') iconFill: string;
  @Input('disabled') disabled: boolean;
  @Output('onRate') onRate: EventEmitter<any> = new EventEmitter();

  public rating: any[] = [];

  constructor() {
  }
  
  ngOnInit(){
    for(let i = 0, len = this.size; i < len; i++){
      if(this.rated && i <= this.rated - 1){
        this.rating.push({ index: i, selected: true });
      }else{
        this.rating.push({ index: i, selected: false });
      }
    };
  }

  /**
   * Select / deselect the icons and emit the value
   * @param item the icon clicked representing the score.
   */
  rate(item){
    //If the disabled parameter is set to `true`, it's not possible to increment / decrement the score.
    if(!this.disabled){
      let score = 0;
      this.rating.forEach((el, index) => {
        if(index <= item.index){
          el.selected = true;
          score++;
        }else{
          el.selected = false;
        }
      });
  
      this.onRate.emit(score);
    }
  }

}
