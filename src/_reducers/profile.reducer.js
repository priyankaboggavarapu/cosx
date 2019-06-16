import { userConstants } from '../_constants';
const initialState = profile ? { loggedIn: true, profile } : {};
export function profile(state = initialState, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true,
        items: action.profile
      };
    case userConstants.GETALL_SUCCESS:
      return {
        loading: true,
        items: action.profile
      };
    case userConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}