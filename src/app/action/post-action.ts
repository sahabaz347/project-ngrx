import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/models/post";

export const postListRequestAction = createAction(
    'post list request'
)
export const postListSuccessAction = createAction(
    'post list success',
    props<{ data: Post[] }>()
)
export const postListErrorAction = createAction(
    'post list error',
    props<{ data: string }>()
)
export const postListDeleteAction = createAction(
    'post list delete',
    props<{ id: number, postId: number }>()
)
export const postListUpdateAction = createAction(
    'post list update',
    props<{ data: { id: number; title: string; comments: any } }>()
)
export const postListAddAction = createAction(
    'post list add',
    props<{ data:Post}>()
)
export const commentDeleteAction = createAction(
    'comment delete',
    props<{ id: number, postId: number }>()
)
export const commentUpdateAction = createAction(
    'comment update',
    props<{ data: { id: number, description: string }, postId: number }>()
)
export const commentAddAction = createAction(
    'comment add',
    props<{ postId: number, data: { id: number, description: string } }>()
)