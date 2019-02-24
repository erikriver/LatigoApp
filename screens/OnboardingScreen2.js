import React from 'react';
import { StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AppNavigator from '../navigation/AppNavigator';

const styles = StyleSheet.create({
  image: {
    width: 350,
    height: 400,
  },
  title: {
    fontSize: 24,
    color: 'black',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
});

const slides = [
  {
    key: 'on1',
    title: 'Tu salud financiera',
    text: '',
    image: require('../assets/images/onboarding/onboarding1.png'),
    imageStyle: styles.image,
    backgroundColor: '#009499',
  },
  {
    key: 'on2',
    title: 'Este es tu plan:',
    text: '',
    image: require('../assets/images/onboarding/onboarding2.png'),
    imageStyle: styles.image,
    backgroundColor: '#009499',
  },
  {
    key: 'on3',
    title: '¡Felicidades!',
    text: 'Te has sometido al látigo del ahorro',
    image: require('../assets/images/logo.png'),
    imageStyle: {
        width: 320,
        height: 240,
    },
    backgroundColor: '#009499',
  }
];

export default class Onboarding2 extends React.Component {
  state = {
        showRealApp: false
  }
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  }
  render() {
    if (this.state.showRealApp) {
      return <AppNavigator />;
    } else {
      return <AppIntroSlider slides={slides} onDone={this._onDone}/>;
    }
  }
}