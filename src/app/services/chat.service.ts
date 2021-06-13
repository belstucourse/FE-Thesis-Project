import {Injectable} from '@angular/core';
import {Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {UserService} from './user.service';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {Message} from '../models/chat/message';
import {Chat} from '../models/chat/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public stompClient = null;
  public messages: Message[] = [];

  constructor(private userService: UserService,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              private httpClient: HttpClient) {
  }

  public connect() {
    const socket = new SockJS('/http://localhost:8081/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, frame => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/user/' + this.userService.getUserById(this.authService.getUserIdByToken()) + '/queue/messages', message => {
        const notification = JSON.parse(message.body);
        const activeUserId = this.authService.getUserIdByToken();
        if (activeUserId === notification.senderId) {
          this.findChatMessages(notification.id).subscribe((message) => {
            this.messages.push(message);
          });
        } else {
          this.snackBar.open('Пришло новое сообщение от ' + notification.senderId, 'Хорошо');
        }
      });
    }, this.onError);
  }

  public onError(err) {
    console.log(err);
  };

  public loadChats(): Observable<Chat[]> {
    return this.httpClient.get<Chat[]>("/chats");
  }

  public disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  public sendMessage(message) {
    this.stompClient.send('/app/chat', {}, JSON.stringify(message));
  }

  findChatMessages(id): Observable<Message> {
    if (this.authService.getToken()) {
      this.snackBar.open('Вы не авторизованы', 'Хорошо');
      return;
    }
    return this.httpClient.get<Message>('/messages/' + id);
  }
}
