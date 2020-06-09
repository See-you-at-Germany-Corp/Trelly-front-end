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
  // loading: false,
  // error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SUBMIT":
      return {
        ...state,
        fullName: action.fullName,
        initials: action.initials,
        userName: action.userName,
        bio: action.bio,
        // loading: true,
        // error: {},
      };
      break;

    default:
      return state;
  }
};

// export const getUserData = () => (dispatch) => {
//   //dispatch({ type: LOADING_USER})
//   //API getData
// }
