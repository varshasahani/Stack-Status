import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'stackStatus';
  options = this._formBuilder.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });
  constructor(private _formBuilder: FormBuilder) {}

}
