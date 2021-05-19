import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Event} from '../../models/workday/event';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public orderForm: FormGroup;
  private clientId: string;
  private psychologistId: string;
  private date: Date;

  constructor(private activateRoute: ActivatedRoute) {
    this.clientId = activateRoute.snapshot.params['clientId'];
    this.psychologistId = activateRoute.snapshot.params['psychologistId'];
    this.date = activateRoute.snapshot.params['date'];
  }

  ngOnInit(): void {
    this.orderForm = new FormGroup({
      note: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    let event: Event =
      {
        psychologistId: this.psychologistId,
        clientId: this.clientId,
        date: this.date,
        reasonForVisit: this.orderForm.controls['note'].value
      };
  }
}
