import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Note } from './Note';

import { API_URL } from '../../../shared/constants/constants';

@Injectable()
export class MessageService {

  constructor(private _httpClient:HttpClient) { }

  getUserMessages(tabulatorId:string): Observable<Note[]> {
      const requestUrl = `${API_URL}/getTabulatorNotesByTabId`
      return this._httpClient.get<Note[]>(requestUrl);
    }
  
  postUserMessage(tabulatorId:string, note:Note): Observable<Note>{
      return this._httpClient.post<Note>(`${API_URL}/saveTabulatorNotesByTabId`, {
        "input": {"note":note, "tabulatorId": tabulatorId},
        "response": {"code": "0","response": "Success"}
      })
  }

}
