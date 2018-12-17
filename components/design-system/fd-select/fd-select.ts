import { Component, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { App, ViewController, PopoverController, NavParams, Platform } from 'ionic-angular';
import { AbstractValueAcessor, MakeProvider } from '../abstract-value-acessor';

@Component({
  selector: 'fd-select',
  templateUrl: 'fd-select.html',
  providers: [ MakeProvider(FlitdeskSelectComponent) ]
})
export class FlitdeskSelectComponent extends AbstractValueAcessor<string>  {
  @ViewChild('select') select: ElementRef;
  @Input('options') options: string[];
  @Input('label') label: string;
  @Input('placeholder') placeholder: string;
  @Input('list-width') listWidth: number;
  @Input('list-height') listHeight: number;
  @Output('onSelect') onSelect: EventEmitter<any> = new EventEmitter();

  public showList: boolean = false;
  public optionActive: string;
  private defaultListHeight: number = 160;

  constructor(
    private app: App, 
    private popoverCtrl: PopoverController,
    private platform: Platform
  ) {
    super();
  }

  /**
   * Need to create the select it from scratch in order to detect when the popover appears and better control it
   * @param event 
   */
  openList(event){
    //Create an emitter to know when the Popover initialized
    let openEmitter = new EventEmitter<boolean>();
    let selectedEmitter = new EventEmitter<string>();
    let popover = this.popoverCtrl.create(FlitdeskSelectList, { options: this.options, open: openEmitter, selected: selectedEmitter, active: this.optionActive }, { cssClass: 'fd__select-list' });
    popover.present({ ev: event });

    //Subscription after the popover was opened
    openEmitter.subscribe(emit => {
      if(emit){
        this.showList = true;
        //Making calculations to position the popover
        let popover = this.app._appRoot._elementRef.nativeElement.querySelector('ion-popover');
        let selectBounding = this.select.nativeElement.getBoundingClientRect();
        let screenSize = this.app._appRoot._elementRef.nativeElement.offsetWidth;
        let selectRight = screenSize - selectBounding.right;
        let marginTop = this.select.nativeElement.querySelector('.select__overlay').offsetHeight;

        if(popover && selectBounding){
          popover.querySelector('.popover-content').style.width = `${ this.listWidth ? this.listWidth : selectBounding.width }px`;
          popover.querySelector('.popover-content').style.right = `${selectRight}px`;     
          popover.querySelector('.popover-content').style.maxHeight = `${ this.listHeight ? this.listHeight : this.defaultListHeight }px`;
          if(this.platform.is('android') && marginTop) popover.querySelector('.popover-content').style.marginTop = `${ marginTop }px`;
        }
      }else{
        this.showList = false;
      }
    });

    //Subscription after an option was selected.
    //Usign the selected value to fill the `fd-input` and store it for the next time the `fd-select-list` is opened.
    selectedEmitter.subscribe(emit => {
      if(emit) {
          this.optionActive = emit;
          this.onSelect.emit({ selected: emit });
      }
    });
  }
}

/**
 * Defining a new component to be the `fd-select-list`
 */
@Component({
  template: `
    <ion-list *ngIf="options">
      <button ion-item *ngFor="let option of options" (click)="select(option.label)" [ngClass]="{ 'option--selected': option.selected }">
        {{ option.label }} 
        <ion-icon item-right name="checkmark" *ngIf="option.selected"></ion-icon>
      </button>
    </ion-list>
  `
})
export class FlitdeskSelectList {
  public options: any;
  public open: EventEmitter<boolean>;
  public selected: EventEmitter<string>;
  public active: EventEmitter<string>;

  constructor(private navParams: NavParams, private viewCtrl: ViewController){
    this.open = this.navParams.get('open');
    this.selected = this.navParams.get('selected');
    this.active = this.navParams.get('active');
  }

  /**
   * Process the options to insert it in a model when the popover loads.
   */
  ngOnInit(){
    this.options = this.processOptions(this.navParams.get('options'));
  }

  /**
   * Using the Lifehook to alert the `fd-select` element to adjust the width and position of the popover
   */
  ngAfterViewInit(){
    this.open.emit(true);
  }

  /**
   * Tell when to remove the styles for the `fd-select`, used in order to adjust the layout for the popover.
   */
  ngOnDestroy(){
    this.open.emit(false);
  }

  /**
   * Select an option by clicking in an item of the list.
   * @param option 
   */
  select(option){
    this.selected.emit(option);
    this.viewCtrl.dismiss();
  }

  /**
   * Format the options to control the state of the item.
   * @param options 
   */
  processOptions(options){
    let opt = [];

    options.forEach(option => {
      if(this.active && option === this.active){
        opt.push({ label: option, selected: true });
      }else{
        opt.push({ label: option, selected: false });
      }
    });

    return opt;
  }
}