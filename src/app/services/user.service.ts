import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {User} from '../models/user/user';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Client} from '../models/user/client';
import {Psychologist} from '../models/user/psychologist';
import {PagePsychologist} from '../models/pagePsychologist';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public activeUser: Subject<User> = new ReplaySubject(1);

  constructor(private httpClient: HttpClient) {
  }

  public getUserById(userId: string): Observable<User> {
    return this.httpClient.get<User>('api/users/' + userId);
  }

  //type: client, support, psychologist, admin
  public saveUser(user: User): Observable<User> {
    return this.httpClient.post<User>('/api/users', user);
  }

  public getCurrentUser(): User {
    return;
  }


  private isClient(object: User): object is Client {
    return 'birthdayDate' in object;
  }

  private isPsychologist(object: User): object is Psychologist {
    return 'mobile' in object && 'tags' in object;
  }

  public getDoctorsByTagNames(tagNames: string[]): Observable<PagePsychologist> {
    let params = new HttpParams();
    tagNames.forEach((name: string) => params = params.append('tagNames', name));
    return this.httpClient.get<PagePsychologist>('api/users/doctors', {params});
  }
}
