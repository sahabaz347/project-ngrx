import { createReducer, on } from "@ngrx/store";
import * as userAction from "src/app/action/user-action";
import { User } from "src/app/models/user";

export interface UserReducerState {
    loading: boolean;
    loaded: boolean;
    user: User[];
    error: boolean;
    errorMsg: string;
    length: number;
}

const initialState: UserReducerState = {
    loading: false,
    loaded: false,
    user: [],
    error: false,
    errorMsg: 'Error Occured',
    length: 0
}

export const UserReducer = createReducer(
    initialState,
    on(userAction.userListRequestAction, (state, action) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(userAction.userListSuccessAction, (state, action) => {
        const updateUser = action.data
        return {
            ...state,
            loaded: true,
            loading: false,
            error: false,
            user: updateUser,
            length: updateUser.length + 1
        }
    }),
    on(userAction.userListErrorAction, (state, action) => {
        return {
            ...state,
            error: true,
            errorMsg: action.data
        }
    }),
    on(userAction.userListDeleteAction, (state, action) => {
        const user = state.user.filter(data => data.id !== action.id)
        return {
            ...state, ...{ user: user }
        }
    }),
    on(userAction.userListUpdateAction, (state, action) => {
        const user = state.user[action.data.id];
        const updatedUser = {
            ...user, ...action.data
        }
        const updatedUsers = [...state.user];
        for (let index = 0; index < updatedUsers.length; index++) {
            updatedUsers[index].id == action.data.id ? updatedUsers[index] = updatedUser : '';
        }
        return {
            ...state,
            user: updatedUsers

        }
    }),
    on(userAction.userListAddAction, (state, action) => {
        const newUser=state.user.concat(action.data)
        return {
            ...state,...{user:newUser}
        }
    })
)
//selector
// export const getLoading=(state:UserReducerState)=>{state.loading}
// export const getLoaded=(state:UserReducerState)=>{state.loaded}
// export const getUsers=(state:UserReducerState)=>{state.user}
