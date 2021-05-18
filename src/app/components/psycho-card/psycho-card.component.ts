import {Component, Input, OnInit} from '@angular/core';
import {Psychologist} from '../../models/user/psychologist';

@Component({
  selector: 'app-psycho-card',
  templateUrl: './psycho-card.component.html',
  styleUrls: ['./psycho-card.component.css']
})
export class PsychoCardComponent implements OnInit {
  @Input()
  public psychologist: Psychologist;

  constructor() {
  }

  ngOnInit(): void {
  }

}
