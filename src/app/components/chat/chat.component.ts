import {Component, OnInit} from '@angular/core';
import {Message} from '../../models/chat/message';
import {Observable} from 'rxjs';
import {Chat} from '../../models/chat/chat';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages: Message[] = [];
  chat: Observable<Chat>;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  trackByCreated(msg: Message) {
    return msg.creationDate;
  }

}
