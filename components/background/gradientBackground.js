import React from "react";
import {
    View,
    StyleSheet,
    Dimensions,
} from "react-native";
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo';

export class GradientBackground extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View {...this.props} style={styles.container}>
                <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    colors={['#B785F6', '#5B60EF']}
                    style={styles.gradientStyle}>
                </LinearGradient>
                <View style={[styles.backgroundCircle, styles.backgroundCircle1]}></View>
                <View style={[styles.backgroundCircle, styles.backgroundCircle2]}></View>
                <View style={[styles.backgroundCircle, styles.backgroundCircle3]}></View>
                <View style={[styles.backgroundCircle, styles.backgroundCircle4]}></View>
                <View style={[styles.backgroundCircle, styles.backgroundCircle5]}></View>
                {/* <View style={[styles.backgroundCircle, styles.backgroundCircle6]}></View> */}
                <Animatable.View duration={1000}  animation="bounceIn" style={{...styles.childContainer}}>
                    {this.props.children}
                </Animatable.View>
            </View>
        );
    }
}

let deviceWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent:'space-around',
        paddingLeft: 30,
        paddingRight: 30,
        flex: 1,
    },
    childContainer: {
        backgroundColor: '#fff',
        borderRadius: 6,
    },
    gradientStyle: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0
    },
    backgroundCircle: {
        position: 'absolute',
        borderWidth: 40,
        borderColor: 'rgba(255,255,255,.1)',
        zIndex: 3,
    },
    backgroundCircle1: {
        left: -100,
        bottom: -100,
        width: 200,
        height: 200,
        borderRadius: 200,
    },

    backgroundCircle2: {
        left: -150,
        bottom: -150,
        width: 300,
        height: 300,
        borderRadius: 300,
    },

    backgroundCircle3: {
        right: -75,
        top: -75,
        width: 200,
        height: 200,
        borderRadius: 200,
    },

    backgroundCircle4: {
        right: -100,
        top: '50%',
        width: 150,
        height: 150,
        borderRadius: 150,
    },

    backgroundCircle5: {
        left: -75,
        top: 100,
        width: 150,
        height: 150,
        borderRadius: 200,
    },

    backgroundCircle6: {
        right: -75,
        top: -75,
        width: 200,
        height: 200,
        borderRadius: 200,
    },
});