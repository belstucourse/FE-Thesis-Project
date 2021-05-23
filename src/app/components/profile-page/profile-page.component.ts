import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FileUploaderService} from '../../services/file-uploader.service';
import {FileType} from '../../models/file-type.enum';


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
  public isAdmin: boolean;
  fileToUpload: File = null;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private fileUploaderService: FileUploaderService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userService.getUserById(params.get('userId')).subscribe(user => {
        this.user = user;
        this.userService.activeUser.subscribe(currentUser => {
          this.isActiveUserProfile = currentUser.id === user.id;
        });
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
      this.userService.activeUser.next(user);
      this.user = user;
      this.fileUploaderService.saveFile(this.fileToUpload, user.id, FileType.AVATAR);
    });
  }

  onFileChange(files: FileList) {
    this.fileToUpload = files.item(0);
  }
}
