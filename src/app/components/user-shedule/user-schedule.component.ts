import {Component, OnInit} from '@angular/core';
import {EventService} from '../../services/event.service';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user/user';
import {Event} from '../../models/workday/event';

@Component({
  selector: 'app-user-shedule',
  templateUrl: './user-schedule.component.html',
  styleUrls: ['./user-schedule.component.css']
})
export class UserScheduleComponent implements OnInit {
  displayedColumns: string[] = ['Время', 'Имя', 'Окончено', 'Подтверждено', 'Ссылка на комнату'];
  public isClient: boolean;
  public isPsycho: boolean;
  public dataSource: Event[];

  constructor(private eventService: EventService,
              private userService: UserService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    let currentUserId = this.authService.getUserIdByToken();
    this.userService.getUserById(currentUserId).subscribe((user: User) => {
      this.isClient = this.userService.isClient(user);
      this.isPsycho = this.userService.isPsychologist(user);
      if (this.isClient) {
        this.eventService.getClientEvents(currentUserId).subscribe((events) => {
          this.dataSource = events;
        });
      } else {
        this.eventService.getEventsOfPsycho(currentUserId).subscribe((events) => {
          this.dataSource = events;
        });
      }
    });
  }

  public getUsername(event: Event) {
    let name: string = 'Загрузка';
    if (this.isClient) {
      this.userService.getUserById(event.psychologistId).subscribe((user: User) => {
        name = user.firstName;
      });
    }
    else{
      this.userService.getUserById(event.clientId).subscribe((user: User) => {
        name = user.firstName;
      });
    }

    return name;
  }

}
