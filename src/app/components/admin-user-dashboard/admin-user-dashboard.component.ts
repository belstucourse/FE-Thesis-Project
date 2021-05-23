import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';
import {UserService} from "../../services/user.service";
import {PsychoAvailableTimeslot} from "../../models/workday/psycho-available-timeslot";

@Component({
  selector: 'app-admin-user-dashboard',
  templateUrl: './admin-user-dashboard.component.html',
  styleUrls: ['./admin-user-dashboard.component.css']
})
export class AdminUserDashboardComponent implements OnInit {
  public users: User[] ;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }
}
