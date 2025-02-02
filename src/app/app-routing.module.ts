import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditServiceComponent } from './service-list/edit-service/edit-service.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { ApplicationViewComponent } from './application-view/application-view.component';
import { IncidentListComponent } from './incident-view/incident-list.component';
const routes: Routes = [
  { path: '', component: ApplicationViewComponent },
  { path: 'services/:appId', component: ServiceListComponent },
  { path: 'add-service', component: EditServiceComponent },
  { path: 'incidents/:serviceId', component: IncidentListComponent },
  { path: '**', redirectTo: '' } // Redirect to home for any unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
