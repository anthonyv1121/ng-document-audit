import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { PageProp } from '../models/PageProp';

@Injectable()
export class PagePropsService {

  private pagePropsSubject = new BehaviorSubject<PageProp[]>([])
  
  public pageProps = this.pagePropsSubject.asObservable();

  constructor() {  }
  
  getpageProps(){
    return this.pageProps;
  }
  setPageProps(props){
    this.pagePropsSubject.next(props)
  }

  

}
