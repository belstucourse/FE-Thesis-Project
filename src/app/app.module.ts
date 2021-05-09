import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { PsychoCardComponent } from './psycho-card/psycho-card.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegistrationClientPageComponent } from './registration-client-page/registration-client-page.component';
import { RegistrationPsychoPageComponent } from './registration-psycho-page/registration-psycho-page.component';
import { AppointmentPageComponent } from './appointment-page/appointment-page.component';
import { ComplaitPageComponent } from './complait-page/complait-page.component';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';
import { CreatePostPageComponent } from './create-post-page/create-post-page.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { BlogCardComponent } from './blog-card/blog-card.component';

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
