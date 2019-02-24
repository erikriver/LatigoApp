import React from 'react';
import { Text } from 'react-native';

export class MonoText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'space-mono' }]} />;
  }
}

export class AvenirText extends React.Component {
  render() {
    var fontFamily = 'avenir-next';
    switch(this.props.weight){
      case 'bold': fontFamily = 'avenir-next-bold'; break;
      case 'cn': fontFamily = 'avenir-next-cn'; break;
      case 'demi': fontFamily = 'avenir-next-demi'; break;
      case 'it': fontFamily = 'avenir-next-it'; break;
    }
    return <Text {...this.props} style={[{ fontFamily: fontFamily, marginTop: 3}, this.props.style]}>{this.props.children}</Text>;
  }
}