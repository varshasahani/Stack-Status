import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.sass']
})
export class EditServiceComponent implements OnInit {
  serviceForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = data.isEditMode;
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.isEditMode) {
      // Fetch the service details and populate the form
      // For example:
      // this.serviceService.getServiceById(this.data.serviceId).subscribe(service => {
      //   this.serviceForm.patchValue(service);
      // });
    }
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
      if (this.isEditMode) {
        // Update the service
        // this.serviceService.updateService(this.serviceForm.value).subscribe(() => {
        //   this.dialogRef.close();
        // });
      } else {
        // Add a new service
        // this.serviceService.addService(this.serviceForm.value).subscribe(() => {
        //   this.dialogRef.close();
        // });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}