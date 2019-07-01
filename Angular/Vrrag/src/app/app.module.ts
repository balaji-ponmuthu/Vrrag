import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule, MatDialogRef, MatFormFieldModule, MatSelectModule} from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import {AngularFontAwesomeModule } from 'angular-font-awesome';
import { AuthGuard } from './auth-guards.services';
import { HomeService } from './home/home.component.service';
import { AnswerComponent } from './answer/answer.component';




@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    AnswerComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    FormsModule,
    MatDialogModule,    
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxSpinnerModule,
    ToastrModule.forRoot()
    
  ], 
  
  providers: [HomeService, { provide: MatDialogRef, useValue: {} }],
  bootstrap: [AppComponent],
  entryComponents: [SignupComponent, SigninComponent]
})
export class AppModule { }
