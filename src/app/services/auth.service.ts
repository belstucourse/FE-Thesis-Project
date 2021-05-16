import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user/user';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {UserLogin} from '../models/user/user-login';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
    }
    return this.http.post<any>('api/token', user).subscribe(
      (token: any) => {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token.token);
        localStorage.setItem('token', token.token);
        let user: UserModel = {
          id: decodedToken.id,
          name: decodedToken.name,
          surname: decodedToken.surname,
          aboutMe: decodedToken.aboutMe,
          login: decodedToken.sub,
          password: null,
          role: decodedToken.scopes,
          status: decodedToken.status,
          photoUrl: decodedToken.photoUrl,
          email: decodedToken.email,
        }
        this.userService.activeUser.next(user);
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
    return tokenNotExpired(null, token);
  }
}
