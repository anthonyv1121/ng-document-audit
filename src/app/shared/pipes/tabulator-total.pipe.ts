import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tabulatorTotal'
})
export class TabulatorTotalPipe implements PipeTransform {
 
  transform(tabulator:any[], countryKey:string, activeCountry:string, totalKey:string): number {  
    return tabulator.filter((queue, i) => {
        return queue[countryKey].toLowerCase() === activeCountry
    })
      .reduce((total, filtered) => {
         return total += parseInt(filtered[totalKey])
       }, 0)
  }
}

// array.filter((item, i) =>{ return item['countryCd']==='UK'}).reduce((total, item) => {return total += parseInt(item['totalCnt'])}, 0)

// return data.reduce((total, item) => {
//   return total + item[key];
// }, 0)