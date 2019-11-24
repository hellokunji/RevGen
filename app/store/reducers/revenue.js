import ip from 'icepick';
import {
  GET_REVENUE_DATA_REQUEST,
  GET_REVENUE_DATA_SUCCESS,
  GET_REVENUE_DATA_FAILURE,
  RESET_REVENUE_DATA
} from '../action_types';

const initialState = ip.freeze({
  revenueData: {
    apiStatus: null,
    apiError: null,
    data: null
  },
});

export default function (state = initialState, action) {
  switch (action.type) {

    case GET_REVENUE_DATA_REQUEST: {
      state = ip.setIn(state, ['revenueData', 'apiStatus'], 'started');
      state = ip.setIn(state, ['revenueData', 'apiError'], null);
      return state;
    }

    case GET_REVENUE_DATA_SUCCESS: {
      state = ip.setIn(state, ['revenueData', 'apiStatus'], 'success');
      state = ip.setIn(state, ['revenueData', 'apiError'], null);
      state = ip.setIn(state, ['revenueData', 'data'], action.payload);
      return state;
    }

    case GET_REVENUE_DATA_FAILURE: {
      state = ip.setIn(state, ['revenueData', 'apiStatus'], 'failure');
      state = ip.setIn(state, ['revenueData', 'apiError'], action.payload);
      return state;
    }

    case RESET_REVENUE_DATA: {
      state = ip.setIn(state, ['revenueData'], initialState.revenueData);
      return state;
    }

    default:
      return state;
  }
}
