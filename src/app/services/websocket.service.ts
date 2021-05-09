import {Injectable} from '@angular/core';
import {Message} from '@stomp/stompjs';
import {BehaviorSubject, Observable} from 'rxjs';
import {StompService, StompState} from '@stomp/ng2-stompjs';
import {WebSocketConfig} from '../config/web-socket-config';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public message: Observable<Message>;

  constructor(private stompService: StompService) {
  }

  public connectWebSocket() {
    this.message = this.stompService.subscribe(WebSocketConfig.topic);
  }

  public stream(): Observable<Message> {
    return this.message;
  }

  public send(url: string, message: any) {
    return this.stompService.publish(url, JSON.stringify(message));
  }

  public state(): BehaviorSubject<StompState> {
    return this.stompService.state;
  }
}
