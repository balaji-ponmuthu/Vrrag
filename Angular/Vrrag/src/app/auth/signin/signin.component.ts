import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInform : FormGroup;
  invalidLogin: boolean;
  apiType: any;
  //@Output() usrnameEvent = new EventEmitter<string>();

  constructor(private http : HttpClient, private router: Router, private dialog : MatDialogRef<SigninComponent>,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.signInform = new FormGroup({
      'username': new FormControl(null,Validators.required),
      'password': new FormControl(null,Validators.required)

    });
  }

  onSubmit(){
    
    let credentials = JSON.stringify(this.signInform.value);
    this.apiType = 'auth';
    const url = `${environment.serviceapi}/api/${this.apiType}/`;
    this.http.post(url, credentials,{
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(res=>{   
      this.toastr.success('We missed you..' ,'Welcome '+this.signInform.value.username);   
      let token = (<any>res).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.router.navigate(["/"]);
      this.dialog.close(this.signInform.value.username);
      //this.usrnameEvent.emit(this.signInform.value.username);
    },err =>{
      console.log('sin',err);
      if(err.statusText == 'Unauthorized')
      {
        this.toastr.error('Wrong Username','Oops..!' );
      }
    })

  }

  onClose(){
    this.dialog.close();
  }

}
