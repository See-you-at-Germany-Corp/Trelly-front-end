// import {
//   SET_USER,
//   SET_ERRORS,
//   CLEAR_ERRORS,
//   LOADING_UI,
//   SET_UNAUTHENTICATED,
//   LOADING_USER,
// } from '../types';

const initialState = {
  fullName: "Madusa",
  initials: "Sniper",
  userName: "Riki",
  bio: "Pudge",
  //picture
  // loading: false,
  // error: {},
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SUBMIT":
      return action.state;
      // loading: true,
      // error: {},
    case "CHANGEAVATAR":
      return 
      {
      }
    default:
      return state;
  }
};

export default UserReducer;

// export const getUserData = () => (dispatch) => {
//   //dispatch({ type: LOADING_USER})
//   //API getData
// }
