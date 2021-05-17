import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Client} from '../../models/user/client';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MaxSizeValidator} from '@angular-material-components/file-input';

@Component({
  selector: 'app-registration-client-page',
  templateUrl: './registration-client-page.component.html',
  styleUrls: ['./registration-client-page.component.css']
})
export class RegistrationClientPageComponent implements OnInit {
  authForm: FormGroup;
  fileControl: FormControl;

  public files;
  maxSize = 16;

  constructor(private userService: UserService,
              private router: Router,
              private snackBar: MatSnackBar) {
    this.fileControl = new FormControl(this.files, [
      Validators.required,
      MaxSizeValidator(this.maxSize * 1024)
    ]);
  }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      middleName: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      date: new FormControl('', [Validators.required])
    });
    this.fileControl.valueChanges.subscribe((files: any) => {
      if (!Array.isArray(files)) {
        this.files = [files];
      } else {
        this.files = files;
      }
    });
  }

  onSubmit() {
    let client: Client = {
      firstName: this.authForm.controls['firstName'].value,
      middleName: this.authForm.controls['middleName'].value,
      lastName: this.authForm.controls['lastName'].value,
      password: this.authForm.controls['email'].value,
      birthdayDate: this.authForm.controls['date'].value
    };
    this.userService.saveUser(client).subscribe(() => this.router.navigate(['/signin']),
      error => this.snackBar.open(error, 'Done'));
  }
}
