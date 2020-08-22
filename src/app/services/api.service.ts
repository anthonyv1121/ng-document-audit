import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Queue } from '../queue/Queue'
import { Meeting } from '../case/Meeting';

import { API_URL } from '../shared/constants/constants';
import { Tracking } from '../case/components/tracking/Tracking';


@Injectable()

export class ApiService {

    constructor(private _http:Http){}

    getDashboardData(){
        return this._http.get(`${API_URL}/getDashboardInfo`)
            .map(res => res.json())                
            .map(res => res['results']) 
            .catch(this.errorHandler);
    }

    getQueue(category, status): Observable<any[]> {
        return this._http.get( `${API_URL}/getTabulatorByPriority_${category}_${status}` )
            .map(res => res.json())
            .map(res => <Queue[]>res)
            .catch(this.errorHandler);
    }

    getCases(tabulatorId:string): Observable<any> {
        console.log('POST REQUEST FOR tabulator id',tabulatorId);
        
        return this._http.get( `${API_URL}/getTabulatorDetailsByTabId` )
            .map(res => res.json())
            .map(res => <any>res)
            .catch(this.errorHandler);
            // return this._http.post( `${API_URL}/getTabulatorDetailsByTabId`, {"input":{"tabulatorId":tabulatorId}} )
            // .map(res => res.json())
            // .map(res => console.log(res))
            // .catch(this.errorHandler);
    }

    postTracking(tracking:any):Observable<Tracking> {
        return this._http.post( `${API_URL}/getTabulatorDetailsByTabId`, tracking)
          .map(res => res.json())
          .map(res => new Tracking(res.trackingMethod, res.trackingReference))
    }

    getMeetingCardDetails(tabulatorMeetingID:string){
        console.log('POST REQUEST FOR tabulatorMeetingID',tabulatorMeetingID);
        
        return this._http.get( `${API_URL}/getMeetingCardDetails` )
            .map(res => res.json())
            .map(res => <any>res)
            .catch(this.errorHandler);
    }
    /* Auditor to Approve or Reject*/
    postAudit(status:string,meetings:Meeting[]){
        return this._http.post(`${API_URL}/confirmAudit`, {'status':status, 'meetings':meetings})
            .map(res => res.json())
            .map(res => <any>res)
            .catch(this.errorHandler);
    }
    /*Operator Submit */
    submitAudit(tabulatorId:string){
        return this._http.post(`${API_URL}/submitAudit`, {'tabulatorId':tabulatorId, })
        .map(res => res.json())
        .map(res => <any>res)
        .catch(this.errorHandler);
    }
    private errorHandler(error: Response | any){
        console.error('ApiService::handleError', error);
        return Observable.throw(error)
    }
    
}