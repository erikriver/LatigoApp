import AccountChooserScreen from '../../screens/accounts/AccountChooserScreen';
import TransactionDetailScreen from '../../screens/transactions/TransactionDetailScreen';

import CurrencyPickerScreen from '../../screens/includes/CurrencyPickerScreen';
import CalculatorScreen from '../../screens/includes/CalculatorScreen';
import IconPickerScreen from '../../screens/includes/IconPickerScreen';
import screens from '../../constants/screens';

export default {
    [screens.TransactionDetail]: TransactionDetailScreen,
    [screens.AccountChooser]: AccountChooserScreen,
    [screens.CurrencyPicker]: CurrencyPickerScreen,
    [screens.Calculator]: CalculatorScreen,
    [screens.IconPicker]: IconPickerScreen,
}
