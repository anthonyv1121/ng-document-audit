import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CountryChangeService } from './country-select/country-select.service';
import { Error } from '../shared/models/Error';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/User';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [CountryChangeService]
})
export class DashboardComponent implements OnInit {

    public tabulatorCountries:string[];
    public dashboardData:any[];
    public dashboardError:Error;
    public activeCountry:string;
    public userRole:string;
    
    constructor(
        private _apiService:ApiService,
        private _router:Router,
        private _countryChangeService:CountryChangeService,
        private _route: ActivatedRoute,
        private _userService:UserService) {}

    ngOnInit() {
        this.loadDashboardData();
        this._userService.userConfig.subscribe((res:User) => {
            this.userRole = res['config']['role']
        });
    }
    loadDashboardData(){
        this._apiService.getDashboardData().subscribe(response => {
            this.tabulatorCountries = response['tabulatorCountries'];
            this.dashboardData = response['tabulator'];
            console.log('db data:',this.dashboardData);
            
            this.onCountrySet();    
        },
        (error) => {
          this.dashboardError = {errorCode: error.status, errorStatus:error.statusText}
        })
    }
    onCountrySet(){
        this._countryChangeService.currentCountry.subscribe(country => {
            this.activeCountry = country.toLowerCase();
            console.log('Country changed to: ', this.activeCountry);    
        })
    }

    goToQueue(category, q){
        // prevent operator from clicking ready for audit box
        if(q === 'audit' && this.userRole.toLowerCase() === 'operator'){
            return;
        }
        console.log(category, q);
        this._router.navigate(['/queue', category, q]); 
    }

    logData(){
       console.log(this.dashboardData);
    }

}
