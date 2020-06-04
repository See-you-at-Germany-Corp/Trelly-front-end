import { combineReducers } from 'redux';

import loggedIn from './login'
import personalBoardList from './personalBoardList.js';

export default combineReducers ({
    loggedIn,
    personalBoardList
});