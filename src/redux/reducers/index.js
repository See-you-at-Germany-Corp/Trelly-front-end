import { combineReducers } from 'redux';

import logedIn from './login'
import personalBoardList from './personalBoardList.js';

export default combineReducers ({
    logedIn,
    personalBoardList
});