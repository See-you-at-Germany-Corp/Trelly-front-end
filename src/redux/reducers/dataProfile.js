const initialState = {
    fullname: "TestFullName",
    init: "TF",
    username: "userTF",
    bio: "lol",
    picture: "",

  };
  
  export default(state = initialState, action) => {
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
      case "SET_DATA":
        console.log(action.state);
        return action.state;
      default:
        return state;
    }
  };
  
