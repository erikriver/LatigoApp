import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Switch,
  KeyboardAvoidingView
} from 'react-native';
import { RoundedButton, CurrencyPicker, DefaultPanel, CalculatorInput, AvenirText, IconPicker, Icon} from '../../components';
import { accountsOperations } from '../../modules/accounts';
import { categoriesOperations } from '../../modules/categories';
import { connect } from 'react-redux';
import AccountTypes from '../../constants/AccountTypes';
import screens from '../../constants/screens';

const defaultAccountData = {
  name: '',
  icon: '',
  initialBalance: 0,
  currency: 'MXN',
  excludedFromTotal: false,
  
}
class AccountDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
      return{
        headerTitle: navigation.state.params.id? 'Editar Cuenta' : 'Agregar Cuenta',
        headerRight: null
      }
    };
  
    constructor(props) {
      super(props);

      if(this.props.navigation.state.params.id){
        var account = this.props.accounts.list[this.props.navigation.state.params.id];
        this.state = account
      }else{
        this.state = {...defaultAccountData, type: this.props.navigation.state.type || AccountTypes.Default}
      }
    }

    _submitForm = ()=>{
      if (this.state.name && this.state.icon) {
        let savingAccount = {
          ...this.state
        };
        if (this.state.id) {
          this.props.updateAccount(savingAccount);
          //TODO: Add new transaction to change balance
        } else {
          savingAccount.balance = this.state.initialBalance;
          this.props.addAccount(savingAccount);
        }
        this.props.navigation.navigate(screens.AccountSuccess, {
          account: savingAccount
        });
      }
    }

    render() {
      return (
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
          <ScrollView style={styles.container}>
            <DefaultPanel containerStyle={{flex: 1}} notitle="true">
              <View style={styles.row}>
                <View style={styles.iconInput}>
                  <IconPicker icon={this.state.icon} onSelect={(icon) => { this.state.icon = icon}}></IconPicker>
                </View>
                <View style={{flex: 1}}>
                  <TextInput
                    placeholder="Account Name"
                    style={styles.nameInput}
                    onChangeText={(text) => this.setState({  name: text })}
                    value={this.state.name}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={{alignItems:'center', justifyContent: 'center'}}>
                  <View style={styles.currencySymbol}>
                    <Icon.Foundation name="dollar" color="#fff" size={22}/>
                  </View>
                </View>
                <View style={{flex: 1}}>
                  <CurrencyPicker value={this.state.currency} onChange={(value) => {this.setState({currency:value})}}></CurrencyPicker>
                </View>
              </View>
              <View style={{...styles.row, display: this.state.id?'none':'flex'}}>
                <View style={{flex: 1}}>
                  <AvenirText style={styles.balanceLabel}>Initial Balance</AvenirText>
                  <View style={styles.balanceInput}>
                    <CalculatorInput
                      placeholder="0"
                      onChange={(value) => this.setState({ initialBalance: value })}
                      value={this.state.initialBalance}
                    />
                  </View>
                </View>
              </View>
              <View style={{...styles.row, display: this.state.id ?'flex':'none'}}>
                <View style={{flex: 1}}>
                  <AvenirText style={styles.balanceLabel}>Current Balance</AvenirText>
                  <View style={styles.balanceInput}>
                    <CalculatorInput
                      placeholder="0"
                      style={styles.balanceInput}
                      onChange={(value) => this.setState({ balance: value })}
                      value={this.state.balance}
                    />
                  </View>
                </View>
              </View>
              <View style={[styles.row, {marginTop: 10}]}>
                <View style={styles.sumTotalRow}>
                  <AvenirText style={styles.sumToTotalLabel}>Excluded from Total</AvenirText>
                  <Switch value={this.state.excludedFromTotal} onValueChange={(value)=> {this.setState({excludedFromTotal: value})}}></Switch>
                </View>
              </View>
            </DefaultPanel>
          </ScrollView>
          <RoundedButton style={styles.button} onPress={this._submitForm}>Save</RoundedButton>
        </KeyboardAvoidingView>
      );
    }
  }

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
    settings: state.settings
  }
};
export default connect(mapStateToProps, {...accountsOperations,...categoriesOperations})(AccountDetailScreen);
const borderColor = '#efefef';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderTopColor: borderColor,
    borderTopWidth: 1,
  },
  iconInput: {
    borderRightWidth: 1,
    borderRightColor: borderColor,
    width: 80
  },
  blankColumn: {
    width: 80
  },
  nameInput: {
    flex: 1,
    height: 60,
    fontSize: 20,
    marginLeft: 10,
  },
  balanceLabel: {
    color: '#ccc',
    marginLeft: 15,
    marginTop: 10
  },
  balanceInput: {
    flex: 1,
    paddingLeft: 10,
  },
  summaryRow: {
    marginTop: 40,
    marginBottom: 30
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 44,
    padding: 6,
    backgroundColor: 'rgba(255,255,255,.8)',
    marginRight: 10
  },
  icon: {
    width: 32,
    height: 32
  },
  currencySymbol: {
    backgroundColor: '#757575',
    borderRadius: 30,
    width: 24,
    height: 24,
    marginLeft: 15,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  sumToTotalLabel: {
    fontSize: 16,
    paddingTop: 5,
  },
  sumTotalRow: {
    padding: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
  },
  button: {
    marginTop: 20
  }
});
