import { ActionReducerMap, createSelector } from "@ngrx/store";
import * as fromUserReducer from "./user-reducer";
import * as fromPostReducer from "./post-reducer";


export interface RootReducerState{
    userReducer:fromUserReducer.UserReducerState
    postReducer:fromPostReducer.PostReducerState

}
export const rootReducer:ActionReducerMap<RootReducerState>={
    userReducer: fromUserReducer.UserReducer,
    postReducer: fromPostReducer.PostReducer
}
//selector
// export const getUserState=(state:RootReducerState)=>{state.userReducer};
// export const getUserLoading=createSelector(getUserState,(state)=>fromUserReducer.getLoading)
// export const getUserLoaded=createSelector(getUserState,(state)=>fromUserReducer.getLoaded)
// export const getUsers=createSelector(getUserState,(state)=>fromUserReducer.getUsers)

