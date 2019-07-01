import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { OnInit, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HomeService implements OnInit{
    token:any;
    data:any;
    apiType: string;
    quesDetails : any;
    public options = new Subject<string>();

    constructor(private http: HttpClient) {
    }
    
    ngOnInit(){
       this.token = localStorage.getItem("jwt");
       console.log('frmquestoken',this.token);
    }
    getQuestions(token): Observable<any>{
        this.apiType = 'question/GetQuestion';
        const url = `${environment.serviceapi}/api/${this.apiType}/`;
        // const httpHeaders= {headers: new HttpHeaders({
        //             "Authorization": "Bearer " + token,
        //             "Content-Type": "application/json"
        //           })}
        return this.http.get(url).pipe(map((response: Response) => {
            return response;
        }, function(error){
            return error.json();
        }
        ))
    }

    getSelectedQues(opt): Observable<any>{
        this.apiType = 'question/GetSelectedQuestion';
        const url = `${environment.serviceapi}/api/${this.apiType}/`;
        let params = new HttpParams().set('option',opt);
        const options = { params: params };
        return this.http.get(url, options).pipe(map((response: Response) => {
            return response;
        },function(err){
            return err.json();
        }));
    }

    // saveData(q){
    //     this.quesDetails = q;        
    // }

    // getData(){
    //     return this.quesDetails;
    // }

    saveAnswer(data) {
        this.apiType = 'question/PostAnswer';
        const url = `${environment.serviceapi}/api/${this.apiType}/`;
        let answerData = JSON.stringify(data);
        console.log('frmsave',answerData);
        let token = localStorage.getItem("jwt");
        const httpHeaders= {headers: new HttpHeaders({
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                  })}
        this.http.post(url, answerData, httpHeaders).subscribe((response: Response)=>
        {
            console.log(response);
        }, err => {
            console.log(err);
        })
    }

    getAnswer(quesID):Observable<any>{
        this.apiType = 'question/GetAnswer';
        const url = `${environment.serviceapi}/api/${this.apiType}/`;
        let params = new HttpParams().set('quesID',quesID);
        //console.log('inservice',url);
        let token = localStorage.getItem("jwt");
        // const httpHeaders= {headers: new HttpHeaders({
        //     "Authorization": "Bearer " + token,
        //     "Content-Type": "application/json"
        //   })}
        const headers = new HttpHeaders({
              "Authorization": "Bearer " + token,
                 "Content-Type": "application/json"
               });        
        const options = { params: params, headers: headers };
        return this.http.get(url, options).pipe(map((response:Response) =>  {
            return response;
        }, function(error){
            return error.json();
        }
        ))
    }

    getQues(quesID):Observable<any>{
        this.apiType = 'question/GetCurrentQues';
        const url = `${environment.serviceapi}/api/${this.apiType}/`;
        let params = new HttpParams().set('quesID',quesID);
        let token = localStorage.getItem("jwt");
        const headers = new HttpHeaders({
            "Authorization": "Bearer " + token,
               "Content-Type": "application/json"
             });        
      const options = { params: params, headers: headers };
      return this.http.get(url, options).pipe(map((response:Response) =>  {
          return response;
      }, function(error){
          return error.json();
      }
      ))
    }

    setOptions(opt){
        this.options.next(opt);
    }

}