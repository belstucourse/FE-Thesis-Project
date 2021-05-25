import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Psychologist} from '../../models/user/psychologist';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user/user';
import {WorkdayService} from '../../services/workday.service';
import {PsychoAvailableTimeslot} from '../../models/workday/psycho-available-timeslot';
import {DatePipe} from '@angular/common';
import {forEach} from "@angular-devkit/schematics";
import {R3FactoryTarget, Target} from "@angular/compiler";
import {newArray} from "@angular/compiler/src/util";
import {type} from "os";

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
  public timeIds : string[] = [];

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
    if(!this.timeIds.includes($event.target.id))
    {
       this.timeIds.push($event.target.id)
    }
    this.timeIds.forEach(function (value) {
       document.getElementById(value).setAttribute("style", "background-color: none");
    });
    $event.target.setAttribute("style", "background-color: #6cb06b;border-radius:15px");
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
