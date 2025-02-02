import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.sass']
})
export class EditServiceComponent implements OnInit {
  serviceForm: FormGroup;
  isEditMode: boolean = false;
  serviceId: number;
  applicationId: number;
  applicationName: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditServiceComponent>,
    private applicationService: ApplicationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.applicationId = data.applicationId;
    this.isEditMode = data.isEditMode;
    this.serviceId = data.serviceId;
  }

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required]
    });

    if (this.isEditMode) {
      // Load the service details and populate the form
      this.loadServiceDetails();
    }
  }

  loadServiceDetails(): void {
    // Fetch the service details from the backend and populate the form
    this.applicationService.getServiceById(this.serviceId).subscribe(service => {
      this.serviceForm.patchValue(service);
    });
  }


  onSubmit(): void {
    if (this.serviceForm.valid) {
      const serviceData = {
        ...this.serviceForm.value,
        applicationId: this.applicationId
      };
    console.log('app0',this.applicationId)

      if (this.isEditMode) {
        // Update the service
        this.applicationService.editService({ id: this.serviceId, ...serviceData }).subscribe(() => {
          console.log('Service updated');
          this.dialogRef.close();
        });
      } else {
        // Add a new service
        this.applicationService.addService(serviceData).subscribe(response => {
          console.log('Service added:', response);
          this.dialogRef.close();
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}