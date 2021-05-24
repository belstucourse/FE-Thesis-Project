import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {CatalogPageComponent} from './components/catalog-page/catalog-page.component';
import {PsychoCardComponent} from './components/psycho-card/psycho-card.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {RegistrationClientPageComponent} from './components/registration-client-page/registration-client-page.component';
import {RegistrationPsychoPageComponent} from './components/registration-psycho-page/registration-psycho-page.component';
import {AppointmentPageComponent} from './components/appointment-page/appointment-page.component';
import {ComplaitPageComponent} from './components/complait-page/complait-page.component';
import {FeedbackPageComponent} from './components/feedback-page/feedback-page.component';
import {CreatePostPageComponent} from './components/create-post-page/create-post-page.component';
import {BlogPageComponent} from './components/blog-page/blog-page.component';
import {BlogCardComponent} from './components/blog-card/blog-card.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule, MatOptionModule, MatRippleModule} from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import {NgxMatFileInputModule} from '@angular-material-components/file-input';
import {ChatComponent} from './components/chat/chat.component';
import {ChatHeaderComponent} from './components/chat/chat-header/chat-header.component';
import {ChatControlsComponent} from './components/chat/chat-controls/chat-controls.component';
import {ChatMessageComponent} from './components/chat/chat-message/chat-message.component';
import {FlexModule} from '@angular/flex-layout';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {OrderComponent} from './components/order/order.component';
import {ProfilePageComponent} from './components/profile-page/profile-page.component';
import {AppFeedbackPageComponent} from './components/app-feedback-page/app-feedback-page.component';
import {AuthInterceptor} from './services/auth-interceptor';
import {JwtInterceptor} from './services/jwt-interceptor';
import { AppointmentDashboardComponent } from './components/appointment-dashboard/appointment-dashboard.component';
import {AdminUserDashboardComponent} from "./components/admin-user-dashboard/admin-user-dashboard.component";
import {AdminUserCardComponent} from "./components/admin-user-card/admin-user-card.component";
import { FullPostComponent } from './components/full-post/full-post.component';
import { PsychoWorkdayComponent } from './components/psycho-workday/psycho-workday.component';
import { BidiModule } from '@angular/cdk/bidi';
import { PlatformModule } from '@angular/cdk/platform';
import { ObserversModule } from '@angular/cdk/observers';
import { AdminPsychoDashboardComponent } from './components/admin-psycho-dashboard/admin-psycho-dashboard.component';
import { AdminPsychoCardComponent } from './components/admin-psycho-card/admin-psycho-card.component';
import { AboutComponent } from './components/about/about.component';
import { UserScheduleComponent } from './components/user-shedule/user-schedule.component';


const routes = [
  {path: '', component: HomePageComponent},
  {path: 'catalog', component: CatalogPageComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'registration-c', component: RegistrationClientPageComponent},
  {path: 'registration-p', component: RegistrationPsychoPageComponent},
  {path: 'appointment/:psychoId', component: AppointmentPageComponent},
  {path: 'complaint', component: ComplaitPageComponent},
  {path: 'feedback', component: FeedbackPageComponent},
  {path: 'create-post', component: CreatePostPageComponent},
  {path: 'blog', component: BlogPageComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'order', component: OrderComponent},
  {path: 'profile/:userId', component: ProfilePageComponent}, //TODO: provide  /:psychoId
  {path: 'app-feedback', component: AppFeedbackPageComponent},
  {path: 'psychoAppointments', component: AppointmentDashboardComponent},
  {path: 'post/:postId', component: FullPostComponent},
  {path: 'admin', component: AdminUserDashboardComponent},
  {path: 'admin-p', component: AdminPsychoDashboardComponent},
  {path: 'about', component: AboutComponent},
  {path: 'workday', component: PsychoWorkdayComponent}
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
    BlogCardComponent,
    ChatComponent,
    ChatHeaderComponent,
    ChatControlsComponent,
    ChatMessageComponent,
    OrderComponent,
    ProfilePageComponent,
    AppFeedbackPageComponent,
    AppointmentDashboardComponent,
    AdminUserDashboardComponent,
    FullPostComponent,
    PsychoWorkdayComponent,
    AdminUserCardComponent,
    AdminPsychoDashboardComponent,
    AdminPsychoCardComponent,
    AboutComponent,
    UserScheduleComponent
  ],
  imports: [
    BidiModule,
    PlatformModule,
    ObserversModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    A11yModule,
    ClipboardModule,
    DragDropModule,
    PortalModule,
    ScrollingModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatNativeDateModule,
    MatRippleModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatTabsModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    NgxMatFileInputModule,
    FlexModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
