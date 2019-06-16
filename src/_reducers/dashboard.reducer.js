import { userConstants } from '../_constants';

export function dashboard(state = {}, action) {
  switch (action.type) {
    case userConstants.DASHBOARD_REQUEST:
      return { dashboard: true };
    case userConstants.DASHBOARD_SUCCESS:
      return {};
    case userConstants.DASHBOARD_FAILURE:
      return {};
    default:
      return state
  }
}