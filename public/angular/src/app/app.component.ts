import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.post('http://127.0.0.1:8000/post',{"requ": "111"},  {"Content-type": "application/json", "Access-Control-Allow-Origin": true}).subscribe(data => {
      console.log(data);
    });
  }

  poxos() {
    console.log(1);
    this.http.get("/assets")
    // console.log();
  }
}
