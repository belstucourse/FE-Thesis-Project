import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Feedback} from '../../models/feedback';
import {AuthService} from '../../services/auth.service';
import {PostService} from '../../services/post.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-app-feedback-page',
  templateUrl: './app-feedback-page.component.html',
  styleUrls: ['./app-feedback-page.component.scss']
})
export class AppFeedbackPageComponent implements OnInit {
  public feedbackForm: FormGroup;

  constructor(private authService: AuthService,
              private postService: PostService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.feedbackForm = new FormGroup({
      feedback: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    let feedback: Feedback = {
      text: this.feedbackForm.controls['feedback'].value,
      clientId: this.authService.getUserIdByToken()
    };
    this.postService.saveApplicationFeedback(feedback).subscribe((feedback) => {
      this.router.navigate(['/catalog']);
    });
  }
}
