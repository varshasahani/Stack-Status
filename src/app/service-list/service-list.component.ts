import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditIncidentComponent } from '../incident-view/edit-incident/edit-incident.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { SharedService } from '../shared.service';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.sass']
})
export class ServiceListComponent {
  applicationId: number;
  selectedApplicationName: string = '';
  services =[]
  applicationName: string;

  constructor( public dialog: MatDialog, private route: ActivatedRoute,private sharedService: SharedService,private router: Router,private applicationService: ApplicationService){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.applicationId = +params['appId'];
      console.log('app',this.applicationId)
      this.fetchServicesByApplicationId(this.applicationId);
      const selectedApplication = this.sharedService.getSelectedApplication();
      if (selectedApplication && selectedApplication.id === this.applicationId) {
        this.applicationName = selectedApplication.name;
      } else {
        // Handle case where application details are not available
        this.applicationName = 'Unknown Application';
      }
    });
  }

  viewService(service: any) {
    this.router.navigate(['/incidents', service.id]);
  console.log('Viewing service:', service);
}

  fetchServicesByApplicationId(applicationId: number): void {
    this.applicationService.getServicesByApplicationId(applicationId).subscribe(services => {
      this.services = services;
    });
  }

  editService(service: any) {
    const dialogRef = this.dialog.open(EditServiceComponent, {
      width: '400px',
      data: { isEditMode: true, applicationId: this.applicationId, serviceId: service.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteService(serviceId: any) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.applicationService.deleteService(serviceId).subscribe(() => {
          // Remove the deleted service from the services array
          this.services = this.services.filter(service => service.id !== serviceId);
        });
        console.log('Deleting service:', serviceId);
      }
    });
  }

  openAddServiceDialog(): void {
    const dialogRef = this.dialog.open(EditServiceComponent, {
      width: '400px',
      data: { isEditMode: false, applicationId: this.applicationId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
