import {Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';

import { Note } from './Note';
import { MESSAGE_CENTER_TITLE, MESSAGE_CENTER_TABLE_COLS, SUBMIT_AUDIT_MODAL_SIZE } from '../../../shared/constants/constants';
import { MessageService } from './message.service';
import { AddNoteComponent } from './add-note/add-note.component';

@Component({
  selector: 'app-message-center',
  templateUrl: './message-center.component.html',
  styleUrls: ['./message-center.component.scss']
})
export class MessageCenterComponent implements OnInit {

  public title:string = MESSAGE_CENTER_TITLE;
  public displayedColumns = MESSAGE_CENTER_TABLE_COLS;
  public userMessages:Note[];
  public dataSource = new MatTableDataSource();
  @Input() tabulatorId:string;
  @Input() userName:string;

  constructor(private _messageService:MessageService, public _dialog: MatDialog) { }

  ngOnInit() {
    this.getMessages();
    console.log('this.userName', this.userName);
  }
  getMessages(){
       this._messageService.getUserMessages(this.tabulatorId).subscribe(data => {
          this.userMessages = data['result']['notes'];
          this.dataSource = new MatTableDataSource(this.userMessages);
          console.log(this.userMessages);  
       })
  }
 
  addNote(){
    this._dialog.open(AddNoteComponent, {
      height: SUBMIT_AUDIT_MODAL_SIZE.height, 
      width: SUBMIT_AUDIT_MODAL_SIZE.width,
      data: {tabulatorId:this.tabulatorId, userName:this.userName}
    }).afterClosed().subscribe(result =>  console.log("Add Note Modal Closed"));

    this.onNotePostedSuccess();
  }

  onNotePostedSuccess(){
    this._dialog.afterOpen.subscribe(res => {
      if(res.componentInstance instanceof AddNoteComponent){
        res.componentInstance.noteSuccessObs.subscribe(successResult => {
          console.log('noteSuccessObs', successResult);
          
          // Get latest messages after Note Saved
          if(successResult) {
            this.getMessages();
          }
        })
      }
    })
  }
}
