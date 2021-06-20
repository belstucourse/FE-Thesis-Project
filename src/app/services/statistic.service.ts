import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StatisticContext} from '../models/statistic/statistic-context';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private httpClient: HttpClient) {
  }

  public getStatistic(): Observable<StatisticContext> {
    return this.httpClient.get<StatisticContext>('api/statistic');
  }
}
