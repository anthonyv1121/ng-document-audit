import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from "rxjs";
import { Router } from '@angular/router';
import { SubmitAuditModalComponent } from '../../case/components/submit-audit-modal/submit-audit-modal.component';
import { AddNoteComponent } from '../../case/components/message-center/add-note/add-note.component';
import { MatDialog } from '@angular/material';
import { ApproveAuditModalComponent } from '../../case/components/approve-audit-modal/approve-audit-modal.component';
import { ViewCardsModalComponent } from '../../case/components/view-cards-modal/view-cards-modal.component';

@Injectable()
export class RedirectTimerService {
 private timer = Observable.timer(5000);
 private subscription: Subscription;

    constructor(private _router:Router, private _dialog:MatDialog){}

    startTimer():Observable<number>{
       this.subscription = this.timer.subscribe(interval => {
            this._router.navigate(['/']);
            this.subscription.unsubscribe();
        })
        return this.timer
    }

    subscribeToModalOpened(callback:Function){
        this._dialog.afterOpen.subscribe(res => {
            let currentModal;
            let observer;

            switch(res.componentInstance.constructor) {
                case SubmitAuditModalComponent:
                     currentModal = res.componentInstance as SubmitAuditModalComponent;
                     observer = currentModal.auditSuccessObs;
                     break;
    
                case AddNoteComponent:
                     currentModal = res.componentInstance as AddNoteComponent
                     observer = currentModal.noteSuccessObs
                     break;
    
                case ApproveAuditModalComponent:
                     break;
    
                case ViewCardsModalComponent:
                     break;
              }
            this.onSubscribeSuccess(observer, callback)
        })
    }

    onSubscribeSuccess(observer, onSucess:Function){
       observer.subscribe(successResult =>{
            console.log("auditSuccessObs", successResult);
      
            if(successResult){
                onSucess();
            }
          });
    }
}
