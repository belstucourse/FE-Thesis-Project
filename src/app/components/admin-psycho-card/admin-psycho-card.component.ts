import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/user/user";
import {Psychologist} from "../../models/user/psychologist";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-admin-psycho-card',
  templateUrl: './admin-psycho-card.component.html',
  styleUrls: ['./admin-psycho-card.component.css']
})
export class AdminPsychoCardComponent implements OnInit {
  @Input()
  public psychologist: Psychologist;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}
