const LOGIN = 'handleLogin_LOGIN'
const LOGOUT = 'handleLogin_LOGOUT'

export const isLogin = (status) => {
  return { type: LOGIN, status }
};

export const isLogout = (status) => {
  return { type: LOGOUT, status }
};

const initialState = {
  isLogin: false
}

function handleLogin(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        isLogin: action.status
      }
    case LOGOUT:
      return {
        isLogout: action.status
      }
    default:
      return state
  }
}

export default handleLogin