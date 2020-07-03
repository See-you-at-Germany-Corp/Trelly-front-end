import { combineReducers } from "redux";

import loggedIn from "./login";
import createNewBoard from "./createNewBoard.js";
import personalBoardList from "./personalBoardList.js";
import starredBoardList from "./starredBoardList.js";
import dataProfile from "./dataProfile.js";

export default combineReducers({
  loggedIn,
  createNewBoard,
  personalBoardList,
  starredBoardList,
  dataProfile,
});
