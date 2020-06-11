import { combineReducers } from 'redux';

import loggedIn from './login' 
import createNewBoard from './createNewBoard.js';
import personalBoardList from './personalBoardList.js';

export default combineReducers ({
    loggedIn,
    createNewBoard,
    personalBoardList
});