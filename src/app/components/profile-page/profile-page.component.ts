import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FileUploaderService} from '../../services/file-uploader.service';
import {FileType} from '../../models/file-type.enum';
import {AuthService} from '../../services/auth.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Event} from '../../models/workday/event';
import {EventService} from '../../services/event.service';
import {Psychologist} from '../../models/user/psychologist';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),

  ]
})
export class ProfilePageComponent implements OnInit {
  public user: User;
  editForm: FormGroup;
  public isActiveUserProfile: boolean;
  public isPsycho: boolean;
  public isClient: boolean;
  public psychologist: Psychologist;
  public datepipe: DatePipe = new DatePipe('en-US');

  columnsToDisplay: string[] = [
    'id',
    'date',
    'isConfirmed',
    'roomId'
  ];
  expandedElement: Event | null;
  dataSource: Event[];

  fileToUpload: File = null;

  constructor(private activatedRoute: ActivatedRoute,
              public userService: UserService,
              private fileUploaderService: FileUploaderService,
              private authService: AuthService,
              private eventService: EventService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userService.getUserById(params.get('userId')).subscribe(user => {
        this.user = user;
        if (this.userService.isPsychologist(user)) {
          this.psychologist =  user as Psychologist;
        }
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

    this.userService.getUserById(this.authService.getUserIdByToken())
      .subscribe(user => this.eventService.getClientEvents(user.id)
        .subscribe((events: Event[]) => {
          this.dataSource = events;
        }));
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
