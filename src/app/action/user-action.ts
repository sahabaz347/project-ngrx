import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user";

export const userListRequestAction=createAction(
    'user list request'
)
export const userListSuccessAction=createAction(
    'user list success',
    props<{ data: User[] }>()
)
export const userListErrorAction=createAction(
    'user list error',
    props<{data:string}>()
)
export const userListDeleteAction=createAction(
    'user list delete',
    props<{ id: number }>()
)
export const userListUpdateAction=createAction(
    'user list update',
    props<{ data: { id: number; name: string; email: string } }>()
)
export const userListAddAction=createAction(
    'user list add',
    props<{ data: User }>()
)