import {Injectable, Injector, OnInit} from '@angular/core';
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
export class UserService{
  private _activeUser: Subject<User>;
  private helper = new JwtHelperService();

  constructor(private httpClient: HttpClient,
              private injector: Injector) {
    let id = this.helper.decodeToken(localStorage.getItem('token')).id;
    this.getUserById(id)
      .subscribe((user: User) => {
        this._activeUser = new BehaviorSubject(user);
      });
  }

  public getUserById(userId: string): Observable<User> {
    return this.httpClient.get<User>('api/users/' + userId);
  }

  //type: client, support, psychologist, admin
  public saveUser(user: User): Observable<User> {
    return this.httpClient.post<User>('/api/users', user);
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

  get activeUser(): Subject<User> {
    this._activeUser.subscribe((user: User) => {
      console.log(user);
      if (user === null) {
        const auth = this.injector.get<AuthService>(AuthService);
        this.getUserById(auth.getUserIdByToken())
          .subscribe((user: User) => this._activeUser.next(user));
      }
    });
    return this._activeUser;
  }

}
