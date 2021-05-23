import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user/user";
import {Psychologist} from "../../models/user/psychologist";
import {Event} from "../../models/workday/event";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-admin-psycho-dashboard',
  templateUrl: './admin-psycho-dashboard.component.html',
  styleUrls: ['./admin-psycho-dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class AdminPsychoDashboardComponent implements OnInit {
  public psychologists: Psychologist[];
  public p: Psychologist;

  columnsToDisplay: string[] = [
    'id',
    'firstName',
    'middleName',
    'lastName',
    'verified'
  ];

  expandedElement: Psychologist | null;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {


    this.userService.getAllPsychos().subscribe(psychos => this.psychologists = psychos);
  }

  changeVerifiedState(psychoId: string) {
    this.p = this.psychologists.find(i => i.id === psychoId);
    this.p.verified = !this.p.verified;
    this.userService.updatePsycho(this.p).subscribe();
  }
}
