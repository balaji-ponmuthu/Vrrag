import { Component, OnInit } from '@angular/core';
import  {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HomeService } from './home/home.component.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';


export interface Category {
  name: string;
  value: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
askQuesForm: FormGroup;
IsUserExists : boolean = false;
UserName : string;


category : Category[] = [
  {name: 'Science', value: 'Science'},
  {name: 'Media', value: 'Media'},
  {name: 'Sports', value: 'Sports'},
  {name: 'Others', value: 'Others'}
]
  apiType: string;

constructor(private dialog:MatDialog, private dialogRef: MatDialogRef<SigninComponent>, private dialogRef1: MatDialogRef<SignupComponent>,private http: HttpClient,
  private router:Router, private homeService: HomeService, private toastr: ToastrService) {
}

ngOnInit(){

  this.getUserName();

  this.askQuesForm = new FormGroup({
    'quesText': new FormControl(null, Validators.required),
    'categoryDropdown': new FormControl(null, Validators.required)
  });
}

getUserName(){
  let token = localStorage.getItem('jwt');
  if(token != null)
  {
    let jwtData = token.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData) ;
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    
    this.IsUserExists = (decodedJwtData.UserName != null && decodedJwtData.UserName != '') ? true : false;
    this.UserName =  this.IsUserExists ? decodedJwtData.UserName : '' ;
    //console.log('userdata',(decodedJwtData.UserName != ''));
  }
  
}

  openSignUp(){
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialogRef1 = this.dialog.open(SignupComponent, dialogConfig);
    this.dialogRef1.afterClosed().subscribe(user => {
      if(user != undefined && user != null)
      {
        this.IsUserExists = true;
        this.UserName = user;
      }      
    },
    err=> {
      console.log(err);
    });
  }

  openSignIn(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;    
    this.dialogRef = this.dialog.open(SigninComponent, dialogConfig);
    
    this.dialogRef.afterClosed().subscribe(user => {
      if(user != undefined && user != null)
      {
        this.IsUserExists = true;
        this.UserName = user;
      }      
    },
    err=> {
      console.log(err);
    });
    
  }

  onSubmit(){
  console.log(this.askQuesForm.value);
  var question = {
    "ques" : this.askQuesForm.value.quesText,
    "category" : this.askQuesForm.value.categoryDropdown.name
  }
  let token = localStorage.getItem("jwt");
  
  let questions = JSON.stringify(question);
  this.apiType = 'question/PostQuestion';
  const url = `${environment.serviceapi}/api/${this.apiType}/`;
  this.http.post(url,questions, {
    headers: new HttpHeaders({
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    })
  }).subscribe(res=>{

  }, err=>{
    console.log(err);
  });
  
  this.router.navigate(['/']);
  window.location.reload();
  }

  onLogoutClick(){
    this.IsUserExists = false;
    localStorage.removeItem("jwt");
    this.toastr.success('Logged out Successfully!');   
  }

  onClear(){
    this.askQuesForm.reset();
  }

  menuClick(opt: string){
    this.homeService.setOptions(opt);
  }

}
