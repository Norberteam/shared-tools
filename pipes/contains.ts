import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ContainsPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'contains',
})
export class ContainsPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    console.log('Checking if \'' + value + '\' contains \'' + args[0]);
    return value.indexOf(args[0]);
  }
}
