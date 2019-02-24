import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo';
import AppIntroSlider from 'react-native-app-intro-slider';
import AppNavigator from '../navigation/AppNavigator';

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  logo: {
    width: 320,
    height: 240,
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 22,
  },
});

const slides = [
  {
    key: 'one',
    logo: require('../assets/images/logo.png'),
    text: 'Es una plataforma que te obliga a ahorrar cada que llega tu nómina o cada que haces compras',
    image: require('../assets/images/onboarding/one.png'),
    imageStyle: styles.image,
    colors: ['#fff', '#009499'],
  },
  {
    key: 'two',
    logo: require('../assets/images/logo.png'),
    text: 'Determinamos tu capacidad de ahorro con base a tus ingresos y gastos ¡Sólo escoges tu banco y listo!',
    image: require('../assets/images/onboarding/two.png'),
    imageStyle: styles.image,
    colors: ['#fff', '#009499'],
  },
  {
    key: 'three',
    logo: require('../assets/images/logo.png'),
    title: '',
    text: 'Con planes de 3, 6 y 9 meses creas un plan de ahorro y vas decidiendo que hacer con el, nostoros te proporcionamos los instrumentos',
    image: require('../assets/images/onboarding/three.png'),
    imageStyle: styles.image,
    colors: ['#fff', '#009499'],
  },
];

export default class Onboarding extends React.Component {
  state = {
        showRealApp: false
  }
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  }
  _renderItem = props => (
    <LinearGradient
      style={[
        styles.mainContent,
        {
          paddingTop: props.topSpacer,
          paddingBottom: props.bottomSpacer,
          width: props.width,
          height: props.height,
        },
      ]}
      colors={props.colors}
      start={{ x: 0, y: 0.1 }}
      end={{ x: 0.1, y: 1 }}
    >
      <Image source={props.logo} style={props.logoStyle} />
      <Image source={props.image} style={props.imageStyle} />
      <View>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </LinearGradient>
  );
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }
  render(){
    if (this.state.showRealApp) {
      return <AppNavigator />;
    } else {
      return <AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        onDone={this._onDone}/>;
    }
  }
}
