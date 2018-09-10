import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'groupBy',
})
export class GroupByPipe implements PipeTransform {

  /**
   * Apply this pipe to any array of json or object to group by a selector passed in param 
   * this param act like an object path 
   * ex. 'name' or 'location.floor'
   */

  transform(value: any, key: string) {
    let result: any[] = [];
    let groupedElements: any = {};

    groupedElements = _.groupBy(value,key)
    
    // transform object into an array with of object with key
    for (let prop in groupedElements) {
      if (groupedElements.hasOwnProperty(prop)) {
        result.push({
          key: prop,
          list: groupedElements[prop]
        });
      }
    }

    return result;



  }
}