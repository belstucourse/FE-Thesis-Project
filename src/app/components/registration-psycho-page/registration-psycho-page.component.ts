import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-registration-psycho-page',
  templateUrl: './registration-psycho-page.component.html',
  styleUrls: ['./registration-psycho-page.component.css']
})
export class RegistrationPsychoPageComponent implements OnInit {
  public files;
  authForm: FormGroup;
  acceptedFormats: String[];

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
