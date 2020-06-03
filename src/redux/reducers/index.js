import { combineReducers } from 'redux';

import personalBoardList from './personalBoardList.js';
import starredBoardList from './starredBoardList.js';

export default combineReducers ({
    personalBoardList,
    starredBoardList
});