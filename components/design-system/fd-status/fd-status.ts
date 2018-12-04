import { Component, Input } from '@angular/core';

@Component({
  selector: 'fd-status',
  templateUrl: 'fd-status.html'
})
export class FlitdeskStatusComponent {
  @Input('title') title: string;
  @Input('status') status: string;
  @Input('orientation') orientation: string;

  constructor() {
  }

}
