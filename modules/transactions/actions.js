import { createActions } from 'redux-actions';
import types from './types';

export const { addTransaction, removeTransaction, updateTransaction, resetTransaction} = createActions(
types.ADD,
types.REMOVE,
types.UPDATE,
types.RESET,
);
  