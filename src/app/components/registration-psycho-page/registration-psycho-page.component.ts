import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FileUploaderService} from '../../services/file-uploader.service';
import {MaxSizeValidator} from '@angular-material-components/file-input';
import {Psychologist} from '../../models/user/psychologist';
import {User} from '../../models/user/user';
import {FileType} from '../../models/file-type.enum';
import {Tag} from '../../models/user/tag';

@Component({
  selector: 'app-registration-psycho-page',
  templateUrl: './registration-psycho-page.component.html',
  styleUrls: ['./registration-psycho-page.component.css']
})
export class RegistrationPsychoPageComponent implements OnInit {
  public avatarFile;
  public certificateFile;

  authForm: FormGroup;
  acceptedFormats: String[];
  maxSize = 16;
  certificateControl: FormControl;
  avatarControl: FormControl;
  psychologistTags: Tag[] = [
    {
      name: 'Психолог (общая психология)',
      selected: false
    },
    {
      name: 'Бизнес-Психолог (корпоративный психолог)',
      selected: false
    },
    {
      name: 'Транспортный Психолог',
      selected: false
    },
    {
      name: 'Спортивный Психолог',
      selected: false
    },
    {
      name: 'Социальный Психолог',
      selected: false
    },
    {
      name: 'Психоаналитик',
      selected: false
    },
    {
      name: 'Педагогический Психолог',
      selected: false
    },
    {
      name: 'Коммуникационный Психолог',
      selected: false
    },
    {
      name: 'Клинический Психолог',
      selected: false
    },
    {
      name: 'Детский и Юнешеский Психотерапевт',
      selected: false
    },
    {
      name: 'Психолог Здравоохранения и Реабилитации',
      selected: false
    },
    {
      name: 'Врач, психосоматическая медицина и психотерапия',
      selected: false
    },
    {
      name: 'Врач, психиатрия и психотерапия',
      selected: false
    }
  ];

  constructor(private userService: UserService,
              private router: Router,
              private snackBar: MatSnackBar,
              private fileUploaderService: FileUploaderService) {
    this.certificateControl = new FormControl(this.certificateFile, [
      Validators.required,
      MaxSizeValidator(this.maxSize * 1024)
    ]);
    this.avatarControl = new FormControl(this.avatarFile, [
      Validators.required,
      MaxSizeValidator(this.maxSize * 1024)
    ]);
  }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      tel: new FormControl('', [Validators.required, Validators.pattern('/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\\s\\./0-9]*$/g')]),
      middleName: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      date: new FormControl('', [Validators.required])
    });
    this.certificateControl.valueChanges.subscribe((files: any) => {
      this.certificateFile = files;
    });
    this.avatarControl.valueChanges.subscribe((files: any) => {
      this.avatarFile = files;
    });
  }

  onSubmit() {
    let selectedTags: Tag[] = this.psychologistTags.filter(value => value.selected === true);
    let psychologist: Psychologist = {
      email: this.authForm.controls['email'].value,
      firstName: this.authForm.controls['firstName'].value,
      middleName: this.authForm.controls['middleName'].value,
      lastName: this.authForm.controls['lastName'].value,
      password: this.authForm.controls['password'].value,
      mobile: this.authForm.controls['tel'].value,
      type: 'psychologist',
      tags: selectedTags
    };
    this.userService.saveUser(psychologist).subscribe((psychologist: User) => {
      this.fileUploaderService.saveFile(this.avatarFile, psychologist.id, FileType.AVATAR).subscribe();
      this.fileUploaderService.saveFile(this.certificateFile, psychologist.id, FileType.CERTIFICATE).subscribe();
      this.router.navigate(['/']);
    });
  }

  public changeSelected(psychologist: Tag) {
    psychologist.selected = !psychologist.selected;
  }
}
