import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatPaginator } from '@angular/material';

import { ApiService } from '../services/api.service';
import { CASE_TABLE_COLS, VIEW_CARDS_MODAL_SIZE, SUBMIT_AUDIT_MODAL_SIZE, APPROVE_AUDIT_MODAL_SIZE  } from '../shared/constants/constants'
import { Meeting } from './Meeting';
import { ViewCardsModalComponent } from './components/view-cards-modal/view-cards-modal.component';
import { SubmitAuditModalComponent } from './components/submit-audit-modal/submit-audit-modal.component';
import { Tracking } from './components/tracking/Tracking';
import { RedirectTimerService } from '../shared/services/redirect-timer.service';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/User';
import { ApproveAuditModalComponent } from './components/approve-audit-modal/approve-audit-modal.component';
import { AddNoteComponent } from './components/message-center/add-note/add-note.component';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss'],
  providers: [RedirectTimerService]
})
export class CaseComponent implements OnInit {

  public caseData:Meeting[];
  public displayedColumns = CASE_TABLE_COLS;
  public data = new MatTableDataSource();
  public resultsLength:number;
  private errorMsg: string;
  public caseStatus:string;
  private trackingSaved: boolean=false;
  public trackingInfo:Tracking;
  public tabulatorId:string;
  public userInfo:User;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
      private _route:ActivatedRoute, 
      private _apiService:ApiService,
      public _dialog: MatDialog,
      public _redirectTimer:RedirectTimerService, 
      private _userService:UserService ) { }

  
    ngOnInit() {
      this.subscribeToModalChanges();
      this._userService.userConfig.subscribe((res:User) => this.userInfo = res['config']);
    //  this._redirectTimer.subscribeToModalOpened(function(){console.log('HELLO')})
    }

  loadCase(tabulatorId: string){
    // store ID from page component
    this.tabulatorId = tabulatorId;
    this.getCaseData();
  }

  getCaseData(){
    this._apiService.getCases(this.tabulatorId).subscribe( response => {
        this.caseData = response['result']['meetings'];
        this.data = new MatTableDataSource(this.caseData);
        this.data.paginator = this.paginator

        // Store trackingInfo
        if(response['result']['trackingInfo']){
          this.trackingInfo = response['result']['trackingInfo'];
        }
        else{
          this.trackingInfo.error = "Tracking information cannot be retreived at this time."
        } 
      }),
    (error) => {
        this.errorMsg = 'Unable to load queue';
    };
  }

  getMeetingCardDetails(meeting:Meeting) {
    this._apiService.getMeetingCardDetails(meeting.tabulatorMeetingID).subscribe( response => {
      this.openMeetingModal(meeting, response['result']['meetings'])
    }),
    (error) => {
      this.openMeetingModal(meeting, error)
    }    
  }

  openMeetingModal(meeting:Meeting, response:any){
    this._dialog.open(ViewCardsModalComponent, {
      height: VIEW_CARDS_MODAL_SIZE.height, 
      width: VIEW_CARDS_MODAL_SIZE.width,  
      data: {meeting, response}
    })
  }

  onTrackingSaved( savedPayload:{isSaved:boolean, method:string, reference:string} ){
    const {isSaved, method, reference} = savedPayload;
    this.trackingSaved = isSaved;
    this.trackingInfo.trackingMethod = method;
    this.trackingInfo.trackingReference = reference;   
  }

  submitForAudit(){
    this._dialog.open(SubmitAuditModalComponent, {
      height: SUBMIT_AUDIT_MODAL_SIZE.height, 
      width: SUBMIT_AUDIT_MODAL_SIZE.width,
      data: {
        'trackingSaved': this.trackingSaved,
        'trackingInfo': this.trackingInfo,
        'tabulatorId': this.tabulatorId
      } 
    }).afterClosed().subscribe(result =>  console.log("Submit Audit Modal Closed"));
  }
  
  approveRejectAudit(approved:boolean){
    this._dialog.open(ApproveAuditModalComponent, {
      height: APPROVE_AUDIT_MODAL_SIZE.height, 
      width: APPROVE_AUDIT_MODAL_SIZE.width,  
      data: {approved:approved, meetings:this.caseData}
    })
    
  }

  subscribeToModalChanges(){
    this._dialog.afterOpen.subscribe(res => {
      if(res.componentInstance instanceof SubmitAuditModalComponent){
        console.log(res.componentInstance);
        
        this.onAuditSuccess(res.componentInstance)
      }
    })
  }

  onAuditSuccess(submitAuditModal:SubmitAuditModalComponent){
    submitAuditModal.auditSuccessObs.subscribe(successResult =>{
      console.log("auditSuccessObs", successResult);

      if(successResult){
        this._redirectTimer.startTimer().subscribe(timerResult => this._dialog.closeAll())
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.data.filter = filterValue;
  }

  getCaseStatus(rejectedStatus){
    this.caseStatus = rejectedStatus;
  }

  isOperator(){
    return this.userInfo.role.toLowerCase() === 'operator' ? true : false
  }

  download(){
    console.log('downloading...');
  }

  print(){
    console.log('printing...');
  }
}
