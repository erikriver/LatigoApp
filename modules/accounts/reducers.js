import { handleActions } from 'redux-actions';
import { insert, insertAll, update, removeId,  getById} from '../../utils/stateHelper';
import types from './types';
import AccountTypes from '../../constants/AccountTypes';
import Currency from '../../constants/Currency';
import { iOSColors } from 'react-native-typography';

const createAccount = (props) => {
    const {
      name,
      initialBalance = 0,
      initialDate = new Date(),
      balance = 0,
      color = 'blue',
      excludedFromTotal = false,
      icon = 'wallet',
      currency = Currency.MXN.code,
      type = AccountTypes.Default
    } = props;
  
    return {
      name, initialBalance, initialDate, color, balance, excludedFromTotal, icon, type, currency
    };
  };

const defaultAccounts = [
  createAccount({ name: 'Efectivo', color: iOSColors.yellow, excludedFromTotal: false, icon: '015cash', type: AccountTypes.Default, initialBalance: 10000}),
  createAccount({ name: 'Tarjeta de credito', color: iOSColors.orange, excludedFromTotal: false, icon: '005visa', type: AccountTypes.Credit, initialBalance: 2500 }),
  createAccount({ name: 'Debito', color: iOSColors.green, excludedFromTotal: true, icon: '011save', type: AccountTypes.Saving, initialBalance: 5200 }),
];
  
const initialState = insertAll({}, defaultAccounts);

const accountsReducer = handleActions({
[types.ADD]: (state, { payload }) => insert(state, createAccount({
    ...payload,
    balance: payload.initialBalance,
})),
[types.GET]:(state, { payload }) => getById(state, payload),
[types.UPDATE]: (state, { payload }) => update(state, payload.id, payload),
[types.REMOVE]: (state, { payload }) => removeId(state, payload),
[types.RESET]: state => state = initialState,
}, initialState);

export default accountsReducer;