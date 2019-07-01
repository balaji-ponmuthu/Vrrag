import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

export interface signupi{
  
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})




export class SignupComponent implements OnInit {
  signUpform: FormGroup;
  invalidLogin : boolean;  
  apiType: string;
  
  constructor(public dialogRef: MatDialogRef<SignupComponent>, private http: HttpClient, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.signUpform = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.email,Validators.required]),
      'password': new FormControl(null, Validators.required)      

    });
    
  }

  onSubmit(){
    //console.log(this.signUpform.value);
    let credentials = JSON.stringify(this.signUpform.value);
    this.apiType = 'auth/SignUp';
    const url = `${environment.serviceapi}/api/${this.apiType}/`;
    this.http.post(url, credentials,{
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(res=>{
      //console.log('spin',res);
      let token = (<any>res).token;
      localStorage.setItem("jwt", token);
      this.dialogRef.close(this.signUpform.value.username);
      this.toastr.success('for signing in..' ,'Thankyou '+this.signUpform.value.username);   
    })

  }

  onClose(){
    this.dialogRef.close();
  }
  

}
