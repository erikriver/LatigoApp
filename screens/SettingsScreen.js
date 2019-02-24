import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux';
import { accountsOperations } from '../modules/accounts';
import { transactionsOperations } from '../modules/transactions';
import { categoriesOperations } from '../modules/categories';
import { rateExchangeOperations } from '../modules/rateExchanges';
import { getRateExchanges } from '../utils/rateExchangeHelper';
import { settingsOperations } from '../modules/settings';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };


  _updateExchangeRates = () => {
    if (!this.props.rateExchanges) {
      getRateExchanges('EUR', (response) => {
        console.log(response);
      })
    } else {
      this.setState({ isReady: true });
    }
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View>
        <TouchableHighlight style={{backgroundColor: '#fff', padding: 20}} onPress={()=>{this.props.resetAccount()}}>
          <Text>Reset Accounts</Text>
        </TouchableHighlight>

        <TouchableHighlight style={{backgroundColor: '#fff', padding: 20}} onPress={() => { this.props.resetTransaction() }}>
          <Text>Reset Transactions</Text>
        </TouchableHighlight>

        <TouchableHighlight style={{backgroundColor: '#fff', padding: 20}} onPress={() => { this.props.resetCategory() }}>
          <Text>Reset Categories</Text>
        </TouchableHighlight>

        <TouchableHighlight style={{ backgroundColor: '#fff', padding: 20 }} onPress={() => { this._updateExchangeRates() }}>
          <Text>Update Rate Exchanges</Text>
        </TouchableHighlight>

        <TouchableHighlight style={{ backgroundColor: '#fff', padding: 20 }} onPress={() => { this.props.resetSettings() }}>
          <Text>Reset Settings</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    accounts: state.accounts,
    settings: state.settings,
    rateExchanges: state.rateExchanges
  }
};
export default connect(mapStateToProps, { ...accountsOperations, ...transactionsOperations, ...categoriesOperations, ...rateExchangeOperations, ...settingsOperations})(SettingsScreen);