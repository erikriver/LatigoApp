import { createActions } from 'redux-actions';
import types from './types';

export const { addDebtLoan, removeDebtLoan, updateDebtLoan, resetDebtLoan} = createActions(
types.ADD,
types.REMOVE,
types.UPDATE,
types.RESET,
);
  