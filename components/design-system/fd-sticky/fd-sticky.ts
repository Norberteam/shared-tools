import { Directive, ElementRef } from '@angular/core';

/**
 * Directive to deal with `position: sticky` elements.
 */
@Directive({
  selector: '[fd-sticky]' // Attribute selector
})
export class FlitdeskStickyDirective {
  constructor(public elementRef: ElementRef) {
    elementRef.nativeElement.classList.add('fd__sticky');
  }
}
