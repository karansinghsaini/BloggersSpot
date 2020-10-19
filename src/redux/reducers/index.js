import { combineReducers} from 'redux';
import { userReducer } from './userReducer';
import {blogReducer} from './blogsReducer';
import {UserProfile} from './UserProfile';
import {votesReducer} from './votesReducer';
import {commentReducer} from './commentReducer';

const rootReducer = combineReducers({
    userReducer,
    blogReducer,
    UserProfile,
    votesReducer,
    commentReducer
});

export default rootReducer;