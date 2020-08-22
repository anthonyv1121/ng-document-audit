import { Pipe, PipeTransform } from '@angular/core';
import { PRIORITY_TYPES, PRIORITY_TYPES_UI_NAMES  } from '../constants/constants';

@Pipe({
  name: 'priorityType'
})
export class FormatPriorityTypePipe implements PipeTransform {

  transform(str: string): string {
    if (typeof str !== 'string') {
      console.error(FormatPriorityTypePipe, str)
      return str;
    }

    let ptName;
    PRIORITY_TYPES.forEach((pt, i) => {
      if (pt === str) ptName = PRIORITY_TYPES_UI_NAMES[i][str];
    })
    
    return ptName;
  }

}
