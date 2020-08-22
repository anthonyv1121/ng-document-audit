import { Component, OnInit, Input } from '@angular/core';
import { CountryChangeService } from './country-select.service';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss']
})
export class CountrySelectComponent implements OnInit {

  public selected:string;
  @Input() countries:string[];

  constructor(private _countryChangeService:CountryChangeService) { }

  ngOnInit() {
    this._countryChangeService.currentCountry.subscribe(country => this.selected = country);
  }
  
  onChange(){
    this._countryChangeService.changeCountry(this.selected)
  }

}
