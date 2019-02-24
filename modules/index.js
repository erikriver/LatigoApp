import AsyncStorage from 'redux-persist/es/storage';
import { persistCombineReducers } from 'redux-persist';
import accounts from './accounts';
import settings from './settings';
import categories from './categories';
import transactions from './transactions';
import rateExchanges from './rateExchanges';

const config = {
    key: 'root',
    whitelist: [
      'settings',
      'accounts',
      'categories',
      'transactions',
      // 'transfers',
      'rateExchanges',
    ],
    storage: AsyncStorage,
  };

  
const appReducer = {
  accounts,
  settings,
  categories, 
  transactions,
  // transfers,
  rateExchanges
};

export default persistCombineReducers(config, appReducer);