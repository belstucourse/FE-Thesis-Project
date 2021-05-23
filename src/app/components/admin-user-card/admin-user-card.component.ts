import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-admin-user-card',
  templateUrl: './admin-user-card.component.html',
  styleUrls: ['./admin-user-card.component.css']
})
export class AdminUserCardComponent implements OnInit {
  @Input()
  public user: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  updateUser(){
    this.user.deactivated = !this.user.deactivated;
    this.userService.updateUser(this.user).subscribe(user => this.user = user);
  }
}
