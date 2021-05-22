import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {UserLogin} from '../../models/user/user-login';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public authForm: FormGroup;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    let user: UserLogin = {
      email: this.authForm.controls['email'].value,
      password: this.authForm.controls['password'].value,
    };
    this.authService.login(user);
  }
}
