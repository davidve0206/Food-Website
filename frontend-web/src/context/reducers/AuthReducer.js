import * as ACTION_TYPES from "../../utils/action_types"

function setInitialState() {
  if (localStorage.getItem("authState")) {
    return JSON.parse(localStorage.getItem("authState"));
  } else {
    return {
      isAuth: false,
      username: "",
      token: "",
    };
  }
}

export const initialState = setInitialState()

export function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.LOGIN:
      
      state = {
        isAuth: true,
        username: action.username,
        token: action.token,
      };  
        
      localStorage.setItem("authState", JSON.stringify(state))

      return state;

    case ACTION_TYPES.LOGOUT:
      
      state = {
        isAuth: false,
        username: "",
        token: "",
      }

      localStorage.removeItem("authState")

      return state;
      
    default:
      return state;
  }
}