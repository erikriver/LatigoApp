import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Colors from '../../constants/Colors';

export class IconBackground extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        width = this.props.width;
        return(
            <View style={{...styles.container, width:width, height: width, borderRadius: width}}>
                <View style={[styles.dot, styles.dot1]}></View>
                <View style={[styles.dot, styles.dot2]}></View>
                <View style={[styles.dot, styles.dot3]}></View>
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
    dot: {
        width: 5,
        height: 5,
        borderRadius: 5,
        position: 'absolute'
    },
    dot1: {
        backgroundColor: '#BFAFEE',
        left: '10%',
        bottom: '50%'
    },
    dot2: {
        backgroundColor: '#F6ADCF',
        left: '55%',
        bottom: '10%'
    },
    dot3: {
        backgroundColor: '#9FD2FF',
        right: '30%',
        top: '10%'
    }
});
  