import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/reducer';
import * as userAction from 'src/app/action/user-action';
import { Observable, Subject, catchError, map, of, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { User } from '../models/user';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class YoutubeRepoService {
  users=new Subject<User[]>();
  constructor(private apiService: ApiService, private store: Store<RootReducerState>) { }

  getUserData(force = false): Observable<[User[], boolean, boolean, string]> {
    return this.store.select('userReducer').pipe(
      take(1), // Take only one emission
      switchMap(res => {
        if ((!res.loading && !res.loaded) || force) {
          this.store.dispatch(userAction.userListRequestAction());
          return this.apiService.getAllPost().pipe(
            map(res => this.store.dispatch(userAction.userListSuccessAction({ data: res }))),
            catchError((error: HttpErrorResponse) => of(this.store.dispatch(userAction.userListErrorAction({ data: error.message }))))
          );
        }
        return of(null); // No need to make an API call
      }),
      withLatestFrom(this.store.select('userReducer')),
      map(([_, userReducerState]) => [userReducerState.user, userReducerState.loading, userReducerState.error, userReducerState.errorMsg])
    );
  }

  deleteUser(id: number):Observable<[User[], boolean, boolean, string]> {
    this.store.dispatch(userAction.userListDeleteAction({ id }))
    return this.store.select('userReducer').pipe(
      withLatestFrom(this.store.select('userReducer')),
    map(([_, userReducerState]) => [userReducerState.user, userReducerState.loading, userReducerState.error, userReducerState.errorMsg])
   )

  }
  updateUser(id: number,name:string,email:string):Observable<[User[], boolean, boolean, string]> {
    this.store.dispatch(userAction.userListUpdateAction({ data:{id,name,email,} }))
    return this.store.select('userReducer').pipe(
      withLatestFrom(this.store.select('userReducer')),
    map(([_, userReducerState]) => [userReducerState.user, userReducerState.loading, userReducerState.error, userReducerState.errorMsg])
   )

  }
  addUser(id:number, name:string, email:string):Observable<[User[], boolean, boolean, string]> {
    this.store.dispatch(userAction.userListAddAction({ data:{id:id,name:name,email:email} }))
    return this.store.select('userReducer').pipe(
      withLatestFrom(this.store.select('userReducer')),
    map(([_, userReducerState]) => [userReducerState.user, userReducerState.loading, userReducerState.error, userReducerState.errorMsg])
   )

  }
}

