import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.component.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { SignupComponent } from '../auth/signup/signup.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  questionData :any;
  ques: string;
  quesUserName: string;
  answerForm : FormGroup;
  answerData: any[];
  quesId: string;

  constructor(private homeservice: HomeService, private router: Router, private route: ActivatedRoute,
    private dialog:MatDialog, private dialogRef1: MatDialogRef<SignupComponent>,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.answerForm = new FormGroup({
      'answerTxt' : new FormControl(null, Validators.required)
    })
    this.quesId = this.route.snapshot.params['id'];
    this.LoadAnswers();    
    this.LoadQuestions();  
    // this.questionData = this.homeservice.getData();
    // this.ques = this.questionData.ques;
    // this.quesUserName = this.questionData.name;
    
  }

  onSubmit(){
    //console.log('anspost',this.answerForm.value.answerTxt);
    var data = {
      "answerTxt" : this.answerForm.value.answerTxt,
      "quesID" : this.questionData.id
    }
    this.homeservice.saveAnswer(data);
    //this.router.navigate(['answer',this.quesId]);
    window.location.reload();
    
  }

  onWipe(){
    this.answerForm.reset();
  }

  LoadAnswers(){
    this.spinner.show();
    this.homeservice.getAnswer(this.quesId).subscribe(
      (data:any[]) =>
      {
        this.answerData = data;
        console.log(this.answerData);
        this.spinner.hide();
        
      }, err =>{
        console.log(err.statusText);
        if(err.statusText == 'Unauthorized'){
          this.router.navigate(['/']);
          this.openSignUp();
          
        }
      }
    )
  }

  LoadQuestions(){
    this.spinner.show();
    this.homeservice.getQues(this.quesId).subscribe(
      (data:any[]) =>
      {
        this.questionData = data;
        console.log('qwert',this.questionData);
        this.ques = this.questionData.ques;
        this.quesUserName = this.questionData.name;
        this.spinner.hide();
      }, err => {
        console.log(err);
      }
    )
  }

  openSignUp(){
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialogRef1 = this.dialog.open(SignupComponent, dialogConfig);
    
  }
}
