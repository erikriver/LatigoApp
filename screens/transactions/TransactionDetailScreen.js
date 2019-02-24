import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
  KeyboardAvoidingView
} from 'react-native';
import { RoundedButton, DefaultPanel, CalculatorInput, AvenirText, Icon, Datepicker, AccountPicker, CategoryPicker, ContactPicker, CustomSwitch, DateTimepicker, ImagePicker} from '../../components';
import { transactionsOperations } from '../../modules/transactions';
import { accountsOperations } from '../../modules/accounts';
import { categoriesOperations } from '../../modules/categories';
import { connect } from 'react-redux';
import { accountTransactionsSum } from "../../utils/transactionHelper";
import { getAccountById } from '../../utils/accountHelper';
import { getCategoryById } from '../../utils/categoryHelper';
import { LocationPicker } from '../../components/locationPicker';
import Styles from '../../constants/Styles';
import Colors from '../../constants/Colors';
import { categoriesTypes } from '../../constants/Categories';

const defaultTransactionData = {
  category: null,
  isDebtLoan: false,
  note: '',
  value: 0,
  account: null,
  currency: 'MXN',
  date: new Date,
  contacts: [],
  reminder: null,
  moreInfoCollapsed: false,
}
class TransactionDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let { params } = navigation.state;
    return {
      tabBarVisible: false,
      headerTitle: params && params.id && !params.isRepeat ? 'Edit Transaction' : 'Add Transaction',
      headerRight: null
    }
  };
  
    constructor(props) {
      super(props);

      let { params } = this.props.navigation.state;

      if(params && params.id){
        var transaction = this.props.transactions.list[params.id];
        if (params.isRepeat){
          this.state = {
            ...transaction,
            id: null
          };
        }else{
          this.state = transaction;
        }
      }else{
        let account = this.props.settings.activeAccount;
        if(!account){
          const firstAccount = Object.keys(this.props.accounts.list).length?this.props.accounts.list[0]:{};
          account = firstAccount.id;
        }
        this.state = {
          ...defaultTransactionData, 
            account: account, 
            category: params?params.category:null,
            categoryType: params?params.categoryType:null
          }
      }
    }

    _getCurrency = ()=>{
      if (this.state.account){
        let currency = this.props.accounts.list[this.state.account].currency;
        this.state.currency = currency;
        return currency;
      }else{
        return defaultTransactionData.currency
      }
    }

    _getCategory = () => {
      return getCategoryById(this.props.categories, this.state.category);
    }

    _submitForm = ()=>{
      if(this.state.account && this.state.category && this.state.value){
        let category = this._getCategory();

        let savingTransaction = {
          ...this.state,
          isDebtLoan: category.type == categoriesTypes.debtLoan,
          value: category.isIncome ? Math.abs(this.state.value): -Math.abs(this.state.value)
        }
        
        if(this.state.id){
          this.props.updateTransaction(savingTransaction);
        }else{
          this.props.addTransaction(savingTransaction);
        }
        
        //Update account
        const account = getAccountById(this.props.accounts, this.state.account);

        //New balance  = initialBalance  + allTransaction
        const newBalance = account.initialBalance + accountTransactionsSum(this.props.transactions, this.state.account, this.state.id) + savingTransaction.value;
        this.props.updateAccount({ ...account, balance: newBalance});

        //Update category used time
        category.usedTimes += 1;
        this.props.updateCategory(category);

        //Go to home page
        this.props.navigation.goBack();
      }
    }

    _categoryRender = () =>{

    }

    render() {
      const category = this._getCategory();
      
      return (
        <KeyboardAvoidingView style={{flex: 1, backgroundColor: Colors.backgroundColor}} behavior="padding" enabled>
          <ScrollView contentContainerStyle={styles.container}>
            <DefaultPanel containerStyle={styles.topPanel} notitle>
              <View style={{flex: 1, marginBottom: 5}}>
                <CategoryPicker autoShow={!category} selectedTab={this.state.categoryType} value={this.state.category} onChange={(value)=>{this.setState({category:value})}} customRender={this._categoryRender}/>
              </View>
              <View style={{...styles.row,...styles.rowPadding}}>
                <View style={{alignItems:'center', justifyContent: 'center'}}>
                    <Icon.MaterialCommunityIcons style={styles.rowIcon} name="text" size={24}/>
                  </View>
                  <View style={{flex: 1}}>
                  <TextInput maxLength={100} clearButtonMode="always" style={styles.rowMultilineInput} placeholder='Transaction notes' defaultValue={this.state.note} onChangeText={(text) => { this.state.note = text }}></TextInput>
                </View>
              </View>
              <View style={{...styles.topRow,...styles.rowPadding}}>
                  <View style={{ flex: 1 }}>
                    <ContactPicker value={this.state.contacts} onChange={(value) => { this.setState({ contacts: value }) }} single></ContactPicker>
                  </View>
              </View>
              <View style={{...styles.row,...styles.rowPadding}}>
                <View style={{ flex: 1 }}>
                  <LocationPicker value={this.state.location} style={styles.locationpicker} onChange={(value) => { this.state.location = value }}></LocationPicker>
                </View>
              </View>
              <View style={{...styles.row,...styles.rowPadding}}>
                <View style={{alignItems:'center', justifyContent: 'center'}}>
                  <Icon.MaterialCommunityIcons style={styles.rowIcon} name="alarm" size={24}/>
                </View>
                <View style={{flex: 1}}>
                  <DateTimepicker style={styles.datepicker} value={this.state.reminder} onChange={(value) => {this.setState({ reminder: value })}}></DateTimepicker>
                </View>
              </View>
              <View style={{...styles.row,...styles.rowPadding}}>
                <View style={{ flex: 1 }}>
                  <ImagePicker value={this.state.image} style={styles.imagePicker} onChange={(value) => { this.state.image = value }}></ImagePicker>
                </View>
              </View>
            </DefaultPanel>
          </ScrollView>
          <DefaultPanel containerStyle={styles.bottomPanel} notitle>
            <AvenirText style={styles.label}>ACCOUNT</AvenirText>
              <View style={styles.row}>
                <AccountPicker value={this.state.account} style={styles.accountPicker} onChange={(value) => { this.setState({account:value})}}></AccountPicker>
              </View>
              <View style={styles.row}>
                <View style={{flex: 1}}>
                  <AvenirText style={styles.label}>AMOUNT</AvenirText>
                  <CalculatorInput
                    placeholder="0"
                    style={styles.balanceInput}
                    onChange={(value) => this.setState({ value: Math.abs(value)})}
                    value={this.state.value}
                    key={'currency_'+this.state.account}
                    currency = {this._getCurrency()}
                  />
                </View>
              </View> 
              <View style={{...styles.row,...styles.rowPadding}}>
                <View style={{alignItems:'center', justifyContent: 'center'}}>
                  <Icon.Ionicons style={styles.rowIcon} name="md-calendar" size={26}/>
                </View>
                <View style={{flex: 1}}>
                  <Datepicker style={styles.datepicker} value={this.state.date} onChange={(date) => {this.setState({ date: date })}}></Datepicker>
                </View>
              </View>
            <RoundedButton style={styles.button} onPress={this._submitForm}>Save</RoundedButton>
          </DefaultPanel>
        </KeyboardAvoidingView>
      );
    }
  }

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
    settings: state.settings,
    categories: state.categories,
    transactions: state.transactions
  }
};
export default connect(mapStateToProps, {...transactionsOperations,...accountsOperations, ...categoriesOperations})(TransactionDetailScreen);
const borderColor = '#efefef';
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
  },
  topPanel:{
    paddingHorizontal: 15,
    paddingTop: 15,
    flex: 1,
    backgroundColor: '#fefefe',
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10
  },
  bottomPanel:{
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    flex: 0
  },
  moreInfoPanel:{
    // marginTop: 10,
    paddingHorizontal: 15,
    // backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    padding: 0,
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
  },
  topRow: {
    flexDirection: 'row',
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
  },
  rowPadding:{
    paddingVertical: 5,
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
  label: {
    fontSize: Styles.smallFontSize,
    color: Colors.textGray,
    marginTop: 10,
    marginBottom: 5
  },
  balanceInput: {
    flex: 1,
    fontSize: 20,
    height: 40,
    paddingTop: 5,
    paddingBottom: 5,
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
  rowIcon: {
    color: '#767676',
    textAlign: 'center',
  },
  currency: {
    backgroundColor: '#FAFAFA',
    borderColor: '#E1E1E1',
    borderWidth: 1,
    borderRadius: 2,
    marginLeft: 15,
    padding: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  currencyLabel:{
    color: '#757575',
    paddingTop: 3
  },
  datepicker:{
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
  },
  locationpicker:{
    flex: 1,
    fontSize: 14,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 10,
  },
  rowInput:{
    fontSize: 14,
    padding: 10,
    backgroundColor: '#fff'
  },
  rowMultilineInput:{
    backgroundColor: '#fff',
    fontSize: 14,
    padding: 10,
    // borderRadius: 8,
    minHeight: 50,
    // marginTop: 5,
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    // borderTopColor: Colors.borderColor,
    // borderBottomColor: Colors.borderColor,
    overflow: 'hidden'
  },
  button: {
    marginTop: 30
  },
  moreInfoButton:{
    backgroundColor: '#fff',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems:'center',
    alignContent: 'center'
  },
  moreInfoButtonLabel: {
    color: Colors.mainColor,
    marginTop: 5,
    marginLeft: 5
  }
});
