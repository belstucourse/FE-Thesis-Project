import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventService} from '../../services/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Event} from '../../models/workday/event';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user/user';
import {PsychoEventNotes} from '../../models/workday/psycho-event-notes';
import {Prescription} from '../../models/workday/prescription';
import {AppointmentNotesService} from '../../services/appointment-notes.service';

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.css']
})
export class FeedbackPageComponent implements OnInit {
  feedbackForm: FormGroup;
  public user: User;
  public isClient: boolean;
  public isPsycho: boolean;
  checked: boolean = false;

  constructor(private eventService: EventService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private userService: UserService,
              private appointmentNotesService: AppointmentNotesService,) {
  }

  ngOnInit(): void {
    this.userService.getUserById(this.authService.getUserIdByToken())
      .subscribe(currentUser => {
        this.user = currentUser;
        this.isClient = this.userService.isClient(currentUser);
        this.isPsycho = this.userService.isPsychologist(currentUser);
        if (this.isClient) {
          this.feedbackForm = new FormGroup({
            feedback: new FormControl('', [Validators.required]),
          });
        } else {
          this.feedbackForm = new FormGroup({
            symptoms: new FormControl('', [Validators.required]),
            recommendations: new FormControl('', [Validators.required]),
            specialNotes: new FormControl('', [Validators.required]),
          });
        }
      });

  }

  onSubmit() {

    this.activatedRoute.queryParams.subscribe((params) => {
      let roomId = params['roomId'];
      this.eventService.getByRoomId(roomId).subscribe((event: Event) => {
        if (this.isClient) {
          event.feedback = this.feedbackForm.controls['feedback'].value;
          this.eventService.update(event).subscribe((event) => this.router.navigate(['/catalog']));
        } else {
          this.savePsychoNotes(event);
        }
      });
    });
  }

  private savePsychoNotes(event: Event) {
    let psychoEventNotes: PsychoEventNotes = {
      specialNotes: this.feedbackForm.controls['specialNotes'].value,
      symptoms: this.feedbackForm.controls['symptoms'].value,
      eventId: event.id
    };
    let prescription: Prescription = {
      eventId: event.id,
      recommendations: this.feedbackForm.controls['recommendations'].value
    };
    this.appointmentNotesService.savePrescription(prescription).subscribe((prescription) => {
      this.appointmentNotesService.savePsychoNotes(psychoEventNotes).subscribe(psychoEventNotes => {
        this.router.navigate(['/profile/' + this.user.id]);
      });
    });
  }
}
