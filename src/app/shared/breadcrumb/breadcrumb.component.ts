import { Component, OnInit, Input } from '@angular/core';
import { PageProp } from '../models/PageProp';
import { ROOT_PATH, REJECTED_LABEL } from '../constants/constants';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() path: string;
  @Input() breadcrumbs:PageProp[];

  public isRejected:boolean;
  public rejectedLabel = REJECTED_LABEL;

  constructor(){ }

  ngOnInit() {
    this.checkRejected();
  }

  checkRejected(){
    this.isRejected = this.breadcrumbs.filter(b => b.query && b.query['status']).reduce((t,b) => b.query['status'] === 'rejected', false);
  }
  
}
