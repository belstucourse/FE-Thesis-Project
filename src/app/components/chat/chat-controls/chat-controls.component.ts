import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-chat-controls',
  templateUrl: './chat-controls.component.html',
  styleUrls: ['./chat-controls.component.css']
})
export class ChatControlsComponent implements OnInit {

  @Input() chatId: string;
  chatForm: FormGroup;

  constructor() {
    this.chatForm = new FormGroup({
      message: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
  }

  public sendMessage() {

  }
}
