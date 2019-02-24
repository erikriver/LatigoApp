import React from "react";
import {
    View, 
    StyleSheet,
    Header,
    Animated,
    Dimensions
} from "react-native";
import { LinearGradient } from 'expo';
import { BalanceButton } from '../buttons/BalanceButton';
import { AvenirText } from '../text/StyledText';
import Value from '../value';

export class GradientHeader extends React.Component {
    render() {
        return (
            <Animated.View 
                {...this.props}
            >
                <View style={styles.container}>
                    <View style={styles.gradientWrapStyle}>
                        <LinearGradient
                            start={{ x: 1, y: 0}}
                            end={{ x: 0, y: 1}}
                            colors={['#B785F6', '#5B60EF']}
                            style={styles.gradientStyle}>
                        </LinearGradient>
                    </View>
                    <View style={styles.gradientShadowStyle}></View>
                    <View style={[styles.headerCirle, styles.headerCirle1]}></View>
                    <View style={[styles.headerCirle, styles.headerCirle2]}></View>
                    <View style={[styles.headerCirle, styles.headerCirle3]}></View>

                    <View style={{position: 'absolute', top: 100, left: 0, zIndex: 100, width: '100%'}}>
                        <BalanceButton label="Balance" value={this.props.activeAccount.balance} style={{width: '100%'}}></BalanceButton>

                        <View style={styles.accountDetails}>
                            <View style={styles.accountDetailContainer}>
                                <AvenirText style={{ color: '#fff', fontSize: 14, marginBottom: 10, }}>Total Spend</AvenirText>
                                <Value value={this.props.spend} style={{ color: '#fff', fontSize: 22, }} weight="demi"></Value>
                            </View>
                            <View style={styles.accountDetailContainer}>
                                <AvenirText style={{ color: '#fff', fontSize: 14, marginBottom: 10}}>Total Receive</AvenirText>
                                <Value value={this.props.receive} style={{ color: '#fff', fontSize: 22 }} weight="demi"></Value>
                            </View>
                        </View>
                    </View>
                </View>
            </Animated.View>
        );
    }
}

let deviceWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        height: 350//this.props.height
    },
    gradientWrapStyle: {
        alignItems: 'center',
        height: 1200,
        width: 1200,
        borderRadius: 1200,
        bottom: 20,
        left: -(1200-deviceWidth)/2,
        position: 'absolute',
        zIndex: 2,
        overflow: 'hidden'
    },
    gradientStyle: {
        left: (1200-deviceWidth)/2,
        right: 0,
        bottom: 0,
        position: 'absolute',
        zIndex: 2,
        height: 350,
        width: deviceWidth
    },
    gradientShadowStyle: {
        backgroundColor: '#EDEAF5',
        height: 900,
        width: 900,
        borderRadius: 900,
        bottom: 0,
        left: -(900 - deviceWidth) / 2,
        position: 'absolute',
        zIndex: 1,
    },
    headerCirle: {
        position: 'absolute',
        borderWidth: 30,
        borderColor: 'rgba(255,255,255,.1)',
        zIndex: 3,
    },
    headerCirle1: {
        left: -100,
        bottom: -100,
        width: 200,
        height: 200,
        borderRadius: 200,
    },

    headerCirle2: {
        left: -150,
        bottom: -150,
        width: 300,
        height: 300,
        borderRadius: 300,
    },

    headerCirle3: {
        right: -75,
        top: -75,
        width: 200,
        height: 200,
        borderRadius: 200,
    },
    accountDetails:{
        flexDirection: 'row',
        marginTop: 20,
    },
    accountDetailContainer:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
    }
});