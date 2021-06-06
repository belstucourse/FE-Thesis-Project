import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user/user';
import {Event as EventModel} from '../../models/workday/event';
import {DatePipe} from '@angular/common';
import {EventService} from '../../services/event.service';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {AppointmentNotesService} from '../../services/appointment-notes.service';
import {DetailedEvents} from '../../models/workday/detailed-events';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-appointment-previous-dashboard',
  templateUrl: './appointment-previous-dashboard.component.html',
  styleUrls: ['./appointment-previous-dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),

  ]
})
export class AppointmentPreviousDashboardComponent implements OnInit {

  columnsToDisplay: string[] = [
    // 'id',
    'date',
    //'isConfirmed',
    'psychoName',
    'clientName'
  ];
  @Input()
  user: User;
  expandedElement: EventModel | null;
  dataSource;

  public datepipe: DatePipe = new DatePipe('ru');

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
            this.dataSource = new MatTableDataSource( events.filter(event => event.isEnded === true));
          });
        } else {
          this.eventService.getClientDetailedEvents(user.id).subscribe((events: DetailedEvents[]) => {
            this.dataSource = new MatTableDataSource(events.filter(event => event.isEnded === true));
          });
        }
      });
  }

  reject(element: EventModel) {
    element.isConfirmed = false;
    this.eventService.saveOrder(element).subscribe((event: EventModel) => {
      for (let item of this.dataSource) {
        item.isConfirmed = item.id === event.id ? event.isConfirmed : item.isConfirmed;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
