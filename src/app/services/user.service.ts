import {Injectable, Injector} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {User} from '../models/user/user';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Client} from '../models/user/client';
import {Psychologist} from '../models/user/psychologist';
import {PagePsychologist} from '../models/pagePsychologist';
import {AuthService} from './auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private helper = new JwtHelperService();

  constructor(private httpClient: HttpClient,
              private injector: Injector) {
  }

  public getUserById(userId: string): Observable<User> {
    return this.httpClient.get<User>('api/users/' + userId);
  }

  //type: client, support, psychologist, admin
  public saveUser(user: User): Observable<User> {
    return this.httpClient.post<User>('/api/users', user);
  }

  public updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>('/api/users', user);
  }

  public updatePsycho(psychologist: Psychologist): Observable<User> {
    return this.httpClient.put<Psychologist>('/api/users/psycho', psychologist);
  }

  public isClient(object: User): object is Client {
    return 'birthdayDate' in object;
  }

  public isPsychologist(object: User): object is Psychologist {
    return 'mobile' in object && 'tags' in object;
  }

  public getDoctorsByTagNames(tagNames: string[]): Observable<PagePsychologist> {
    let params = new HttpParams();
    tagNames.forEach((name: string) => params = params.append('tagNames', name));
    return this.httpClient.get<PagePsychologist>('api/users/doctors', {params});
  }

  public getAllUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>('api/users/all')
  }

  public getAllPsychos(): Observable<Psychologist[]>{
    return this.httpClient.get<Psychologist[]>('api/users/all-psycho')
  }
}
