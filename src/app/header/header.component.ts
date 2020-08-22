import { Component, OnInit, Input } from '@angular/core';
import { User } from '../shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() brand:string;
  @Input() userInfo:User;

  constructor() { }

  ngOnInit() {
    
  }

}
