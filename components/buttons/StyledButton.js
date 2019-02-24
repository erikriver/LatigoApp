import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Image
} from 'react-native';
import { AvenirText } from '../text/StyledText';
import Colors from '../../constants/Colors';

export class StackedButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[styles.stackButtonContainer, {
          marginLeft: this.props.type == "left" ? 15 : (this.props.type == "center" ? 10 : 0),
          marginRight: this.props.type == "right" ? 15 : (this.props.type == "center" ? 10 : 0)
        }]}
      >
        <TouchableOpacity {...this.props} style={{alignItems:'center'}} activeOpacity={0.5}>
          <View style={styles.imageContainer}>
            <Image
              style={{ width: 48, height: 48 }}
              source={this.props.icon}
            />
          </View>
          <AvenirText style={styles.label} weight="demi">{this.props.text}</AvenirText>
        </TouchableOpacity >
      </View>
    );
  }
}

export class HorizonButton extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <TouchableOpacity  {...this.props} activeOpacity={0.5} style={{...this.props.style, ...styles.horizonContainer}}>
        <View style={styles.horizonImageContainer}>
          <Image
            style={{ width: 24, height: 24}}
            source={this.props.icon} 
          />
        </View>
        <AvenirText style={styles.horizonLabel}>{this.props.text}</AvenirText>
      </TouchableOpacity >
    );
  }
}

export class RoundedButton extends React.Component {
  render() {
    return (
      <TouchableOpacity {...this.props} style={[styles.roundedButton, this.props.style]}>
          <AvenirText weight="demi" style={{color: '#fff', fontSize: 16}}>{this.props.children}</AvenirText>
      </TouchableOpacity>
    )
  }
}
export class WithIconButton extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <TouchableOpacity {...this.props} style={[this.props.style, styles.withIconButton]}>
        {this.props.children}
        <AvenirText weight="demi" style={{ fontSize: 14, marginLeft: 5, marginTop: 5, color: this.props.color ? this.props.color : Colors.mainColor}}>{this.props.text}</AvenirText>
      </TouchableOpacity>
    )
  }
}
export class IOSButton extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <TouchableOpacity {...this.props} style={[this.props.style, styles.iOSButton]}>
        <AvenirText style={{ fontSize: 13, color: '#fff'}}>{this.props.text}</AvenirText>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  stackButtonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    backgroundColor: '#fff',
    borderRadius: 6,
    height: 120,
    shadowColor: '#000',
    shadowRadius: 14,
    shadowOpacity: 0.2,
    zIndex: 10
  },
  container: {
    flex: 1, 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 0,
  },
  imageContainer: {
    width: 48,
    height: 48,
    padding: 0,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  label: {
    textAlign: 'center',
    marginTop: 10,
  },
  horizonContainer: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    padding: 0,
  },
  horizonImageContainer: {
    width: 38,
    height: 38,
    borderRadius: 38,
    padding: 7,
    backgroundColor: Colors.backgroundColor,
  },
  horizonLabel: {
    textAlign: 'left',
    fontWeight: '100',
    marginLeft: 10,
  },
  roundedButton: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: Colors.mainColor,
    color: '#fff',
    marginBottom: 20,
    paddingTop: 18,
    paddingBottom: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  withIconButton: {
    flex:1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: '#EFEFF5',
    marginBottom: 20,
    paddingTop: 12,
    paddingBottom: 12,
    marginLeft: 5,
    marginRight: 5,
  },
  iOSButton:{
    textAlign: 'center',
    borderRadius: 20,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.mainColor,
    color: '#fff',
    paddingVertical: 3,
    paddingHorizontal: 15,
  }
});