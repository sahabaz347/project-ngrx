import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';
  constructor(private httpClient: HttpClient) { }
  get(url: string, params?: any):Observable<any>{
    const data = { params: params };
    return this.httpClient
      .get(this.baseUrl + url, data).pipe(catchError(this.errorHandeler.bind))
  }
  private errorHandeler(response: any) {
    const error = response.error;
    const keys = Object.keys(error);
    let message = error[keys[0]];
    if (response.status == 401) {
      //auth token failed
    }
    if (error[keys[0]] instanceof Array) {
      message = error[keys[0]]
    }
    if (keys[0] == 'isTrusted') {
      //internet connection lose
    } else {
      message = keys[0] + ' : ' + message
    }
    return throwError({message:message,error:error})
  }
}
