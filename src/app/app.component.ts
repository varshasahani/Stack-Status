import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditServiceComponent } from './service-list/edit-service/edit-service.component';
import { EditIncidentComponent } from './incident-view/edit-incident/edit-incident.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(public auth: AuthService, private router: Router, public dialog: MatDialog) {}


}