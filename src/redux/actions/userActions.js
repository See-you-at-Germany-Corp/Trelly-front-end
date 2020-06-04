import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER,
  } from '../types';

  export const getUserData = () => (dispatch) => {
      dispatch({ type: LOADING_USER})
      //API getData
  }