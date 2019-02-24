import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
import { AvenirText } from '../text/StyledText';
import Value from '../value';


export class ContactBalance extends Component {
    constructor(props){
        super(props);
    }
    render() {
        let balance = this.props.balance;
        if(balance > 0){
            return (
                <View style={{ ...styles.balanceContainer, ...styles.balanceRedContainer }}>
                    <AvenirText weight='demi' style={styles.balanceText}>You own</AvenirText>
                    <Value weight='demi' style={styles.balanceValue} value={balance}></Value>
                    <View style={{ ...styles.dollarCircle, ...styles.dollarCircleRed }}>
                        <AvenirText weight='demi' style={{ color: '#fff' }}>$</AvenirText>
                    </View>
                </View>
            )
        }else if(balance < 0){
            return (
                <View style={{ ...styles.balanceContainer }}>
                    <AvenirText weight='demi' style={styles.balanceText}>Owns you</AvenirText>
                    <Value weight='demi' style={styles.balanceValue} value={Math.abs(balance)}></Value>
                    <View style={{ ...styles.dollarCircle, ...styles.dollarCircleBlue }}>
                        <AvenirText weight='demi' style={{ color: '#fff' }}>$</AvenirText>
                    </View>
                </View>
            )    
        }
    }
}

const styles = StyleSheet.create({
    balanceContainer:{
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#EAFCEF',
        borderRadius: 40,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    balanceValue:{
        marginLeft: 5,
        fontSize: 12
    },
    balanceText:{
        fontSize: 12
    },
    balanceRedContainer: {
        backgroundColor: '#FFEBEB',
    },
    dollarCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        marginLeft: 5,
        overflow: 'hidden',
        textAlign: 'center',
        alignContent:'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dollarCircleBlue:{
        backgroundColor: '#00DD52',
    },
    dollarCircleRed: {
        backgroundColor: '#FF004F'
    }
  });