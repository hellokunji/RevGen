import {combineReducers} from 'redux';
import authReducer from './reducers/auth';
import layoutReducer from './reducers/layout';
import revenueDataReducer from './reducers/revenue';

const reducer = combineReducers({
  layout: layoutReducer,
  auth: authReducer,
  revenue: revenueDataReducer,
});

export default reducer;
