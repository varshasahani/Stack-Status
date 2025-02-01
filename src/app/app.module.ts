import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StatusComponent } from './status/status.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { firebaseConfig } from 'firebase.config';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    StatusComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain:'dev-y279n5uy.auth0.com',
      clientId:'2s7NtJU84KxL8T4x0hZJoFGgWgs0nV4j',
      authorizationParams:{
        redirect_uri:window.location.origin
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
