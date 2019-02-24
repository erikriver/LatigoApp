import React from 'react';
import {AvenirText} from '../text/StyledText';
import Colors from '../../constants/Colors';

export default class TabBarText extends React.Component {
  render() {
    return (
      <AvenirText style={{fontSize: 12, color: this.props.focused?Colors.tabIconSelected : Colors.tabIconDefault}}>{this.props.children}</AvenirText>
    );
  }
}
