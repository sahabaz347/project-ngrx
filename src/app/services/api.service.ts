import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpService: HttpService) { }
  getAllUser(): Observable<User[]> {
    return this.httpService.get('/users')
      .pipe(map(data => data as User[]))
  }
  getsinglePost(id: number): Observable<User> {
    return this.httpService.get('/users/' + id)
      .pipe(map(data => data as User))
  }
  getAllPost(): Observable<Post[]> {

    const data: Post[] = [
      {
        title: 'post 1', id: 1,
        comments: [{ id: 1, description: 'comment 1' }, { id: 2, description: 'comment 2' }]
      }, {
        title: 'post 2', id: 2,
        comments: [{ id: 1, description: 'comment 3' }, { id: 2, description: 'comment 4' }]
      }
      // , {
      //   title: 'post 3', id: 3,
      //   comments: [{ id: 1, description: 'comment 5' }, { id: 2, description: 'comment 6' }]
      // }, {
      //   title: 'post 4', id: 4,
      //   comments: [{ id: 1, description: 'comment 7' }, { id: 2, description: 'comment 8' }]
      // }, {
      //   title: 'post 5', id: 5,
      //   comments: [{ id: 11, description: 'comment 9' }, { id: 13, description: 'comment 10' }]
      // }, {
      //   title: 'post 6', id: 6,
      //   comments: [{ id: 121, description: 'comment 11' }, { id: 15, description: 'comment 12' }]
      // }, {
      //   title: 'post 7', id: 7,
      //   comments: [{ id: 11, description: 'comment 13' }, { id: 13, description: 'comment 14' }]
      // }, {
      //   title: 'post 8', id: 8,
      //   comments: [{ id: 121, description: 'comment 15' }, { id: 15, description: 'comment 16' }]
      // }, {
      //   title: 'post 9', id: 9,
      //   comments: [{ id: 11, description: 'comment 17' }, { id: 13, description: 'comment 18' }]
      // }, {
      //   title: 'post 10', id: 10,
      //   comments: [{ id: 121, description: 'comment 19' }, { id: 15, description: 'comment 20' }]
      // }
      // ,{
      //   title: 'post 11', id: 11,
      //   comments: [{id: 11, description: 'comment 21'}, {id: 13, description: 'comment 22'}]
      // }, {
      //   title: 'post 12', id: 12,
      //   comments: [{id: 121, description: 'comment 23'}, {id: 15, description: 'comment 24'}]
      // },{
      //   title: 'post 13', id: 13,
      //   comments: [{id: 11, description: 'comment 25'}, {id: 13, description: 'comment 26'}]
      // }, {
      //   title: 'post 14', id: 14,
      //   comments: [{id: 121, description: 'comment 27'}, {id: 15, description: 'comment 28'}]
      // },{
      //   title: 'post 15', id: 15,
      //   comments: [{id: 11, description: 'comment 29'}, {id: 13, description: 'comment 30'}]
      // }, {
      //   title: 'post 16', id: 16,
      //   comments: [{id: 121, description: 'comment 31'}, {id: 15, description: 'comment 32'}]
      // },{
      //   title: 'post 17', id: 17,
      //   comments: [{id: 11, description: 'comment 33'}, {id: 13, description: 'comment 34'}]
      // }, {
      //   title: 'post 18', id: 18,
      //   comments: [{id: 121, description: 'comment 35'}, {id: 15, description: 'comment 36'}]
      // }
    ];

    return new Observable(observer => {
      observer.next(data)
    })
  }
}
