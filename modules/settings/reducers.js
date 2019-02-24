import { handleActions } from 'redux-actions';
import types from './types';

const initialState = {
    activeAccount: null,
    currency: 'MXN',
    isSignedIn: false,
  };
  
  const settingsReducer = handleActions({
    [types.SET_ACTIVE_ACCOUNT]: (state, { payload }) => ({
      ...state,
      activeAccount: payload,
    }),
    [types.CHANGE_CURRENCY]: (state, { payload }) => ({
      ...state,
      currency: payload,
    }),
    [types.SIGN_IN]: state => ({
      ...state,
      isSignedIn: true,
    }),
    [types.RESET]: state => state = initialState,
  }, initialState);
  
export default settingsReducer;