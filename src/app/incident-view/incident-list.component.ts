import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../services/application.service';
import { SharedService } from '../shared.service';
import { MatDialog } from '@angular/material/dialog';
import { EditIncidentComponent } from './edit-incident/edit-incident.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../services/websocket.service';

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.sass']
})
export class IncidentListComponent implements OnInit {
  incidents: any[] = [];
  serviceId: number;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.serviceId = +params['serviceId'];
      this.fetchIncidents(this.serviceId);
     
    });
  
  }
  fetchIncidents(serviceId): void {
    this.applicationService.getIncidents(serviceId).subscribe(incidents => {
      this.incidents = incidents;
    });
  }

  openAddIncidentDialog(): void {
    const dialogRef = this.dialog.open(EditIncidentComponent, {
      width: '400px',
      data: { isEditMode: false, serviceId: this.serviceId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

    editIncident(incident: any) {
      const dialogRef = this.dialog.open(EditIncidentComponent, {
        width: '400px',
        data: { isEditMode: true, serviceId: this.serviceId,incidentId: incident.id }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

    deleteIncident(incidentId: any) {
      const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
        width: '300px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.applicationService.deleteIncident(incidentId).subscribe(() => {
            // Remove the deleted service from the services array
            this.incidents = this.incidents.filter(incident => incident.id !== incidentId);
          });
        }
      });
    }
}