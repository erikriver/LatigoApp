import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import Colors from '../../constants/Colors';

export class Separator extends React.Component {
    render(){
        return (
            <View style={{ ...styles.itemSeparator, left: this.props.left ? this.props.left : 85, borderBottomColor: this.props.color ? this.props.color : Colors.borderColor }}></View>
        ) 
    }
}
const styles = StyleSheet.create({
    itemSeparator: {
        borderBottomWidth: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        bottom: 0
    }
});
