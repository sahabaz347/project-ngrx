import { createReducer, on } from "@ngrx/store";
import * as postAction from "src/app/action/post-action";
import { Post } from "src/app/models/post";
import { StoreUtility } from "../utils/store-utility";

export interface PostReducerState {
    loading: boolean;
    loaded: boolean;
    entities: { [id: number]: Post };
    // Update the type to match post
    ids: number[];
    error: boolean;
    errorMsg: string;
}


const initialState: PostReducerState = {
    loading: false,
    loaded: false,
    error: false,
    errorMsg: '',
    entities: {}, // Update the type to match { [id: string]: post }
    ids: [],
};


export const PostReducer = createReducer(
    initialState,
    on(postAction.postListRequestAction, (state, action) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(postAction.postListSuccessAction, (state, action) => {
        const posts = action.data;
        const entities = StoreUtility.normalize(posts);
        const newEntities = { ...state.entities, ...entities };
        const ids = posts.map(data => data.id);
        const newIds = StoreUtility.filterDuplicateIds([...state.ids, ...ids]);
        return {
            ...state,
            ...{
                loaded: true,
                loading: false,
                error: false,
                entities: newEntities,
                ids: newIds
            }
        }
    }),
    on(postAction.postListErrorAction, (state, action) => {
        return {
            ...state,
            error: true,
            errorMsg: action.data
        }
    }),
    on(postAction.postListDeleteAction, (state, action) => {
        const id = action.id;
        const newIds = state.ids.filter(data => data !== id);
        const newEntities = StoreUtility.removeKey(state.entities, id)
        return {
            ...state,
            ...{ entities: newEntities, ids: newIds }
        }
    }),

    on(postAction.postListUpdateAction, (state, action) => {
        const post = action.data;
        const entity = { [post.id]: post };
        const updatePosts = { ...state.entities, ...entity };
        return {
            ...state,
            ...{ entities: updatePosts }
        }
    }),
    on(postAction.postListAddAction, (state, action) => {
        const post = action.data;
        const entity = { [post.id]: post };
        const newEntities = { ...state.entities, ...entity }
        const newIds = StoreUtility.filterDuplicateIds([...state.ids, post.id])
        return {
            ...state,
            ...{ entities: newEntities, ids: newIds }
        }

    }),
    on(postAction.commentAddAction, (state, action) => {
        const postId = action.postId;
        const comment = action.data;
        const oldPost: Post = JSON.parse(JSON.stringify(state.entities[postId]));
        oldPost.comments.push(comment);
        const obj = { [postId]: oldPost };
        const entities = { ...state.entities, ...obj };
        return { ...state, ...{ entities } }
    }),
    on(postAction.commentDeleteAction, (state, action) => {
        const postId = action.postId;
        const id = action.id;
        const oldPost: Post = JSON.parse(JSON.stringify(state.entities[postId]));
        const updateCommets = oldPost.comments.filter(data => data.id !== id);
        oldPost.comments = updateCommets
        const obj = { [postId]: oldPost };
        const entities = { ...state.entities, ...obj };
        return { ...state, ...{ entities } }
    }),
    on(postAction.commentUpdateAction, (state, action) => {
        const postId = action.postId;
        const comment = action.data;
        const oldPost: Post = JSON.parse(JSON.stringify(state.entities[postId]));
        const updateCommets = oldPost.comments.filter(data => data.id !== comment.id);
        updateCommets.push(comment);
        oldPost.comments = updateCommets;
        const obj = { [postId]: oldPost };
        const entities = { ...state.entities, ...obj };
        return { ...state, ...{ entities } }
    })
)

