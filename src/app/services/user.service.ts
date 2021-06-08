import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user/user';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Client} from '../models/user/client';
import {Psychologist} from '../models/user/psychologist';
import {PagePsychologist} from '../models/pagePsychologist';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Admin} from "../models/user/admin";
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private helper = new JwtHelperService();
  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient,
              private injector: Injector) {
  }

  public getUserById(userId: string): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl +'/api/users/' + userId);
  }

  //type: client, support, psychologist, admin
  public saveUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl +'/api/users', user);
  }

  public updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(this.baseUrl +'/api/users', user);
  }

  public updatePsycho(psychologist: Psychologist): Observable<User> {
    return this.httpClient.put<Psychologist>(this.baseUrl +'/api/users/psycho', psychologist);
  }

  public isClient(object: User): object is Client {
    return 'birthdayDate' in object;
  }

  public isPsychologist(object: User): object is Psychologist {
    return 'mobile' in object && 'tags' in object;
  }

  public isAdmin(object: User): object is Admin {
    return 'localDate' in object;
  }

  public getDoctorsByTagNames(tagNames: string[]): Observable<PagePsychologist> {
    let params = new HttpParams();
    tagNames.forEach((name: string) => params = params.append('tagNames', name));
    return this.httpClient.get<PagePsychologist>(this.baseUrl +'/api/users/doctors', {params});
  }

  public getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl +'/api/users/all');
  }

  public getAllPsychos(): Observable<Psychologist[]> {
    return this.httpClient.get<Psychologist[]>(this.baseUrl +'/api/users/all-psycho');
  }


  public getDoctorsByTagNamesAndWorkday(tagNames: string[], startDate: Date, endDate: Date): Observable<PagePsychologist> {
    let params = new HttpParams();
    tagNames.forEach((name: string) => params = params.append('tagNames', name));
    params = params.append('startDate', startDate.toISOString());
    params = params.append('endDate', endDate.toISOString());
    return this.httpClient.get<PagePsychologist>(this.baseUrl +'/api/users/doctors/search', {params});
  }
}
