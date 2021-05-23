import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user/user";
import {Psychologist} from "../../models/user/psychologist";

@Component({
  selector: 'app-admin-psycho-dashboard',
  templateUrl: './admin-psycho-dashboard.component.html',
  styleUrls: ['./admin-psycho-dashboard.component.css']
})
export class AdminPsychoDashboardComponent implements OnInit {
  public psychologists: Psychologist[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllPsychos().subscribe(psychos => this.psychologists = psychos);
  }

}
