import React from 'react';
import {
  StyleSheet,
  Text,
  Touchable,
  View,
  Button,
} from 'react-native';
import Value from '../value';
import { Icon } from 'expo';

export class BalanceButton extends React.Component {
  render() {
    return (
      <View {...this.props} style={styles.container}>
        <Text style={[styles.left, styles.text]}>{this.props.label}</Text>
        <Value style={[styles.center, styles.text]} value={this.props.value} weight="demi"></Value>
        <Icon.Ionicons style={[styles.right]} name='ios-arrow-round-forward' size={26} color='#fff'/>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'rgba(255,255,255,.3)',
    borderRadius: 100
  },
  text: {
    color: '#fff'
  },
  left: {
    textAlign: 'center',
    width: 70,
    fontSize: 16,
  },
  center: {
    fontSize: 18,
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 6,
  },
  right: {
    width: 70,
    textAlign:'right'
  }
});
