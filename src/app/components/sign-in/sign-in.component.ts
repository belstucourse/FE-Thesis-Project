import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public authForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }
  public authUser()
  {
  }

  onSubmit() {

  }
}
