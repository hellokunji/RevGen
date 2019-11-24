import {createAction} from 'redux-actions';
import {put, takeEvery} from 'redux-saga/effects';
import {companyData} from '../../data/common';
import {
  GET_REVENUE_DATA_START,
  GET_REVENUE_DATA_REQUEST,
  GET_REVENUE_DATA_SUCCESS,
  GET_REVENUE_DATA_FAILURE,
} from '../action_types';

export const getRevenueDataStart = createAction(GET_REVENUE_DATA_START);
export const getRevenueDataRequest = createAction(GET_REVENUE_DATA_REQUEST);
export const getRevenueDataSuccess = createAction(GET_REVENUE_DATA_SUCCESS);
export const getRevenueDataFailure = createAction(GET_REVENUE_DATA_FAILURE);

//GET REVENUE DATA
function* getRevenueData(reqData) {
  yield put(getRevenueDataRequest());
  yield put(getRevenueDataSuccess(companyData));
}

export function* watchGetRevenueData() {
  yield takeEvery(GET_REVENUE_DATA_START, getRevenueData)
}
