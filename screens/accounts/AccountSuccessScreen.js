import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { RoundedButton, GradientBackground, AvenirText, Value } from '../../components';
import { accountsOperations } from '../../modules/accounts';
import { connect } from 'react-redux';
import LottieView from 'lottie-react-native';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import screens from '../../constants/screens';


const animationWidth = 120;
class AccountSuccessScreen extends React.Component {
  constructor(props) {
    super(props);

    account= {
      name: 'Account name',
      balance: 0
    };
    if(this.props.navigation.state.params){
      account = this.props.navigation.state.params.account;
    }
    this.state = {
      account : account
    }
  }

  static navigationOptions = {
    header: null
  };

  _backToHome = ()=>{
    //Reset navigation
    // const resetAction = StackActions.reset({
    //   index: 1,
    //   actions: [
    //     NavigationActions.navigate({ routeName: screens.Home }),
    //     NavigationActions.navigate({ routeName: screens.AccountChooser})
    //   ]
    // });
    // this.props.navigation.dispatch(resetAction);
    console.log(this.props.navigation.state);
    this.props.navigation.navigate(screens.Home);
  }
  
  render() {
    return (
      <GradientBackground>
        <View style={{...styles.container}}>
          <View style={styles.animationContainer}>
            <LottieView
              source={require('../../assets/animations/patient_successfully_added.json')}
              autoPlay
              style={[{ width: animationWidth *2 }]}
            />
          </View>
          <View style={styles.message}>
            <AvenirText style={styles.messageText}>¡Exelente!</AvenirText>
            <AvenirText style={{...styles.messageText}} weight="demi">{this.state.account.id?'cuenta actualizada':'Nueva cuenta agregada'}</AvenirText>
            <View style={styles.accountDetail}>
              <AvenirText style={styles.accountName}>{this.state.account.name}:</AvenirText>
              <Value value={this.state.account.balance} currency={this.state.account.currency} style={styles.accountBalance} weight='demi'/>
            </View>
          </View>
          <RoundedButton style={styles.button} onPress={this._backToHome}>Regresar al Inicio</RoundedButton>
        </View>
      </GradientBackground>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
    settings: state.settings
  }
};

export default connect(mapStateToProps, accountsOperations)(AccountSuccessScreen);

const styles = StyleSheet.create({
  container: {
    width: Layout.window.width -60,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'relative',
    zIndex: 10
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
  animationContainer: {
    backgroundColor: Colors.iconBackgroundColor,
    width: animationWidth,
    height: animationWidth,
    borderRadius: animationWidth,
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  message: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  messageText: {
    fontSize: 18,
    color: Colors.textColor
  },
  accountDetail: {
    backgroundColor: '#F7F6FB',
    color: Colors.textGray,
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
    overflow: 'hidden',
    flexDirection: 'row'
  },
  accountName: {
    color: Colors.textGray,
    marginRight: 10,
    fontSize: 14
  },
  accountBalance:{
    color: Colors.mainColor,
    fontSize: 16
  }
});
