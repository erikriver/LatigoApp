import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Image
} from 'react-native';
import { AvenirText } from '../text/StyledText';
import Value from '../value';
import images from '../../constants/Images';

export class AccountCircleButton extends React.Component {
    render() {
        return (
            <TouchableOpacity {...this.props} style={styles.container} activeOpacity={0.7}>
                <View style={styles.iconContainer}>
                    <Image style={styles.icon} source={this.props.icon ? this.props.icon : images.wallet} />
                </View>
                <View style={{ flex: '1' }}>
                    <AvenirText style={styles.subtitle} weight="demi">{this.props.label}</AvenirText>
                    <Value style={styles.text} value={this.props.balance} weight="demi"></Value>
                </View>
                {/* <Icon style={{ color: '#fff' }} name="right-arrow" /> */}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 4,
        overflow: 'hidden',
        borderBottomWidth: 1,
        borderBottomColor: '#efefef',        
    },
    icon: {
        width: 32,
        height: 32,
        marginRight: 20
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 5,
        color: '#333',
        fontWeight: 'bold',
    },
    text: {
        fontSize: 14,
    },
});
