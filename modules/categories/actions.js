import { createActions } from 'redux-actions';
import types from './types';

export const { addCategory, removeCategory, updateCategory, resetCategory} = createActions(
types.ADD,
types.REMOVE,
types.UPDATE,
types.RESET,
);
  