import {Component, Input, OnInit} from '@angular/core';
import {Psychologist} from '../../models/user/psychologist';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user/user';

@Component({
  selector: 'app-psycho-card',
  templateUrl: './psycho-card.component.html',
  styleUrls: ['./psycho-card.component.css']
})
export class PsychoCardComponent implements OnInit {
  @Input()
  public psychologist: Psychologist;
  public isCurrent: boolean;

  constructor(private userService: UserService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userService.getUserById(this.authService.getUserIdByToken()).subscribe((user: User) => {
      this.isCurrent = user.id === this.psychologist.id;
    });
  }

}
