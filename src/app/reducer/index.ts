import { ActionReducerMap, createSelector } from "@ngrx/store";
import * as fromUserReducer from "./user-reducer";

export interface RootReducerState{
    userReducer:fromUserReducer.UserReducerState
}
export const rootReducer:ActionReducerMap<RootReducerState>={
    userReducer:fromUserReducer.UserReducer
}
//selector
// export const getUserState=(state:RootReducerState)=>{state.userReducer};
// export const getUserLoading=createSelector(getUserState,(state)=>fromUserReducer.getLoading)
// export const getUserLoaded=createSelector(getUserState,(state)=>fromUserReducer.getLoaded)
// export const getUsers=createSelector(getUserState,(state)=>fromUserReducer.getUsers)

