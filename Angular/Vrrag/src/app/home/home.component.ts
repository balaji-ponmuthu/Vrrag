import { Component, OnInit, Output, Input } from '@angular/core';
import { HomeService } from './home.component.service';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit {
  data: any[];
  optionSelected : Subscription;
    

  constructor(private homeservice: HomeService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.LoadData();
    this.optionSelected = this.homeservice.options.subscribe(
      (optSel) => {
        this.LoadSelectedData(optSel);
      }
    )
  }

  ngDestroy(){
    this.optionSelected.unsubscribe();
  }

  LoadData(){
    this.spinner.show();
    let token = localStorage.getItem("jwt");
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
  }, 5000);
    this.homeservice.getQuestions(token).subscribe((data:any[]) => {
      this.data = data;
      this.spinner.hide();
      //console.log('frmobse',this.data);      
    })
    //this.homeservice.getQuestions(token);   
       
  }

  onQuesClick(quesDetails){
    //this.homeservice.saveData(quesDetails);
    this.router.navigate(['answer',quesDetails.id]);
    
  }

  LoadSelectedData(opt){
    this.spinner.show();
    this.homeservice.getSelectedQues(opt).subscribe(
      (data:any[]) => {
        this.data = data;
        this.spinner.hide();
      }
    )
  }

}
