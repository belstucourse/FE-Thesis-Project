import {Component, OnInit} from '@angular/core';
import {Message} from '../../models/chat/message';
import {ChatService} from '../../services/chat.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user/user';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.css']
})
export class ChatDetailComponent implements OnInit {

  messages: Message[] = [];
  friendId: string;
  friendProfile: User;
  myProfile: User;
  subscription: any;

  constructor(private chatService: ChatService, private router: Router, private route: ActivatedRoute, private userService: UserService) {

    this.route.params.subscribe(params => {
      this.friendId = params['id'];
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      // this.myProfile = this.userService.getProfile();
      // this.friendProfile = this.chatService.getFriend(this.friendId);
      this.getChat();
    });
  }

  ngOnInit(): void {
  }

  getChat() {
    this.messages = [];
    // this.subscription = this.chatService.getMessages(this.friendId).subscribe(msgs => {
    //   let messages = msgs.map(msg => {
    //     let nm = new Message(msg);
    //     if (msg.senderId == this.myProfile.id) {
    //       nm.updateUser(this.myProfile.name, this.myProfile.imgUrl, true);
    //     } else {
    //       nm.updateUser(this.friendProfile.name, this.friendProfile.imgUrl, false);
    //     }
    //     return nm;
    //   });
    //   this.messages.push(...messages.slice(this.messages.length, messages.length));
    // });
  }

  sendMessage(event) {
    // this.chatService.createMessageText(this.friendId, event.message).subscribe()

  }


}
