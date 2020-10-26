// eslint-disable-next-line no-unused-vars
const reducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const loginUser = (user) => {
  return dispatch => {
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const logoutUser = () => {
  return dispatch => {
    dispatch({
      type:'LOGOUT'
    })
  }
}

export default reducer