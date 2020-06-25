const initialState = {
    fullName: "",
    initials: "",
    userName: "",
    bio: "",
    picture: "",
    // loading: false,
    // error: {},
  };
  
  const DataProfile = (state = initialState, action) => {
    switch (action.type) {
      case "SUBMIT":
        return action.state;
        // loading: true,
        // error: {},
      // case "CHANGEPICTURE":
      //   state = {
      //     ...state,
      //     picture: action.picture
      //   }
      default:
        return state;
    }
  };
  
  export default DataProfile;