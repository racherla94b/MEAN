import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialMoule } from './angular-material.module';

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
import { AuthService } from './registration/auth.service';
import { FormDataService } from './home/form-data.service';
import { HomeService } from './home/homelink/home.service';
import { AuthInterceptor } from './registration/auth-interceptor';
import { ErrorInterceptor } from './error-page/error-interceptor';
import { DownloadDialogComponent } from './home/get-data/download-dialog/download-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    HomepageComponent,
    GetDataComponent,
    AddDataComponent,
    HomelinkComponent,
    DisplayDataComponent,
    UploadDataComponent,
    AddFormComponent,
    ErrorPageComponent,
    DownloadDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialMoule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthGuard, AuthService, FormDataService, HomeService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorPageComponent, DownloadDialogComponent]
})
export class AppModule { }
