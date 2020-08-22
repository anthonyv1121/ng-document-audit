import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeDashes'
})
export class RemoveDashesPipe implements PipeTransform {

  transform(str: string): string {
    if (typeof str !== 'string') {
      console.error(RemoveDashesPipe, str)
    }
    return str.replace(/\-+/g, ' ');
  }

}
