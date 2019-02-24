import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Button
} from 'react-native';

import { GradientHeader, HorizonButton, StackedButton, AccountSelector, ActiveAccountName, Value, AvenirText, QuickMakeTransaction} from '../components';
import Colors from '../constants/Colors';
import {getIcon} from '../utils';

import { connect } from 'react-redux';
import { accountsOperations } from '../modules/accounts';
import { getAccountById } from "../utils/accountHelper";
import { accountTransactionsSum, accountTotalSpend, accountTotalIncome } from '../utils/transactionHelper';
import { categoriesTypes } from "../constants/Categories";
import screens from '../constants/screens';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTransparent: true,
      headerTitle: (
        <ActiveAccountName style={{ color: '#fff', fontSize: 16, marginTop: 10}}></ActiveAccountName>
      ),
      headerLeft: (
        <AccountSelector onPress={() => navigation.navigate(screens.AccountChooser)}></AccountSelector>
      ),
      headerRight: (
        <View name="notifications" style={{ color: '#fff', marginRight: 15 }}></View>
      ),
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      totalSpend : accountTotalSpend(this.props.transactions, this.props.settings.activeAccount),
      totalReceive : accountTotalIncome(this.props.transactions, this.props.settings.activeAccount)
    }
  }

  _openCategorySelect =(type) =>{
    this.props.navigation.navigate(screens.TransactionDetail, {categoryType: type});
  }

  render() {
    const activeAccount = getAccountById(this.props.accounts, this.props.settings.activeAccount);
    return (
      <View style={styles.container}>
        <GradientHeader headerHeight='300' activeAccount={activeAccount} spend={this.state.totalSpend} receive={this.state.totalReceive}/>
        <Animated.View style={[styles.mainButtonBox]}>
          <StackedButton text="Income" icon={getIcon('016money')} type="left" onPress={()=>{this._openCategorySelect(categoriesTypes.income)}}></StackedButton>
          <StackedButton text="Spend" icon={getIcon('019atm')} type="center" onPress={()=>{this._openCategorySelect(categoriesTypes.expense)}}></StackedButton>
          <StackedButton text="Lend & Loan" icon={getIcon("025pay")} type="right" onPress={()=>{this._openCategorySelect(categoriesTypes.debtLoan)}}></StackedButton>
        </Animated.View>
        <Animated.ScrollView
          style={[styles.scrollView]}
          scrollEventThrottle={1}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollAnim } } },
          ])}
        >
          <QuickMakeTransaction style={styles.contentContainer} categories={this.props.categories}/>
        </Animated.ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    accounts: state.accounts,
    settings: state.settings,
    transactions: state.transactions
  }
};
export default connect(mapStateToProps, accountsOperations)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bodyColor,
  },
  scrollView: {
    flex: 1,
    position: 'relative',
    zIndex: 200
  },
  headerStyle: {
    padding: 15,
    alignItems: 'center',
    height: 200,
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 300
  },
  mainButtonBox: {
    marginTop: -70,
    marginBottom: 20,
    flexDirection: 'row'
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contentContainer: {
    padding: 15
  },
  subButtonContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    marginBottom: 40
  },
});
