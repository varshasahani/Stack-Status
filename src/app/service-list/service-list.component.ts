import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditIncidentComponent } from './edit-incident/edit-incident.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.sass']
})
export class ServiceListComponent {
  services = [
    { name: 'API Gateway', status: 'Operational', recentIncident: 'None', active: 'Yes', timeline: '24h' },
    { name: 'Authentication Service', status: 'Degraded', recentIncident: 'Issue 123', active: 'No', timeline: '48h' },
    { name: 'Database Service', status: 'Operational', recentIncident: 'None', active: 'Yes', timeline: '24h' },
    { name: 'Payment Gateway', status: 'Outage', recentIncident: 'Issue 456', active: 'No', timeline: '72h' },
    { name: 'Notification Service', status: 'Operational', recentIncident: 'None', active: 'Yes', timeline: '24h' }
  ];

  constructor( public dialog: MatDialog){}
    viewService(service: any) {
    // Implement view logic here
    console.log('Viewing service:', service);
  }

  editService(service: any) {
    // Implement edit logic here
    console.log('Editing service:', service);
  }

  deleteService(service: any) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Implement delete logic here
        console.log('Deleting service:', service);
      }
    });
  }

  openAddIncidentDialog(): void {
    const dialogRef = this.dialog.open(EditIncidentComponent, {
      width: '400px',
      data: { isEditMode: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
