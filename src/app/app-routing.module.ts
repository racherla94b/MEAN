import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './registration/login/login.component';
import { SignupComponent } from './registration/signup/signup.component';
import { HeaderComponent } from './home/header/header.component';
import { HomepageComponent } from './home/homepage/homepage.component';
import { GetDataComponent } from './home/get-data/get-data.component';
import { AddDataComponent } from './home/add-data/add-data.component';
import { HomelinkComponent } from './home/homelink/homelink.component';
import { DisplayDataComponent } from './home/get-data/display-data/display-data.component';
import { UploadDataComponent } from './home/upload-data/upload-data.component';
import { AddFormComponent } from './home/add-form/add-form.component';
import { ErrorPageComponent } from './error-page/error-page.component';

import { AuthGuard } from './registration/auth-guard.service';

const appRoutes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', canActivate: [AuthGuard], component: LoginComponent },
  { path: 'signup', canActivate: [AuthGuard], component: SignupComponent },
  { path: 'home', component: HomepageComponent, children: [
    { path: '', component: HomelinkComponent },
    { path: 'add-data', component: AddDataComponent, children: [
      { path: 'upload', component: UploadDataComponent },
      { path: 'form', component: AddFormComponent }
    ] },
    { path: 'get-data', component: GetDataComponent, children: [
      { path: 'search', component: DisplayDataComponent }
    ]},
    { path: 'selected/:wordId', component: DisplayDataComponent },
    { path: 'edit/:wordId', component: AddFormComponent }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
