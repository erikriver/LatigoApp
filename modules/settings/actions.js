import { createActions } from 'redux-actions';
import types from './types';

export const { setActiveAccount, changeCurrency, signIn, resetSettings} = createActions(
    types.SET_ACTIVE_ACCOUNT,
    types.CHANGE_CURRENCY,
    types.SIGN_IN,
    types.RESET
);
  