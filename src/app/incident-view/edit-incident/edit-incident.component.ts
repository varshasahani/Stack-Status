import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { WebSocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-edit-incident',
  templateUrl: './edit-incident.component.html',
  styleUrls: ['./edit-incident.component.sass']
})
export class EditIncidentComponent implements OnInit {
  incidentForm: FormGroup;
  isEditMode: boolean;
  serviceId: any;
  isLoading: boolean = false;
  private wsSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditIncidentComponent>,
    private applicationService: ApplicationService,
    private datePipe: DatePipe,
    private webSocketService: WebSocketService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = data.isEditMode;
    this.serviceId = data.serviceId;
    this.incidentForm = this.fb.group({
      name: ['', Validators.required],
      resolved: ['', Validators.required],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
     
    if (this.isEditMode) {
      // Load the service details and populate the form
      this.loadIncidentDetails();
    }

    // Connect to WebSocket server
    this.wsSubscription = this.webSocketService.connect('ws://localhost:8080').subscribe(message => {
      const data = JSON.parse(message.data);
      if (data.type === 'incidentUpdate' && data.incidentId === this.data.incidentId) {
        this.loadIncidentDetails();
      }
    });
  }

  loadIncidentDetails(): void {
    // Fetch the incident details from the backend and populate the form
    this.applicationService.getIncidentById(this.data.incidentId).subscribe(incident => {
      this.incidentForm.patchValue({
        name: incident.name,
        resolved: incident.resolved,
        startDate: new Date(incident.startDate),
        endDate: new Date(incident.endDate)
      });
    });
  }

  onSubmit(): void {
    console.log('this.incidentForm', this.incidentForm.value);
    if (this.incidentForm.valid) {
      this.isLoading = true;
      const startDate = this.datePipe.transform(this.incidentForm.value.startDate, 'yyyy-MM-dd');
      const endDate = this.datePipe.transform(this.incidentForm.value.endDate, 'yyyy-MM-dd');

      // if (!startDate || !endDate) {
      //   console.error('Invalid date value');
      //   return;
      // }

      const incidentData = {
        ...this.incidentForm.value,
        startDate: startDate,
        endDate: endDate,
        serviceId: this.serviceId
      };

      if (!this.isEditMode) {
        this.applicationService.addIncident(incidentData).subscribe(() => {
          this.isLoading = false;
          this.dialogRef.close();
        });
      } else {
        // Update the incident
        const updatedIncidentData = {
          ...incidentData,
          id: this.data.incidentId
        };

        this.applicationService.editIncident(updatedIncidentData).subscribe(() => {
          this.isLoading = false;
          this.dialogRef.close();
        },()=>{this.isLoading = false;});
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
    }
  }
}