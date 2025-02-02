import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditServiceComponent } from './service-list/edit-service/edit-service.component';
import { ServiceListComponent } from './service-list/service-list.component';
const routes: Routes = [
  { path: '', component: ServiceListComponent },
  { path: 'add-service', component: EditServiceComponent },
  { path: '**', redirectTo: '' } // Redirect to home for any unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
