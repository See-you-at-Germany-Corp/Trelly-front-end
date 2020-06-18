import { combineReducers } from 'redux';

import loggedIn from './login' 
import createNewBoard from './createNewBoard.js';
import personalBoardList from './personalBoardList.js'; 
import starredBoardList from './starredBoardList.js'; 

export default combineReducers ({
    loggedIn,
    createNewBoard,
    personalBoardList, 
    starredBoardList, 
});