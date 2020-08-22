import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CountryChangeService {

  private countrySource = new BehaviorSubject<string>("ALL");
  currentCountry = this.countrySource.asObservable();

  constructor() { }

  changeCountry(country: string) {
    this.countrySource.next(country)
  }

}