import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FileUploaderService} from '../../services/file-uploader.service';
import {FileType} from '../../models/file-type.enum';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  public user: User;
  editForm: FormGroup;
  public isActiveUserProfile: boolean;
  public isPsycho: boolean;
  public isClient: boolean;

  fileToUpload: File = null;

  constructor(private activatedRoute: ActivatedRoute,
              public userService: UserService,
              private fileUploaderService: FileUploaderService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userService.getUserById(params.get('userId')).subscribe(user => {
        this.user = user;
        let currentUserId = this.authService.getUserIdByToken();
        this.isActiveUserProfile = currentUserId === user.id;
        this.isPsycho = this.userService.isPsychologist(user);
        this.isClient = this.userService.isClient(user);
        this.isClient = this.userService.isClient(user);
      });
    });
    this.editForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      middleName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    let user: User = {
      id: this.user.id,
      email: this.editForm.controls['email'].value,
      firstName: this.editForm.controls['firstName'].value,
      middleName: this.editForm.controls['middleName'].value,
      lastName: this.editForm.controls['lastName'].value,
      password: this.editForm.controls['password'].value,
      type: this.user.type
    };
    this.userService.updateUser(user).subscribe(user => {
      this.user = user;
      if (this.fileToUpload !== null) {
        this.fileUploaderService.saveFile(this.fileToUpload, user.id, FileType.AVATAR);
      }
    });
  }

  onFileChange(files: FileList) {
    this.fileToUpload = files.item(0);
  }
}
