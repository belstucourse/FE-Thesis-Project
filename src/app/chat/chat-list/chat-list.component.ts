import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user/user';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  public currentUser: User;

  constructor(private userService: UserService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userService.getUserById(this.authService.getUserIdByToken()).subscribe((user: User) => {
      this.currentUser = user;
    });
  }

}
