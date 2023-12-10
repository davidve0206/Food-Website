import * as ACTION_TYPES from "../../utils/action_types"

export function login(data) {
  return {
    type: ACTION_TYPES.LOGIN,
    username: data.username,
    token: data.token,
  };
}

export function logout() {
  return {
    type: ACTION_TYPES.LOGOUT,
  };
}