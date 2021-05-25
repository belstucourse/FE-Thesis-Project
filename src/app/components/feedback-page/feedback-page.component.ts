import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventService} from '../../services/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Event} from '../../models/workday/event';

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.css']
})
export class FeedbackPageComponent implements OnInit {
  feedbackForm: FormGroup;

  constructor(private eventService: EventService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.feedbackForm = new FormGroup({
      feedback: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {

    this.activatedRoute.queryParams.subscribe((params) => {
      let roomId = params['roomId'];
      this.eventService.getByRoomId(roomId).subscribe((event: Event) => {
        event.feedback = this.feedbackForm.controls['feedback'].value;
        this.eventService.update(event).subscribe((event) => this.router.navigate(['/catalog']));
      });
    });
  }
}
