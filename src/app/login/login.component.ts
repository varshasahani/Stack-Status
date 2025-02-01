import { HttpClient } from '@angular/common/http';
import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../userService';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  selectedIndex = 0;
  public loginForm !: FormGroup
  public signupForm !: FormGroup;
  public Users;
  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public auth: AuthService
  ) { }

  ngOnInit(): void {

    this.userService.getUsers().subscribe(data => {
      this.Users = data
      console.log(this.Users)
    })

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    })

    this.signupForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.emailExists.bind(this)]],

      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required]]
    },
      {
        validators: this.mustMatch('password', 'password2'),
        // validators: this.duplicateEmail('email')

      })

  }

  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const pass1 = formGroup.controls[password];
      const pass2 = formGroup.controls[confirmPassword];
      if (pass2.errors && !pass2.errors['mustMatch']) {
        return
      }
      if (pass1.value !== pass2.value) {
        pass2.setErrors({ mustMatch: true })
      }
      else {
        pass2.setErrors(null)
      }
    }
  }

  // duplicateEmail(email: string) {
  //   return (formGroup: FormGroup) => {
  //     const em = formGroup.controls[email];
  //     // const isUserEmailExists = true;
  //     console.log(this.Users)
  //     console.log(em.value)
  //     const isUserEmailExists = this.Users?.some((data) =>
  //       data.email === em.value)
  //     console.log(isUserEmailExists)
  //     if (isUserEmailExists) {
  //       console.log(isUserEmailExists)
  //       em.setErrors({ duplicateEmail: true })
  //     }
  //     else {
  //       em.setErrors(null)
  //     }
  //   }
  // }

  emailExists(control: FormControl): { [s: string]: boolean } {
    if (this.Users?.some((data) =>
      data.email === control.value)) {
      return { 'emailExists': true }
    }

    return null;
  }

  login() {
this.auth.loginWithRedirect(
  
)
    // this.http.get<any>("http://localhost:3000/users")
    //   .subscribe(res => {
    //     const user = res.find((a: any) => {
    //       return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
    //     });
    //     if (user) {
    //       this.userService.setUser(user)
    //       this.dialog.closeAll();
    //       this._snackBar.open("Login Successfull!", 'Close', {
    //         horizontalPosition: "center",
    //         verticalPosition: "top"
    //       });
    //       // this.router.navigate(['movies']);
    //     }
    //     else {
    //       this._snackBar.open("Password and Email does not match!!", 'close', {
    //         horizontalPosition: "center",
    //         verticalPosition: "top"
    //       })
    //     }

    //   }, err => {
    //     alert("something went wrong!!")
    //   })
  }

  changeIndex() {
    this.selectedIndex = 1;
  }
  signUp() {
    this.http.post<any>("http://localhost:3000/users", this.signupForm.value)
      .subscribe(res => {
        this.dialog.closeAll();
        this._snackBar.open("SignUp Successfully!", 'Close', {
          horizontalPosition: "center",
          verticalPosition: "top"
        });
        this.dialog.open(LoginComponent)
      }, err => {
        alert("something went wrong")
      }
      )
  }


}