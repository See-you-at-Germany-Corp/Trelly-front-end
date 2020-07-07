const initialState = {
    id: null,
    fullname: "",
    init: "",
    username: "",
    bio: "",
    picture: "",
  };
  
  export default(state = initialState, action) => {
    switch (action.type) {
      case "SUBMIT": 
        return action.state;
        
      case "SET_DATA":
        return action.state;
        
      default:
        return state;
    }
  };
  
