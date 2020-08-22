import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Note } from '../Note';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent {

  private note:Note;
  public message:string;
  public noteSubmitted:boolean = false;
  
  public noteSuccess:boolean = false;
  private noteSuccessSubject = new BehaviorSubject(this.noteSuccess);
  public noteSuccessObs = this.noteSuccessSubject.asObservable()

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private _messageService:MessageService) { }

  saveNote(){
    this.note = { dateTime:Date.now(), userName:this.data.userName, note:this.message };
    this.noteSubmitted = true;
    console.log(this.note);
    setTimeout(() => {this.postNote()}, 4000) 
  }

  postNote(){
    this._messageService.postUserMessage(this.data.tabulatorId, this.note)
      .subscribe(response => {
        console.log(response);
        this.noteSuccess = true;
        this.noteSuccessSubject.next(this.noteSuccess)
      })
  }

}

