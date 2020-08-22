import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Queue } from './Queue';
import { QUEUE_TABLE_COLS } from '../shared/constants/constants';
import { TabulatorNameUrlPipe } from '../shared/pipes/tabulator-name.pipe'
import { PathifyPipe } from '../shared/pipes/text-to-path.pipe';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
})

export class QueueComponent implements OnInit {
  public displayedColumns = QUEUE_TABLE_COLS;
  public queueData:Queue[];
  public queueStatus: string = ''
  public queueCategory: string = ''
  public errorMsg:string;
  public userRole:string;

  constructor(
    private _apiService:ApiService, 
    private _router:Router) { }

  ngOnInit() {
    
  }

  onRouteLoaded(pageProps:{category:string, status:string}){
    this.queueCategory = pageProps.category;
    this.queueStatus = pageProps.status;
    this.loadQueue(this.queueCategory, this.queueStatus);
    
    console.log(this.queueCategory, this.queueStatus);
    
  }


  loadQueue(category, status){
    this._apiService.getQueue(category, status).subscribe(response =>{
       this.queueData = response['result']['tabulator'];
       console.log(this.queueData); 
    }),
    (error) => {
        this.errorMsg = 'Unable to load queue';
    };
  }

  goToCase(tabulatorId:string, tabulatorName:string, tabulatorStatus:string){
    console.log('tabulatorName', tabulatorName);
    
    // strip numbers from tabulatorName for breadcrumb
    let tabulatorNameQuery = new TabulatorNameUrlPipe().transform(tabulatorName);
    let caseStatusQuery = new PathifyPipe().transform(tabulatorStatus)
    console.log(tabulatorNameQuery);
    
    this._router.navigate(
      [ '/case', this.queueCategory, this.queueStatus, tabulatorId ], 
      { queryParams:{'name':tabulatorNameQuery, 'status':caseStatusQuery} }
    )
  }

  logData(){
    console.log(this.queueData);    
  }

}
