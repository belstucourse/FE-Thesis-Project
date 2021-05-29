import {Injectable} from '@angular/core';
import {Moment} from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateTimeCalculator {

  constructor() {
  }

  public calculate(date: Moment, time: string) {
    let hoursString = time.charAt(0) + time.charAt(1);
    let minutesString = time.charAt(3) + time.charAt(4);
    let hours: number = +hoursString;
    let minutes: number = +minutesString;
    return new Date(Date.UTC(date.year(), date.month(), date.date(), hours, minutes));
  }
}
