import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PsychoAvailableTimeslot} from '../models/workday/psycho-available-timeslot';
import {PsychoWorkday} from '../models/workday/psycho-workday';

@Injectable({
  providedIn: 'root'
})
export class WorkdayService {

  constructor(private httpClient: HttpClient) {
  }

  public getTimeslotsOfPsychologist(psychologistId: String, date: Date): Observable<PsychoAvailableTimeslot> {
    let params = new HttpParams();
    params = params.set('date', date.toLocaleDateString());
    return this.httpClient.get<PsychoAvailableTimeslot>('api/timeslot/' + psychologistId, {params: params});
  }

  public getTimeslotsOfPsychologistOnWeek(psychologistId: String): Observable<PsychoAvailableTimeslot[]> {
    return this.httpClient.get<PsychoAvailableTimeslot[]>('api/timeslot/' + psychologistId + '/week');
  }

  public saveTimeslot(psychoTimeslot: PsychoWorkday): Observable<PsychoWorkday> {
    return this.httpClient.post<PsychoWorkday>('api/timeslot/', psychoTimeslot);
  }

  public saveTimeslotsOnWeek(psychoTimeslot: PsychoWorkday): Observable<PsychoWorkday[]> {
    return this.httpClient.post<PsychoWorkday[]>('api/timeslot/all', psychoTimeslot);
  }

  public getPsychoWorkdaysOnWeek(psychoId: string): Observable<PsychoWorkday[]> {
    return this.httpClient.get<PsychoWorkday[]>('api/timeslot/'+psychoId+'/workday');
  }

  public updateTimeslot(psychoTimeslot: PsychoWorkday): Observable<PsychoWorkday> {
    return this.httpClient.put<PsychoWorkday>('api/timeslot/', psychoTimeslot);
  }

}
