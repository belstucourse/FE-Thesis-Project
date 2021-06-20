import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {EventService} from '../../services/event.service';
import {UserService} from '../../services/user.service';
import {Event} from '../../models/workday/event';
import {AuthService} from '../../services/auth.service';
import {User} from 'src/app/models/user/user';
import {DatePipe} from '@angular/common';
import {AppointmentNotesService} from '../../services/appointment-notes.service';
import {DetailedEvents} from '../../models/workday/detailed-events';

@Component({
  selector: 'app-appointment-dashboard',
  templateUrl: './appointment-dashboard.component.html',
  styleUrls: ['./appointment-dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),

  ]
})
export class AppointmentDashboardComponent implements OnInit {
  public currentDate: Date = new Date();
  columnsToDisplay: string[] = [
    // 'id',
    'date',
    //'isConfirmed',
    'psychoName',
    'clientName'
  ];
  @Input()
  user: User;
  expandedElement: Event | null;
  @Input()
  dataSource: Event[];
  public datepipe: DatePipe = new DatePipe('ru');

  constructor(private eventService: EventService,
              protected userService: UserService,
              private authService: AuthService,
              private appointmentNotesService: AppointmentNotesService) {
    let date = new Date();
    date.setMinutes(date.getMinutes() + 10);
    this.currentDate = date;
  }

  ngOnInit(): void {
    this.userService.getUserById(this.user.id)
      .subscribe(user => {
        if (this.userService.isPsychologist(this.user)) {
          this.eventService.getDetailedEventsOfPsycho(user.id).subscribe((events: DetailedEvents[]) => {
            this.dataSource = events.filter(event => event.isEnded === false);
          });
        } else {
          this.eventService.getClientDetailedEvents(user.id).subscribe((events: DetailedEvents[]) => {
            this.dataSource = events.filter(event => event.isEnded === false);
          });
        }
      });
  }

  reject(element: Event) {
    element.isConfirmed = false;
    this.eventService.saveOrder(element).subscribe((event: Event) => {
      for (let item of this.dataSource) {
        item.isConfirmed = item.id === event.id ? event.isConfirmed : item.isConfirmed;
      }
    });
  }

  isDateGreaterOrEqual(appointmentDate: Date) {
    appointmentDate = new Date(appointmentDate);
    let currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() - 10);
    return appointmentDate >= currentTime;
  }
}
