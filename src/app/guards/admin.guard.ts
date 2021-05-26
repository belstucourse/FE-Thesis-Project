import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';
import {map} from 'rxjs/operators';
import {User} from '../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService,
              private userService: UserService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userId = this.authService.getUserIdByToken();
    if (userId !== '') {
      return this.userService.getUserById(userId).pipe(map<User, boolean>(user => !this.userService.isClient(user) || !this.userService.isPsychologist(user)));
    }
  }

}
