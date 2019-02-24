import React from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  TouchableOpacity 
} from 'react-native';
import { DefaultPanel, AvenirText, Icon, AccountRow} from '../../components';
import { getSummaryAccount, getAccountList } from "../../utils/accountHelper";
import {settingsOperations} from '../../modules/settings';
import Colors from '../../constants/Colors';
import { connect } from 'react-redux';
import screens from '../../constants/screens';

class AccountChooserScreen extends React.Component {
  static navigationOptions = () => {
      return{
        headerTitle: 'Accounts',
        tabBarVisible: false,
      }
    };
  
    constructor(props) {
      super(props);
      this.state = {
        activeAccount: this.props.navigation.state.params ? this.props.navigation.state.params.value : this.props.settings.activeAccount,
        hideTotal: this.props.navigation.state.params ? this.props.navigation.state.params.hideTotal:false,
        scrollEnabled: true,
      }
    }
    

    renderAccounts(accounts, excludedFromTotal){
      var result = [];
      accounts.map(account => {
        if (account.excludedFromTotal == excludedFromTotal) {
          result.push(this.renderRow(account));
        }
      })
      return result;
    }
    
    _allowScroll = (scrollEnabled) => {
      this.setState({ scrollEnabled: scrollEnabled })
    }
    
  renderRow(account, style = null) {
    var rowStyle = [styles.row];

    if (style) {
      rowStyle.push(style);
    }

    return (
      <AccountRow
        key={account.id}
        isChecked={this.state.activeAccount == account.id}
        style={rowStyle}
        account={account}
        onPress={() => this.setActiveAccount(account.id)}
      />
    );
  }
  
  setActiveAccount(id){
    if (this.props.navigation.state.params && this.props.navigation.state.params.callback){
      this.props.navigation.state.params.callback(id);
    }else{
      this.props.setActiveAccount(id);
      this.state.activeAccount = id;
    }
    this.props.navigation.goBack();
  }

  renderTotalRow = (accounts)=>{
    if (!this.state.hideTotal) {
      const summary = getSummaryAccount(accounts);
      return this.renderRow({ name: 'Total', balance: summary, icon: '002molecular' }, styles.summaryRow);
    }
  }

  render() {
    const accounts = getAccountList(this.props.accounts);

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
            style={[styles.scrollView]}
            scrollEnabled={this.state.scrollEnabled}
          >
          
          {this.renderTotalRow(accounts)}
          
          <DefaultPanel title="INCLUDED IN TOTAL">
            {this.renderAccounts(accounts, false)}
          </DefaultPanel>

          <DefaultPanel title="EXCLUDED FROM TOTAL">
            {this.renderAccounts(accounts, true)}
          </DefaultPanel>

          <DefaultPanel containerStyle={{backgroundColor: '#fff'}} title="ADD ACCOUNT" notitle="true">
            <TouchableOpacity style={styles.createNewContainer} onPress={() => { this.props.navigation.navigate(screens.AccountTypeChooser) }}>
              <View style={{flexDirection: 'row'}}>
                <Icon.AntDesign style={styles.createNewIcon} name="pluscircle" size={20}/>
                <AvenirText style={styles.createNewText} weight="demi">Add new account</AvenirText>
              </View>
              <Icon.Entypo style={{ color: Colors.mainColor }} name="chevron-thin-right" />
            </TouchableOpacity>
          </DefaultPanel>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
    settings: state.settings
  }
};
export default connect(mapStateToProps, settingsOperations)(AccountChooserScreen);
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.bodyColor,
    },
    scrollView:{
      // flex: 1
    },
    row: {
      backgroundColor: '#fff',
      flex: 1,
      flexDirection: 'row',
      padding: 20,
      margin: 10,
      borderRadius: 4
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
    createNewContainer:{
      flex: 1,
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 15
    },
    createNewIcon: {
      color: Colors.mainColor
    },
    createNewText: {
      color: Colors.mainColor,
      marginLeft: 10,
      fontSize: 16,
      paddingTop: 3,
    }
  });
  