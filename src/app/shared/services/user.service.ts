import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../constants/constants';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import 'rxjs/add/observable/throw';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class UserService {
    
    public userConfig = new AsyncSubject();

    constructor(private _http: HttpClient) {
       this.getData().subscribe(
        res => this.broadcast(res),
        err => this.broadcast(err)
       )    
    }

    private getData(){
        return this._http.get(`${API_URL}/loadConfig`).pipe(
            map(this.extractData, this),
            catchError(this.handleError)
        )
    }

    private broadcast(value:any){
        this.userConfig.next(value)
        this.userConfig.complete();
    }

    extractData(response: any) {

        if (response) {
            if (response.error.errorCode) {
                return Observable.throw(response.error)
            } 
             else if (response.result) {
                return response.result;
            }
        }
        else {
            return Observable.throw('Error: Invalid response from API');
        }
    }
    

    private handleError(obj: any) {

        let error:{};

        console.warn('error:', 'Server Error');
        if (obj.error && obj.error.MessageDetail) {
            console.warn('error details:', obj.error.MessageDetail);
        }

        else if(obj instanceof HttpErrorResponse) {
            error = {
                "error":{errorCode:obj.status, errorStatus:obj.statusText}
            }
        }

        return  Observable.throw(error);
    }


}
    

