import {Component} from '@angular/core';
import {User} from './models/user/user';
import {AuthService} from "./services/auth.service";
import {UserService} from "./services/user.service";
import {Client} from "@stomp/stompjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shrink';
  isAuthenticated = false;
  userId: string;
  user: User;
  isClient: boolean;
  isPsyhco: boolean;
  isAdmin: boolean;

  async logout(): Promise<void> {
    this.isAuthenticated = false;
    localStorage.clear();
  }

  constructor(private authService: AuthService, private userService: UserService) {
    if(authService.getToken() != null)
    {
      this.isAuthenticated = true;
    }
    else
    {
      this.isAuthenticated = false;

    }
    this.authService.currentUser.subscribe((user: User) => {
      if (user != null) {
        this.userId = this.authService.getUserIdByToken();

        this.userService.getUserById(this.userId).subscribe(user => {
          this.user = user;
          this.isClient = this.userService.isClient(this.user)
          this.isPsyhco = this.userService.isPsychologist(this.user)
          this.isAdmin = !this.isClient && !this.isAdmin;
          this.isAuthenticated = true;
        })
      }
    })
  }

  getCurrentUserId(): string {
    this.userId = this.authService.getUserIdByToken();
    if (this.userId == null) {
      return ""
    } else {
      return this.userId
    }
  }
}
