// filepath: src/app/add-application/add-application.component.ts
// filepath: src/app/add-application-dialog/add-application-dialog.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.sass']
})
export class AddApplicationComponent {
  applicationForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private applicationService: ApplicationService,
    public dialogRef: MatDialogRef<AddApplicationComponent>
  ) {}

  ngOnInit(): void {
    this.applicationForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      logoUrl: ['']
    });
  }

  addApplication(): void {
    if (this.applicationForm.valid) {
      const newApplication = this.applicationForm.value;
      this.applicationService.addApplication(newApplication).subscribe(response => {
        console.log('Application added:', response);
        this.dialogRef.close();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}