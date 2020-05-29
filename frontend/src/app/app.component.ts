import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Item } from './Item';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private http: HttpClient) {}
  title = 'angular-with-laravel';
  
  configUrl = 'assets/config.json';
  httpOptions = {};

  // public addRecord(form: NgForm): Observable<Item> {
  //   console.log(form.value);
  //   return this.http.post<Item>(this.configUrl, form, this.httpOptions)
  //   .pipe(
  //     (catchError(error))
  //   )
  // }
}
