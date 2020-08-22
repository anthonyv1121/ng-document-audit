import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tabulatorNameToUrl'
})
export class TabulatorNameUrlPipe implements PipeTransform {

  transform(str: string): string {
    if (typeof str !== 'string') {
      console.error(TabulatorNameUrlPipe, str)
    }
    // // remove numbers and replace space with '-'
    // let stripped = str.split(/[0-9]/g)[0].replace(/\s+/g, '-')

    // // removes trailing '-'
    // return stripped.substring(0,stripped.length-1).toLowerCase()

    
     let stripped = str.replace(/\s+/g, '-').replace(/\//g, '')
     return stripped.toLowerCase()
  }

}
