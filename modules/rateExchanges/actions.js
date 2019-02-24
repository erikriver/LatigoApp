import { createActions } from 'redux-actions';
import types from './types';

export const { updateRateExchange, resetRateExchange } = createActions(
    types.UPDATE,
    types.RESET,
);
  