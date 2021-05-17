import {Injectable} from '@angular/core';
import {Message, Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {UserService} from './user.service';
import {ReplaySubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  public stompClient = null;
  public message: Subject<Message> = new ReplaySubject(1);

  constructor(private userService: UserService) {
  }

  public connect(currentUser) {
    const socket = new SockJS('/http://localhost:8081/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, frame => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/user/' + this.userService.getCurrentUser().id + '/queue/messages', message => {
        this.message.next(message);
      });
    }, this.onError);
  }

  public onError(err) {
    console.log(err);
  };

  public disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  public sendMessage(message) {
    this.stompClient.send('/app/chat', {}, JSON.stringify(message));
  }
}
