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
  columnsToDisplay: string[] = [
    // 'id',
    'date',
    //'isConfirmed',
    'psychologistName',
    'clientName'
  ];
  @Input()
  user: User;
  expandedElement: Event | null;
  dataSource: Event[];
  public datepipe: DatePipe = new DatePipe('en-US');

  constructor(private eventService: EventService,
              protected userService: UserService,
              private authService: AuthService,
              private appointmentNotesService: AppointmentNotesService) {
  }

  ngOnInit(): void {
    this.userService.getUserById(this.user.id)
      .subscribe(user => {
        if (this.userService.isPsychologist(this.user)) {
          this.eventService.getDetailedEventsOfPsycho(user.id).subscribe((events: DetailedEvents[]) => {
            this.dataSource = events;
          });
        } else {
          this.eventService.getClientDetailedEvents(user.id).subscribe((events: DetailedEvents[]) => {
            this.dataSource = events;
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
}
