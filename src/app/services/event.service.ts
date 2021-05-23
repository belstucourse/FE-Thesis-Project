import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Event} from '../models/workday/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClient: HttpClient) {
  }

  public saveOrder(event: Event): Observable<Event> {
    return this.httpClient.post<Event>('/api/event', event);
  }

  public getEventsOfPsycho(psychoId: string): Observable<Event[]> {
    return this.httpClient.get<Event[]>('/api/event/' + psychoId);
  }
}
