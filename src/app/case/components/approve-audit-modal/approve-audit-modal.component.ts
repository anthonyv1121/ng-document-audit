import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-approve-audit-modal',
  templateUrl: './approve-audit-modal.component.html',
  styleUrls: ['./approve-audit-modal.component.scss']
})
export class ApproveAuditModalComponent  {

  public submitted:boolean = false;
  public success:boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data:any,
    private _apiService:ApiService) { }


  isApproved():string{
    return this.data['approved'] ? 'Approval' : 'Rejection';
  }

  submitAudit(){
    this.submitted = true;
    setTimeout(() => {
      this._apiService.postAudit(this.isApproved(), this.data['meetings'])
        .subscribe(res => this.success = true)
    }, 4000) 
    
  }
}
