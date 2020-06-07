import { combineReducers } from 'redux';

import personalBoardList from './personalBoardList.js'; 
import createNewBoard from './createNewBoard.js'; 

export default combineReducers ({
    personalBoardList,
    createNewBoard, 
});