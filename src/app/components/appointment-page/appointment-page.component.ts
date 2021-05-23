import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Psychologist} from '../../models/user/psychologist';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user/user';
import {WorkdayService} from '../../services/workday.service';
import {PsychoAvailableTimeslot} from '../../models/workday/psycho-available-timeslot';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-appointment-page',
  templateUrl: './appointment-page.component.html',
  styleUrls: ['./appointment-page.component.less']
})
export class AppointmentPageComponent implements OnInit {
  public psychologist: Psychologist;
  public timeslots: PsychoAvailableTimeslot[];
  public datepipe: DatePipe = new DatePipe('en-US');
  public selectedDate: string;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private authService: AuthService,
              private workdayService: WorkdayService,
              private router: Router) {
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

  }

  chooseTimeslotEvent($event) {
    let elementId: string = $event.target.id;
    this.selectedDate = elementId;
  }

  bookAppointment() {
    this.userService.getUserById(this.authService.getUserIdByToken()).subscribe((user: User) => {
      this.router.navigate(['/order'], {
        queryParams: {
          'clientId': user.id,
          'psychologistId': this.psychologist.id,
          'date': this.selectedDate
        }
      });
    });
    // this.workdayService.bookAppointment(this.selectedDate, this.activeUser.id, );
  }
}
