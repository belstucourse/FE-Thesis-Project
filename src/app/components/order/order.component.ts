import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Event} from '../../models/workday/event';
import {EventService} from '../../services/event.service';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  constructor(private activateRoute: ActivatedRoute,
              private eventService: EventService,
              private snackBar: MatSnackBar,
              private router: Router) {
    activateRoute.queryParams.subscribe((queryParams: any) => {
      this.clientId = queryParams['clientId'];
      this.psychologistId = queryParams['psychologistId'];
      this.date = queryParams['date'];
    });
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
    this.eventService.saveOrder(event).subscribe((event) => {
        this.snackBar.open('You have been registered on appointment. If doctor approve your order, we send a notification email with link to the video room', 'Done');
        this.router.navigate(['/catalog']);
      }
    );
  }
}
