import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material';
import { VIEW_CARDS_TABLE_COLS } from '../../../shared/constants/constants'
import { Meeting } from '../../Meeting';
import { MeetingCard } from './MeetingCard';
import { Error } from '../../../shared/models/Error';

@Component({
  selector: 'app-view-cards-modal',
  templateUrl: './view-cards-modal.component.html',
  styleUrls: ['./view-cards-modal.component.scss']
})
export class ViewCardsModalComponent {

  public meetingInfo:Meeting;
  public meetingCards:MeetingCard[];
  public error;

  public displayedColumns = VIEW_CARDS_TABLE_COLS;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {meeting:Meeting, response:any}) { 
    this.meetingInfo = data['meeting'];
    this.meetingCards = data['response'];
    this.error = data['error'] ? data['error'] : null;
    console.log(data);
    
    console.log('this.meetingInfo',this.meetingInfo);
    console.log('this.meetingCards',this.meetingCards);
  }

}
