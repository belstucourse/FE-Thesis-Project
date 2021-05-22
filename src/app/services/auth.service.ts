import {Injectable, Injector} from '@angular/core';
import {User} from '../models/user/user';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {UserLogin} from '../models/user/user-login';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthToken} from '../models/auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private helper = new JwtHelperService();

  constructor(private http: HttpClient,
              private router: Router,
              private injector: Injector) {
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public getUserIdByToken(): string {
    return this.helper.decodeToken(localStorage.getItem('token')).id;
  }


  login(user: UserLogin) {
    return this.http.post<any>('api/token', user)
      .subscribe(
        (token: AuthToken) => {
          const decodedToken = this.helper.decodeToken(token.token);
          localStorage.setItem('token', token.token);
          const userService = this.injector.get<UserService>(UserService);
          userService.getUserById(decodedToken.id)
            .subscribe((user: User) => {
              userService.activeUser.next(user);
            });
          this.router.navigate(['/catalog']);
        });
  }

  logout() {
    localStorage.removeItem('token');
    const userService = this.injector.get<UserService>(UserService);
    userService.activeUser.next(null);
    this.router.navigate(['/']);
    this.http.post('api/logout', null).subscribe();
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return this.helper.isTokenExpired(token);
  }
}
