import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { dashboard } from './dashboard.reducer';
import { users } from './users.reducer';
import {profile} from './profile.reducer';
import {documents} from './documents.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  dashboard,
  profile,
  documents
});

export default rootReducer;