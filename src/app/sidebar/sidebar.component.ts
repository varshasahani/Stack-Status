import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../userService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent {
  opened = true;

  constructor(private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    public userService: UserService,
    private _snackBar: MatSnackBar,
  public auth:AuthService) { }

  openLogin() {
    this.dialog.open(LoginComponent)
  }

  openLogout(): void {
    this.dialog.open(LogoutPopup, {
      width: '250px'
    })
  }
}

@Component({
  templateUrl: 'logout-popup.html',
})
export class LogoutPopup {
  constructor(public dialogRef: MatDialogRef<LogoutPopup>,
    public userService: UserService,
    private _snackBar: MatSnackBar) { }

  logout() {
    this.userService.setUser(null)
    this._snackBar.open("Logout Successfully!", 'Close', {
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }
}