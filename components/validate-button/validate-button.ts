import { Component, Input } from '@angular/core';

@Component({
    selector: 'validate-button',
    templateUrl: 'validate-button.html'
})
export class ValidateButtonComponent {
    private alwaysShow: boolean = true;
    @Input('relative') relative: boolean = false; // Absolute bottom position by default
    @Input('text') text: string;
    @Input('show') show: boolean = true;
    @Input('disabled') disabled: boolean = false;
    constructor() {
    }
}
