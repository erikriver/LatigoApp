
import AccountChooserScreen from '../../screens/accounts/AccountChooserScreen';
import AccountTypeChooserScreen from '../../screens/accounts/AccountTypeChooserScreen';
import AccountDetailScreen from '../../screens/accounts/AccountDetailScreen';
import AccountSuccessScreen from '../../screens/accounts/AccountSuccessScreen';
import screens from '../../constants/screens';

export default {
    [screens.AccountChooser]: AccountChooserScreen,
    [screens.AccountType]: AccountTypeChooserScreen,
    [screens.AccountDetail]: AccountDetailScreen,
    [screens.AccountSuccess]: AccountSuccessScreen,
}
