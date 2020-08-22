import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'

import { Tracking } from './Tracking';
import { TRACKING_TITLE, TRACKING_SELECT_TEXT, TRACKING_INPUT_TEXT, TRACKING_REFERENCE_OPTIONS, TRACKING_REFERENCE_MIN_LENGTH } from '../../../shared/constants/constants';
import { ApiService } from '../../../services/api.service';
import { Meeting } from '../../Meeting';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
  providers:[]
})
export class TrackingComponent implements OnInit {

  public title:string = TRACKING_TITLE;
  public selectPlaceholder:string = TRACKING_SELECT_TEXT;
  public inputPlaceholder:string = TRACKING_INPUT_TEXT;
  public selectOptions:Array<string> = TRACKING_REFERENCE_OPTIONS;
  public trackingForm:FormGroup; 
  public trackingSubmitted:boolean = false;
  public trackingSaved:boolean = false;
  public trackingUpdated:boolean = false;
  public errorMsg:string;

  @Input() trackingInfo:Tracking;
  @Input() tabulatorId:string;
  @Output() saved: EventEmitter<{}> = new EventEmitter();

  @Input() meetings:Meeting[]; // only for dev

  constructor(private _formBuilder:FormBuilder, private _apiService:ApiService) { }

  ngOnInit() {
    this.getTracking();
  }
  
  configureForm(){
    let {trackingMethod, trackingReference} = this.trackingInfo;
    
    this.trackingForm = this._formBuilder.group({
      'trackingMethod': new FormControl({value: trackingMethod, disabled:false}, Validators.required),
      'trackingReference': new FormControl({value: trackingReference, disabled:false}, Validators.compose([Validators.required, Validators.minLength(TRACKING_REFERENCE_MIN_LENGTH)]))
    })
  }

  getTracking(){
    if(this.trackingInfo.hasOwnProperty('trackingMethod')){ // tracking is returned
        this.broadcastSaved(); 
     }
     else{ // no tracking
        this.trackingInfo = new Tracking(null, null,)
     }
     this.configureForm();
  }

  onSaveForm(){
    // Save Tracking from Form
    this.trackingInfo.trackingMethod = this.trackingForm.value.trackingMethod;
    this.trackingInfo.trackingReference = this.trackingForm.value.trackingReference;

    // Post to API
    this.postTracking()
  }

  postTracking(){
    this.trackingSubmitted = true;
    let fakeBodyPost = {'input':this.tabulatorId, 'result':{'meetings':this.meetings, 'trackingInfo':this.trackingInfo, 'errors':{}}} // only for dev
    this._apiService.postTracking(fakeBodyPost).subscribe(res =>{
      setTimeout(() => { // TODO: remove setTimeout - used to simulate server response wait time
          this.broadcastSaved();
          this.trackingSubmitted = false;
      }, 3000) 
    }),
    (error) => {
       this.errorMsg = 'Unable to to post tracking at this time';
    };
  }

  broadcastSaved(){
    // Flag as saved
    this.trackingSaved = true;
    // Broadcast event with payload
    this.saved.emit({isSaved:this.trackingSaved, method:this.trackingInfo.trackingMethod, reference:this.trackingInfo.trackingReference});
 }

 

  onFieldChange(){
    if(this.trackingSaved){
      this.trackingUpdated = true;
      this.trackingSaved = false;
    }
    console.log(this.trackingSubmitted);
    
  }
}
