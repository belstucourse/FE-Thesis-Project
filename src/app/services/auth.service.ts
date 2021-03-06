import {Injectable} from '@angular/core';
import {User} from '../models/user/user';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {UserLogin} from '../models/user/user-login';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthToken} from '../models/auth-token';
import {BehaviorSubject, Subject} from 'rxjs';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //add line to trigger a new build
  private helper = new JwtHelperService();
  baseUrl = environment.baseUrl;
  public currentUser: Subject<User> = new BehaviorSubject(null);

  constructor(private http: HttpClient,
              private router: Router, private userService: UserService) {
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public getUserIdByToken(): string {
    return this.helper.decodeToken(localStorage.getItem('token')) ?
      this.helper.decodeToken(localStorage.getItem('token')).id
      : '';
  }


  login(user: UserLogin) {
    return this.http.post<any>(this.baseUrl + '/api/token', user)
      .subscribe(
        (token: AuthToken) => {
          const decodedToken = this.helper.decodeToken(token.token);
          localStorage.setItem('token', token.token);
          this.userService.getUserById(this.getUserIdByToken()).subscribe(user => {
            this.currentUser.next(user);
            this.router.navigate(['/profile/' + user.id]);
          });
        });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    this.http.post(this.baseUrl + '/api/logout', null).subscribe();
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return this.helper.isTokenExpired(token);
  }
}
