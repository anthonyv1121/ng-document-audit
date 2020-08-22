import { Component, Inject, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SUBMIT_AUDIT_MODAL_HEADER, NO_TRACKING_APPLIED_MSG, CONFIRM_FOR_AUDIT_MSG, AUDIT_SUCESS_MSG, REDIRECT_MSG } from '../../../shared/constants/constants';
import { Tracking } from '../tracking/Tracking';
import { Error } from '../../../shared/models/Error';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-submit-audit-modal',
  templateUrl: './submit-audit-modal.component.html',
  styleUrls: ['./submit-audit-modal.component.scss']
})

export class SubmitAuditModalComponent {

  public header:string = SUBMIT_AUDIT_MODAL_HEADER;
  public noTrackingMsg: string = NO_TRACKING_APPLIED_MSG;
  public confirmMsg: string = CONFIRM_FOR_AUDIT_MSG;
  public successMsg = {success: AUDIT_SUCESS_MSG, redirect: REDIRECT_MSG};
  public errorMsg:Error;
  private tabulatorId: string;

  public trackingSaved:boolean;
  public trackingInfo:Tracking;
  public auditSubmitted:boolean = false;
  
  public auditSuccess:boolean = false;
  private auditSuccessSubject = new BehaviorSubject(this.auditSuccess);
  public auditSuccessObs = this.auditSuccessSubject.asObservable();

  constructor(@Inject(MAT_DIALOG_DATA) private data:any, private _apiService:ApiService) { 
    this.trackingSaved = this.data.trackingSaved;
    this.trackingInfo = this.data.trackingInfo;
    this.tabulatorId = this.data.tabulatorId
  }


  onSubmitAudit() {
    this.auditSubmitted = true;
    setTimeout(() => {
      this._apiService.submitAudit(this.tabulatorId)
                      .subscribe(res => {
                        this.auditSuccess = true;
                        this.auditSuccessSubject.next(this.auditSuccess);
                      })
    }, 4000)
  }

}
