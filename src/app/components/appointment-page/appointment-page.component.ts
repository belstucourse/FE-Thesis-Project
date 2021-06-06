import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Psychologist} from '../../models/user/psychologist';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user/user';
import {WorkdayService} from '../../services/workday.service';
import {PsychoAvailableTimeslot} from '../../models/workday/psycho-available-timeslot';
import {DatePipe} from '@angular/common';
import {Client} from '../../models/user/client';
import {EventService} from '../../services/event.service';
import {Event} from '../../models/workday/event';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-appointment-page',
  templateUrl: './appointment-page.component.html',
  styleUrls: ['./appointment-page.component.less']
})
export class AppointmentPageComponent implements OnInit {
  public psychologist: Psychologist;
  public timeslots: PsychoAvailableTimeslot[];
  public datepipe: DatePipe = new DatePipe('ru');
  public selectedDate: string;
  public timeIds: string[] = [];
  public client: Client;
  public currentDate: Date;
  public endDate: Date;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private authService: AuthService,
              private workdayService: WorkdayService,
              private router: Router,
              private eventService: EventService,
              private snackBar: MatSnackBar) {
    let now = new Date();
    this.currentDate = new Date();
    now.setDate(this.currentDate.getDate() + 6);
    this.endDate = now;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
        let psychoId = params.get('psychoId');
        this.userService.getUserById(psychoId).subscribe((psychologist: Psychologist) => {
          this.psychologist = psychologist;
          this.workdayService.getTimeslotsOfPsychologistOnWeek(this.psychologist.id).subscribe((timeslots: PsychoAvailableTimeslot[]) => {
            this.timeslots = timeslots;
          });
        });
      }
    );
    this.activatedRoute.queryParams.subscribe((params) => {
      let clientId = params['clientId'];
      if (clientId !== undefined) {
        this.prepareRepeatedAppointment(clientId);
      }

    });

  }

  private prepareRepeatedAppointment(clientId: string) {
    this.userService.getUserById(clientId).subscribe((client: Client) => {
      this.client = client;
    });
  }

  chooseTimeslotEvent($event) {
    if (!this.timeIds.includes($event.target.id)) {
      this.timeIds.push($event.target.id);
    }
    this.timeIds.forEach(function(value) {
      document.getElementById(value).setAttribute('style', 'background-color: none');
    });
    $event.target.setAttribute('style', 'background-color: #6cb06b;border-radius:15px');
    let elementId: string = $event.target.id;
    this.selectedDate = elementId;
  }

  bookAppointment() {
    if (this.client === undefined) {
      this.userService.getUserById(this.authService.getUserIdByToken()).subscribe((user: User) => {
        this.router.navigate(['/order'], {
          queryParams: {
            'clientId': user.id,
            'psychologistId': this.psychologist.id,
            'date': this.selectedDate
          }
        });
      });
    } else {
      let event: Event =
        {
          psychologistId: this.psychologist.id,
          clientId: this.client.id,
          date: new Date(this.selectedDate),
          reasonForVisit: 'Повторная встреча была назначена психологом',
          isRepeated: true
        };
      this.eventService.saveOrder(event).subscribe((event) => {
          this.snackBar.open('Повторная встреча была назначена.', '', {duration: 3000});
          this.router.navigate(['/catalog']);
        }
      );
    }

    // this.workdayService.bookAppointment(this.selectedDate, this.activeUser.id, );
  }
}
