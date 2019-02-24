import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity} from 'react-native';
import { Icon, AccountButton, ViewWithTitle, DefaultPanel, AccountStatistics, LoanTransactions, DebtTransactions, AccountRow, Separator, DebtLoanRow, ContactModal} from '../components';
import Colors from '../constants/Colors';
import { connect } from 'react-redux';
import { accountsOperations } from '../modules/accounts';
import { getAccountList } from "../utils/accountHelper";
import screens from '../constants/screens';
import Layout from '../constants/Layout';
import { getListDebt, getListLoan } from '../utils/transactionHelper';
import { dateFormat } from '../utils/dateHelper';
import moment from 'moment';
import { settingsOperations } from '../modules/settings';

class HomeScreen2 extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: true,
    }
  };
  constructor(props) {
    super(props);

    this.state = {
      accounts : getAccountList(this.props.accounts),
      loans :  getListLoan(this.props.transactions),
      debts :  getListDebt(this.props.transactions),
      showContact: null
    }
  }

  _debtLoanPressed = (item) => {
    if(item.contact){
      this.setState({showContact: item.contact});
    }
  }

  _goToTransactionScreen = (accountId) => {
    this.props.setActiveAccount(accountId);
    this.props.navigation.navigate(screens.History);
  }

  render() {
    return (
      <ViewWithTitle title="Balance" subTitle={dateFormat(moment(), 'dddd, DD MMMM')}>
        <View style={{paddingBottom: Layout.bottomOffset}}>
          <AccountStatistics accounts={this.state.accounts} transactions={this.props.transactions}></AccountStatistics>
          <DefaultPanel 
            title="Cuentas" 
            largeHeader 
            rightComponent={<TouchableOpacity onPress={() => { this.props.navigation.navigate(screens.AccountType) }}><Icon.AntDesign name="plus" color={Colors.mainColor} size={24}/></TouchableOpacity>}
          >
            <FlatList
              data={this.state.accounts}
              renderItem={({ item }) => (<AccountRow onPress={()=> this._goToTransactionScreen(item.id)} key={item.id} account={item} />)}
              keyExtractor={(item) => 'account_' + item.id}
              ItemSeparatorComponent={({ leadingItem }) => leadingItem ? (<Separator left={ 75 }/>) : null}
            />
          </DefaultPanel>
          {
            this.state.loans.results.length > 0 && (
                <DefaultPanel
                    title={"Prestamos"}
                    largeHeader 
                    rightComponent={<TouchableOpacity onPress={() => { this.props.navigation.navigate(screens.AccountType) }}><Icon.AntDesign name="plus" color={Colors.mainColor} size={24}/></TouchableOpacity>}
                >

                    <FlatList
                        data={this.state.loans.results}
                        renderItem={({ item }) => (<DebtLoanRow onPress={() => this._debtLoanPressed(item)} data={item} />)}
                        keyExtractor={(item, index) => 'loan_' + index}
                        ItemSeparatorComponent={({ leadingItem }) => leadingItem ? (<Separator left={75} />) : null}
                    />
                </DefaultPanel>
            )
          }
          {
            this.state.debts.results.length > 0 && (
                <DefaultPanel 
                    title="Deudas" 
                    largeHeader 
                    rightComponent={<TouchableOpacity onPress={() => { this.props.navigation.navigate(screens.AccountType) }}><Icon.AntDesign name="plus" color={Colors.mainColor} size={24}/></TouchableOpacity>}
                >
                    <FlatList
                        data={this.state.debts.results}
                        renderItem={({ item }) => (<DebtLoanRow data={item} />)}
                        keyExtractor={(item, index) => 'debt_' + index}
                        ItemSeparatorComponent={({ leadingItem }) => leadingItem ? (<Separator left={75} />) : null}
                    />
                </DefaultPanel>
            )
          }

          {
            this.state.showContact && (
              <ContactModal data={this.state.showContact} visible={true} onHideModal={() => this.setState({ showContact: null })}></ContactModal>
            )
          }
        </View>
      </ViewWithTitle>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    accounts: state.accounts,
    settings: state.settings,
    transactions: state.transactions,
    rateExchanges: state.rateExchanges
  }
};
export default connect(mapStateToProps, { ...accountsOperations, ...settingsOperations})(HomeScreen2);