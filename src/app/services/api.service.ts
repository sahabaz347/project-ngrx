import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpService:HttpService) { }
  getAllPost():Observable<User[]>{
    return this.httpService.get('/users')
    .pipe(map(data=>data as User[]))
  }
}
