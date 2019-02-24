import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Image
} from 'react-native';
import { LinearGradient } from 'expo';
import { AvenirText } from '../text/StyledText';

export class GradientButton extends React.Component {
    render() {
        return (
            <TouchableOpacity {...this.props} style={styles.container}>
                <LinearGradient
                    start={{ x: 0, y: 0 }} 
                    end={{ x: 1, y: 0 }}
                    locations={[0.0, 1.0]}
                    colors={['#7353FC', '#67B7FF']}
                    style={styles.gradientContainer}>
                    <View style={styles.iconContainer}>
                        <Image style={styles.icon} source={require('../../assets/images/account_types/005-link.png')} />
                    </View>
                    <View style={{ flex: '1' }}>
                        <AvenirText style={styles.subtitle}>{this.props.label}</AvenirText>
                        <AvenirText style={styles.text}>{this.props.balance}</AvenirText>
                    </View>
                    {/* <Icon style={{color:'#fff'}} name="right-arrow" /> */}

                    <View style={[styles.cirle, styles.cirle1]}></View>
                    <View style={[styles.cirle, styles.cirle2]}></View>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradientContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 40,
        paddingTop: 40,
        margin: 10,
        borderRadius: 4,
        overflow: 'hidden'
    },
    icon: {
        width: 48,
        height: 48,
        marginRight: 20
    },
    subtitle: {
        fontSize: 22,
        marginBottom: 5,
        fontWeight: 'bold',
        color: '#fff'
    },
    text: {
        fontSize: 14,
        color: '#fff'
    },
    left: {
        textAlign: 'center',
    },
    center: {
        fontWeight: 'bold'
    },
    right: {

    },
    cirle: {
        position: 'absolute',
        borderWidth: 30,
        borderColor: 'rgba(255,255,255,.1)',
        zIndex: 3,
    },
    cirle1: {
        right: -75,
        top: -75,
        width: 150,
        height: 150,
        borderRadius: 150,
    },

    cirle2: {
        right: -150,
        top: -150,
        width: 300,
        height: 300,
        borderRadius: 300,
    },
});
