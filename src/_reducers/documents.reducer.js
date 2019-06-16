import { userConstants } from '../_constants';

const initialState = documents ? { loggedIn: true, documents } : {};
export function documents(state = initialState, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true,
        Docitems: action.documents
      };
    case userConstants.GETALL_SUCCESS:
      return {
        loggedIn: true,
        Docitems: action.documents
      
      };
    case userConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}