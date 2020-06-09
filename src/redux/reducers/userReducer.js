
const initialState = {
  fullName: "",
  initials: "",
  userName: "",
  bio: "",
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
