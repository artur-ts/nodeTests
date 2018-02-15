import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public token_moken: any;
  public login_status: string;
  public loginDisplay: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    // this.http.post('http://127.0.0.1:8000/post',{heyse :"heyse"}, {headers:  {"Content-Type" : "application/json"}}).subscribe(data => {
    //   console.log(data);
    // });
  }
  generateToken(user: string , pass: string) {
    this.http.post('http://127.0.0.1:8000/api/login',{username:user, password:pass}, {headers:  {"Content-Type" : "application/json"}}).subscribe(data => {
      if(data) {
        this.login_status = typeof data.logStatus != "undefined" ? data.logStatus : "";
        this.token_moken = typeof data.token != "undefined" ? data.token : ""
        localStorage.setItem('token', this.token_moken
        this.loginDisplay = true;
        setTimeout(() => {
          this.router.navigate(["/chat"])
        },2000)


      }

    }, error => {
      this.login_status = error.error.message;
      this.loginDisplay = true;
    });
  }
  checkToken() {
    this.http.post('http://127.0.0.1:8000/api/protected',{}, {headers:  {"Content-Type" : "application/json", "Authorization": "Bearer "+ this.token_moken}}).subscribe(data => {
      console.log(data);
    });
  }
}
