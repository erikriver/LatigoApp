import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo';
import { BottomTabBar } from 'react-navigation-tabs';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0, 
        backgroundColor: 'transparent'
    },
    blurView: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 0,
    },
    bottomTabBar: {
        backgroundColor: 'transparent',
        position: 'relative',
        zIndex: 1
    },
});

export default function TabBar(props) {
    return (
        <View style={styles.container}>
            <BlurView tint="light" intensity={100} style={styles.blurView}>
                {/* <BottomTabBar {...props} style={styles.bottomTabBar} /> */}
            </BlurView>
            <BottomTabBar {...props} style={styles.bottomTabBar} />
        </View>
    );
}