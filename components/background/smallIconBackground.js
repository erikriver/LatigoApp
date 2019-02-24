import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Colors from '../../constants/Colors';

export class SmallIconBackground extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        width = this.props.width;
        return(
            <View {...this.props} style={{ ...styles.container, width: width, height: width, borderRadius: !this.props.isSquare?width:10, backgroundColor: this.props.background ? this.props.background:Colors.iconBackgroundColor}}>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.iconBackgroundColor,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
});
  