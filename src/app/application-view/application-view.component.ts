import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { MatDialog } from '@angular/material/dialog';
import { AddApplicationComponent } from './add-application/add-application.component';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-application-view',
  templateUrl: './application-view.component.html',
  styleUrls: ['./application-view.component.sass']
})
export class ApplicationViewComponent implements OnInit {
  applications: any[] = [];

  constructor(private applicationService: ApplicationService,public dialog: MatDialog,private sharedService: SharedService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  
  loadApplications(): void {
    this.applicationService.getApplications().subscribe(data => {
      this.applications = data;
    });
  }

  openAddApplicationDialog(): void {
    const dialogRef = this.dialog.open(AddApplicationComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.applicationService.getApplications().subscribe(data => {
          this.applications = data;
        });
      }
    });
  }

  deleteApplication(id: number): void {
    this.applicationService.deleteApplication(id).subscribe(() => {
      this.loadApplications();
    });
  }

  selectApplication(application): void {
    console.log('nameee',name)
    this.sharedService.setSelectedApplication(application);
  }
}