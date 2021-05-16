import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user/user';
import {HttpClient} from '@angular/common/http';
import {Client} from '../models/user/client';
import {Psychologist} from '../models/user/psychologist';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  public getUserById(userId: string): Observable<User> {
    return this.httpClient.get<User>('api/users/' + userId);
  }

  public saveUser(user: User, file: File): Observable<User> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('firstName', user.firstName);
    formData.append('middleName', user.middleName);
    formData.append('lastName', user.lastName);
    formData.append('password', user.password);
    if (this.isClient(user)) {
      formData.append('birthdayDate', user.birthdayDate.toLocaleDateString());
    } else if (this.isPsychologist(user)) {
      formData.append('mobile', user.mobile);
      formData.append('tags', JSON.stringify(user.tags));
    }
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

}
