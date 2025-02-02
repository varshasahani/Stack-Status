import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-incident',
  templateUrl: './edit-incident.component.html',
  styleUrls: ['./edit-incident.component.sass']
})
export class EditIncidentComponent implements OnInit {
  incidentForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditIncidentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = data.isEditMode;
    this.incidentForm = this.fb.group({
      name: ['', Validators.required],
      resolved: ['', Validators.required],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.isEditMode) {
      // Fetch the incident details and populate the form
      // For example:
      // this.incidentService.getIncidentById(this.data.incidentId).subscribe(incident => {
      //   this.incidentForm.patchValue(incident);
      // });
    }
  }

  onSubmit(): void {
    if (this.incidentForm.valid) {
      if (this.isEditMode) {
        // Update the incident
        // this.incidentService.updateIncident(this.incidentForm.value).subscribe(() => {
        //   this.dialogRef.close();
        // });
      } else {
        // Add a new incident
        // this.incidentService.addIncident(this.incidentForm.value).subscribe(() => {
        //   this.dialogRef.close();
        // });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}