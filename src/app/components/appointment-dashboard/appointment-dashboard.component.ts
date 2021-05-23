import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {EventService} from '../../services/event.service';
import {UserService} from '../../services/user.service';
import {Event} from '../../models/workday/event';

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
    'id',
    'Дата начала',
    'Подтверждено',
    'Ссылка на чат',
    'Подтвердить'
  ];
  expandedElement: Event | null;
  dataSource: Event[];

  constructor(private eventService: EventService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.activeUser
      .subscribe(user => this.eventService.getEventsOfPsycho(user.id)
      .subscribe((events: Event[]) => {
        this.dataSource = events;
      }));

  }

}
