import { createReducer, on } from "@ngrx/store";
import * as userAction from "src/app/action/user-action";
import { User } from "src/app/models/user";
import { StoreUtility } from "../utils/store-utility";

export interface UserReducerState {
    loading: boolean;
    loaded: boolean;
    entities: { [id: number]: User }; // Update the type to match User
    ids: number[];
    error: boolean;
    errorMsg: string;
}


const initialState: UserReducerState = {
    loading: false,
    loaded: false,
    error: false,
    errorMsg: 'Error Occurred',
    entities: {}, // Update the type to match { [id: string]: User }
    ids: [],
};


export const UserReducer = createReducer(
    initialState,
    on(userAction.userListRequestAction, (state, action) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(userAction.userListSuccessAction, (state, action) => {
        const users=action.data;
        const entities=StoreUtility.normalize(users);
        const newEntities={...state.entities,...entities};
        const ids=users.map(data=>data.id);
        const newIds=StoreUtility.filterDuplicateIds([...state.ids,...ids]);
        return {
            ...state,
            ...{loaded: true,
            loading: false,
            error: false,
            entities:newEntities,
            ids:newIds
            }
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
        const id = action.id;
        const newIds = state.ids.filter(data => data !== id);
        const newEntities = StoreUtility.removeKey(state.entities, id)
        return {
            ...state,
            ...{  entities:newEntities,ids:newIds }
        }
    }),

    on(userAction.userListUpdateAction, (state, action) => {
        const user = action.data;
        const entity = { [user.id]: user };
        const updateUsers = { ...state.entities, ...entity };

       
        return {
            ...state,
            ...{ entities: updateUsers }

        }
    }),
    on(userAction.userListAddAction, (state, action) => {
        const user = action.data;
        const entity = { [user.id]: user };
        const newEntities = { ...state.entities, ...entity }
        const newIds = StoreUtility.filterDuplicateIds([...state.ids, user.id])
        return { ...state, ...{ entities: newEntities, ids: newIds } }
        
    })
)

