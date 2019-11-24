import {all} from 'redux-saga/effects';
import {
  watchFacebookSignIn,
  watchLogout,
} from './actions/auth';
import {
  watchGetRevenueData
} from './actions/revenue';

export default function* rootSaga() {
  yield all([
    watchFacebookSignIn(),
    watchGetRevenueData(),
    watchLogout(),
  ])
}
