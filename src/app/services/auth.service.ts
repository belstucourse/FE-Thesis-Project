import {Injectable} from '@angular/core';
import {User} from '../models/user/user';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {UserLogin} from '../models/user/user-login';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private helper = new JwtHelperService();

  constructor(private http: HttpClient,
              private userService: UserService,
              private router: Router) {
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  login(username: string, password: string) {
    let user: UserLogin = {
      login: username,
      password: password
    };
    return this.http.post<any>('api/token', user).subscribe(
      (token: any) => {
        const decodedToken = this.helper.decodeToken(token.token);
        localStorage.setItem('token', token.token);
        this.userService.getUserById(decodedToken.id)
          .subscribe((user: User) => this.userService.activeUser.next(user));

        this.router.navigate(['/story']);
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.userService.activeUser.next(null);
    this.router.navigate(['/home']);
    this.http.post('api/logout', null).subscribe();
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return this.helper.isTokenExpired(token);
  }
}
