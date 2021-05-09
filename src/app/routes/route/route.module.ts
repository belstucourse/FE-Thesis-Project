import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RegistrationComponent} from '../../components/registration/registration.component';
import {WelcomeComponent} from '../../components/welcome/welcome.component';

const appRoutes: Routes = [
  {path: 'home', component: WelcomeComponent},
  {path: 'registration', component: RegistrationComponent},
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {path: 'welcome', component: WelcomeComponent}
  // {path: 'user/:id', component: AboutUserComponent, canActivate: [AuthGuard]},
  // {path: 'signout', component: MainComponent},
  // {path: 'registration', component: RegistrationComponent},
  // {path: 'story', component: ActivityComponent, canActivate: [AuthGuard]},
  // {
  //   path: '', redirectTo: '/home', pathMatch: 'full'
  // },
  // {path: 'story/:tag', component: ActivityComponent, canActivate: [AuthGuard]},
  // {
  //   path: '**', component: MainComponent
  // }

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes, {enableTracing: true, onSameUrlNavigation: 'reload'})
  ],
  exports: [
    RouterModule
  ]
})
export class RouteModule {
}
