import { createActions } from 'redux-actions';
import types from './types';

export const { addPlan, removePlan, updatePlan, resetPlan} = createActions(
types.ADD,
types.REMOVE,
types.UPDATE,
types.RESET,
);
  