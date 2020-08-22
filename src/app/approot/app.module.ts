import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module'
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from '../header/header.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { QueueComponent } from '../queue/queue.component';

import { CountrySelectComponent } from '../dashboard/country-select/country-select.component';
import { PagePropsService } from '../shared/services/page-props.service'
import { ApiService } from '../services/api.service';
import { CaseComponent } from '../case/case.component';
import { TrackingComponent } from '../case/components/tracking/tracking.component';
import { MessageCenterComponent } from '../case/components/message-center/message-center.component';
import { MessageService } from '../case/components/message-center/message.service';
import { ViewCardsModalComponent } from '../case/components/view-cards-modal/view-cards-modal.component';
import { SubmitAuditModalComponent } from '../case/components/submit-audit-modal/submit-audit-modal.component';
import { UserService } from '../shared/services/user.service';
import { AddNoteComponent } from '../case/components/message-center/add-note/add-note.component';
import { ApproveAuditModalComponent } from '../case/components/approve-audit-modal/approve-audit-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    QueueComponent,
    CountrySelectComponent,
    CaseComponent,
    TrackingComponent,
    MessageCenterComponent,
    ViewCardsModalComponent,
    SubmitAuditModalComponent,
    AddNoteComponent,
    ApproveAuditModalComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule
 ],
  entryComponents: [ViewCardsModalComponent, SubmitAuditModalComponent, AddNoteComponent, ApproveAuditModalComponent],
  providers: [PagePropsService, ApiService, MessageService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
