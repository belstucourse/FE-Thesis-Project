import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CatalogPageComponent } from './components/catalog-page/catalog-page.component';
import { PsychoCardComponent } from './components/psycho-card/psycho-card.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RegistrationClientPageComponent } from './components/registration-client-page/registration-client-page.component';
import { RegistrationPsychoPageComponent } from './components/registration-psycho-page/registration-psycho-page.component';
import { AppointmentPageComponent } from './components/appointment-page/appointment-page.component';
import { ComplaitPageComponent } from './components/complait-page/complait-page.component';
import { FeedbackPageComponent } from './components/feedback-page/feedback-page.component';
import { CreatePostPageComponent } from './components/create-post-page/create-post-page.component';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import { BlogCardComponent } from './components/blog-card/blog-card.component';

const routes = [
  {path: '', component: HomePageComponent},
  {path: 'catalog', component: CatalogPageComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'registration-c', component: RegistrationClientPageComponent},
  {path: 'registration-p', component: RegistrationPsychoPageComponent},
  {path: 'appointment', component: AppointmentPageComponent},
  {path: 'complaint', component: ComplaitPageComponent},
  {path: 'feedback', component: FeedbackPageComponent},
  {path: 'create-post', component: CreatePostPageComponent},
  {path: 'blog', component: BlogPageComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CatalogPageComponent,
    PsychoCardComponent,
    SignInComponent,
    RegistrationClientPageComponent,
    RegistrationPsychoPageComponent,
    AppointmentPageComponent,
    ComplaitPageComponent,
    FeedbackPageComponent,
    CreatePostPageComponent,
    BlogPageComponent,
    BlogCardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
