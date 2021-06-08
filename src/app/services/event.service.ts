import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Event} from '../models/workday/event';
import {DetailedEvents} from '../models/workday/detailed-events';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  public getClientEvents(clientId: string): Observable<Event[]> {
    return this.httpClient.get<Event[]>(this.baseUrl + '/api/event/' + clientId + '/client');
  }

  public getByRoomId(roomId: string): Observable<Event> {
    return this.httpClient.get<Event>(this.baseUrl + '/api/event/room/' + roomId);
  }

  public saveOrder(event: Event): Observable<Event> {
    return this.httpClient.post<Event>(this.baseUrl + '/api/event', event);
  }

  public getEventsOfPsycho(psychoId: string): Observable<Event[]> {
    return this.httpClient.get<Event[]>(this.baseUrl + '/api/event/' + psychoId);
  }

  public getClientDetailedEvents(clientId: string): Observable<DetailedEvents[]> {
    return this.httpClient.get<DetailedEvents[]>(this.baseUrl + '/api/event/' + clientId + '/client/details');
  }

  public getDetailedEventsOfPsycho(psychoId: string): Observable<DetailedEvents[]> {
    return this.httpClient.get<DetailedEvents[]>(this.baseUrl + '/api/event/' + psychoId + '/details');
  }

  public update(event: Event): Observable<Event> {
    return this.httpClient.put<Event>(this.baseUrl + '/api/event', event);
  }
}
