import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pathify'
})
export class PathifyPipe implements PipeTransform {

  transform(str: string): string {
    if (typeof str !== 'string') {
      console.error(PathifyPipe, str)
    }
    return str.replace(/\s+/g, '-').toLowerCase()
  }

}
