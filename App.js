import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import Onboarding from './screens/OnboardingScreen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { FormattedProvider, Globalize  } from 'react-native-globalize';
import { store, persistor } from './store';

console.disableYellowBox = true;
export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <FormattedProvider locale="es" currency="MXN">
            <Provider store={store}>
              <PersistGate persistor={persistor}>
                <Onboarding />
              </PersistGate>
            </Provider>
          </FormattedProvider>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        //Images
        require('./assets/images/default_avatar.png'),
        require('./assets/images/empty_calendar.png'),
        require('./assets/images/empty_transaction.png'),
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),            
      ]),
      Font.loadAsync({
        // The font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'avenir-next': require('./assets/fonts/AvenirNextLTPro-Regular.otf'),
        'avenir-next-bold': require('./assets/fonts/AvenirNextLTPro-Bold.otf'),
        'avenir-next-it': require('./assets/fonts/AvenirNextLTPro-It.otf'),
        'avenir-next-demi': require('./assets/fonts/AvenirNextLTPro-Demi.otf'),
        'avenir-next-cn': require('./assets/fonts/AvenirNextLTPro-Cn.otf'),
      }),
      Globalize.load([require('./globalize/currencies.json')])
    ]);
  };
  

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
