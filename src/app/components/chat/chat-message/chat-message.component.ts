import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../models/chat/message';
import {User} from '../../../models/user/user';
import * as moment from 'moment';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

  @Input() msg: Message;
  @Input() predecessor: Message;
  @Input() user: User;
  @Input() allowsReply = false;


  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUserById(this.msg.senderId).subscribe((user: User) => this.user = user);
  }

  extractUserImageAvatar(): string {
    return this.user.avatarUrl;
  }

  isPreviousMessageFromOtherDay() {
    if (!this.predecessor) {
      return true;
    }
    const prevDate = this.predecessor.creationDate.getDay();
    const date = this.msg.creationDate.getDay();
    return prevDate !== date;
  }

  getDateDivider(msg: Message) {
    if (!msg.creationDate) {
      return null;
    }
    return msg.creationDate;
  }

  isPredecessorSameAuthor(): boolean {
    if (!this.predecessor) {
      return false;
    }
    return this.predecessor.id === this.msg.id;
  }

  isTemporalClose(): boolean {
    if (!this.predecessor) {
      return true;
    }

    const duration = moment.duration(
      this.msg.creationDate.getTime() - this.predecessor.creationDate.getTime());
    return duration.asMinutes() <= 1;
  }

  getUserName() {
    return this.user.firstName;
  }

  getCreatedDate() {
    if (!this.msg.creationDate) {
      return null;
    }
    return this.msg.creationDate;
  }
}
