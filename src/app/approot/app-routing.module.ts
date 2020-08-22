import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { QueueComponent } from '../queue/queue.component';
import { CaseComponent } from '../case/case.component';

const routes:Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'queue/:category/:status', component: QueueComponent},
  { path: 'case/:category/:status/:name', component: CaseComponent},
  { path:'**', redirectTo:'dashboard', pathMatch: 'full' }
];

//Lazy Loading
// const routes:Routes = [
//   { path: 'dashboard', loadChildren:'./dashboard/dashboard.module#DashboardModule'},
//   { path: 'new', loadChildren:'./queue/queue.module#NewQueueModule'},
//   { path:'**', redirectTo:'dashboard', pathMatch: 'full' }
// ];

@NgModule({
  imports: [ 
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
