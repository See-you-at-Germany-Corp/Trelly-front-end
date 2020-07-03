import axios from 'axios';
import {useAuthen} from '../../api/index';
// const authenHeader = useAuthen();
//   axios.get("https://mighty-lowlands-07946.herokuapp.com/profile/my_profile/",authenHeader).then((res) => {
//     console.log(res.data);
    


const initialState = {
    fullName: "TestFullName",
    initials: "TF",
    userName: "userTF",
    bio: "lol",
    picture: "s.png",

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
      default:
        return state;
    }
  };
  
