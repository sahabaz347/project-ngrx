import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/reducer';
import * as userAction from 'src/app/action/user-action';
import { Observable, Subject, catchError, map, of, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { User } from '../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { StoreUtility } from "../utils/store-utility";
import { Post } from '../models/post';
import * as postAction from 'src/app/action/post-action';
import { PostReducer } from '../reducer/post-reducer';




@Injectable({
  providedIn: 'root'
})
export class YoutubeRepoService {
  users = new Subject<User[]>();
  posts = new Subject<Post[]>();
  constructor(private apiService: ApiService, private store: Store<RootReducerState>) { }

  getUserData(force = false): Observable<[User[], boolean, boolean, string]> {
    return this.store.select('userReducer').pipe(
      take(1), // Take only one emission
      switchMap(res => {
        if ((!res.loading && !res.loaded) || force) {
          this.store.dispatch(userAction.userListRequestAction());
          return this.apiService.getAllUser().pipe(
            map(res => this.store.dispatch(userAction.userListSuccessAction({ data: res }))),
            catchError((error: HttpErrorResponse) => of(this.store.dispatch(userAction.userListErrorAction({ data: error.message }))))
          );
        }
        return of(null); // No need to make an API call
      }),
      withLatestFrom(this.store.select('userReducer')),
      map(([_, userReducerState]) => [StoreUtility.unNormalize(userReducerState.entities), userReducerState.loading, userReducerState.error, userReducerState.errorMsg])
    );
  }

  deleteUser(id: number): Observable<[User[], boolean, boolean, string]> {
    this.store.dispatch(userAction.userListDeleteAction({ id }))
    return this.store.select('userReducer').pipe(
      withLatestFrom(this.store.select('userReducer')),
      map(([_, userReducerState]) => [StoreUtility.unNormalize(userReducerState.entities), userReducerState.loading, userReducerState.error, userReducerState.errorMsg])
    )

  }
  updateUser(id: number, name: string, email: string): Observable<[User[], boolean, boolean, string]> {
    this.store.dispatch(userAction.userListUpdateAction({ data: { id, name, email, } }))
    return this.store.select('userReducer').pipe(
      withLatestFrom(this.store.select('userReducer')),
      map(([_, userReducerState]) => [StoreUtility.unNormalize(userReducerState.entities), userReducerState.loading, userReducerState.error, userReducerState.errorMsg])
    )

  }
  addUser(id: number, name: string, email: string): Observable<[User[], boolean, boolean, string]> {
    this.store.dispatch(userAction.userListAddAction({ data: { id: id, name: name, email: email } }))
    return this.store.select('userReducer').pipe(
      withLatestFrom(this.store.select('userReducer')),
      map(([_, userReducerState]) => [StoreUtility.unNormalize(userReducerState.entities), userReducerState.loading, userReducerState.error, userReducerState.errorMsg])
    )

  }
  getUserById(id: number, force = false) {
    return this.store.select('userReducer').pipe(
      take(1),
      switchMap(res => {
        if (force || !res.entities[id]) {
          return this.apiService.getsinglePost(id).pipe(
            map(res => this.store.dispatch(userAction.userListAddAction({ data: res }))),
            catchError((error: HttpErrorResponse) => of(this.store.dispatch(userAction.userListErrorAction({ data: error.message }))))
          );
        }
        return of(null); // No need to make an API call
      }),
      withLatestFrom(this.store.select('userReducer')),
      map(([_, userReducerState]) => [StoreUtility.getUniqueUser(id, userReducerState.entities)])
    );
  }
  getPostData(force = false): Observable<[Post[], boolean, boolean, string]> {
    return this.store.select('postReducer').pipe(
      take(1),
      switchMap(res => {
        if ((!res.loading && !res.loaded) || force) {
          this.store.dispatch(postAction.postListRequestAction());
          return this.apiService.getAllPost().pipe(
            map(res => this.store.dispatch(postAction.postListSuccessAction({ data: res }))),
            catchError((error: HttpErrorResponse) => of(this.store.dispatch(postAction.postListErrorAction({ data: error.message }))))
          );
        }
        return of(null);
      }),
      withLatestFrom(this.store.select('postReducer')),
      map(([_, postReducerState]) => [StoreUtility.unNormalize(postReducerState.entities), postReducerState.loading, postReducerState.error, postReducerState.errorMsg])
    )
  }
  deletePost(id: number, postId: number): Observable<[Post[], boolean, boolean, string]> {
    this.store.dispatch(postAction.commentDeleteAction({ id, postId }))
    return this.store.select('postReducer').pipe(
      withLatestFrom(this.store.select('postReducer')),
      map(([_, postReducerState]) => [StoreUtility.unNormalize(postReducerState.entities), postReducerState.loading, postReducerState.error, postReducerState.errorMsg])

    )
  }
  addComment(postId: number, id: number, com: string) {
    this.store.dispatch(postAction.commentAddAction({ data: { id: id, description: com }, postId: postId }))
    return this.store.select('postReducer').pipe(
      withLatestFrom(this.store.select('postReducer')),
      map(([_, postReducerState]) => [StoreUtility.unNormalize(postReducerState.entities), postReducerState.loading, postReducerState.error, postReducerState.errorMsg])

    )
  }
  updateComment(des: string, id: number, postId: number) {
    this.store.dispatch(postAction.commentUpdateAction({ data: { id: id, description: des }, postId: postId }))
    return this.store.select('postReducer').pipe(
      withLatestFrom(this.store.select('postReducer')),
      map(([_, postReducerState]) => [StoreUtility.unNormalize(postReducerState.entities), postReducerState.loading, postReducerState.error, postReducerState.errorMsg])

    )
  }
  addPost(data: string, postId: number) {
    this.store.dispatch(postAction.postListAddAction({ data: { id: postId, title: data, comments: [] } }))
    return this.store.select('postReducer').pipe(
      withLatestFrom(this.store.select('postReducer')),
      map(([_, postReducerState]) => [StoreUtility.unNormalize(postReducerState.entities), postReducerState.loading, postReducerState.error, postReducerState.errorMsg])

    )
  }
}

