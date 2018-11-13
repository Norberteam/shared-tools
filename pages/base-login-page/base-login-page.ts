import { Component } from '@angular/core';

/**
 * Generated class for the BaseLoginPageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'base-login-page',
  templateUrl: 'base-login-page.html'
})
export class BaseLoginPageComponent {

  text: string;

  constructor() {
    console.log('Hello BaseLoginPageComponent Component');
    this.text = 'Hello World';
  }

}
