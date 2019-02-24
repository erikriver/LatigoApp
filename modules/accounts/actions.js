import { createActions } from 'redux-actions';
import types from './types';

export const { addAccount, removeAccount, updateAccount, getAccount, resetAccount} = createActions(
types.ADD,
types.REMOVE,
types.UPDATE,
types.GET,
types.RESET,
);
  