import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PagePropsService } from '../services/page-props.service';

import { PageProp } from '../models/PageProp';
import { ROOT_PATH, QUEUE_PATH, CASE_PATH, URL_PARAMS } from '../constants/constants';
import { FormatPriorityTypePipe } from '../pipes/format-priority-type.pipe';
import { RemoveDashesPipe } from '../pipes/remove-dashes.pipe';

@Component({
	selector: 'm-page',
	templateUrl: 'page.component.html',
	styleUrls: ['page.component.scss']
})
export class PageComponent implements OnInit {

	public path: string;
	public pageProps:PageProp[] = [];

	@Output() qRouteCaptured: EventEmitter<{}> = new EventEmitter();
	@Output() tabulatorIdCaptured: EventEmitter<string> = new EventEmitter();
	@Output() caseStatusCaptured: EventEmitter<string> = new EventEmitter();

	constructor(
		private _router:Router,  
		private _activatedRoute:ActivatedRoute, 
		private _pagePropsService: PagePropsService
		 ) {}
		
	ngOnInit() {
		this.path = this.getPath();
		/* Activate Breadcrumbs*/
		this.addPageProps({ label: 'Dashboard', url: `/${ROOT_PATH}` });
		this._pagePropsService.getpageProps().subscribe(props => this.pageProps = props);

		if(this.path === QUEUE_PATH || this.path === CASE_PATH){
			this.getRouteParams();
		}
	}

	getRouteParams(){
		
		this._activatedRoute.paramMap.subscribe(params => { 

			let category = params.get(URL_PARAMS["1"]);
			let status = params.get(URL_PARAMS["2"]);
			let kase = params.get(URL_PARAMS["3"]);
			
			if(category && status){
			  this.qRouteCaptured.emit({category:category, status:status});
				
			  let formattedStatusLabel = new FormatPriorityTypePipe().transform(status) + ' Queue';

			  this.addPageProps({
				  label: `${category} * ${formattedStatusLabel}`, 
				  url:`/${QUEUE_PATH}/${category}/${status}`
			  });
			  
			  if(kase)	this.configureCaseProps(kase, category, status);
			  else	this._router.navigate(['/queue', category, status]); 
			}
			else{
			  this._router.navigate(['/dashboard']); 
			}
		});	
	}
	
	getPath():string {
		let tree = this._router.parseUrl(this._router.url).root.children['primary'].segments;
		return tree[0]['path'];
	}

	addPageProps(pageProps: PageProp) {
		this.pageProps.push(pageProps);
		this._pagePropsService.setPageProps(this.pageProps)
	}

	configureCaseProps(kase, category, status){
		this.tabulatorIdCaptured.emit(kase);

		this._activatedRoute.queryParams.subscribe(params => {
			let tabName = params['name'];
			let caseStatus = params['status'];
			
			this.caseStatusCaptured.emit(new RemoveDashesPipe().transform(params['status']))

			if(tabName && caseStatus){
				this.addPageProps({
					label: tabName, 
					url:`/${CASE_PATH}/${category}/${status}/${kase}`, 
					query:{'name':tabName, 'status':caseStatus}
				});
			}
		})	
	}
}

	



