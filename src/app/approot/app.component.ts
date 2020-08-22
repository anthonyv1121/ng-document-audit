import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service'
import { User } from '../shared/models/User';
import { Error } from '../shared/models/Error';
import { APP_TITLE } from '../shared/constants/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})
export class AppComponent {
  public applicationName:string = APP_TITLE;
  public userInfo:User;
  public userServiceError: Error;

  constructor(private _userService:UserService) { }

  ngOnInit() {
    this._userService.userConfig.subscribe(res => {     
      console.log(res);
             
      if( res['error']){
        this.userServiceError = res['error'];
      } 
      else {
        this.userInfo = res['config'];
      }
    })
  }
}