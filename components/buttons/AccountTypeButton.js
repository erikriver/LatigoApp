import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Image
} from 'react-native';
import { Icon } from 'expo';
import { AvenirText } from '../text/StyledText';

export class AccountTypeButton extends React.Component {
    constructor(props) {
        super(props);
    }

    _selectedIndicator = () => {
        if (this.props.selectedType == this.props.value) {
            return (
                <View style={styles.checkedOverlay}>
                    <Icon.Ionicons name="ios-checkmark-circle-outline" style={styles.checked} size={26} color="#fff" />
                </View>
            );
        }
    }
    render() {
        return (
            <TouchableOpacity {...this.props} style={[{ backgroundColor: this.props.color }, styles.accountType]}>
                <Image source={this.props.image} style={{ width: 56, height: 56, marginBottom: 0, marginTop: 10 }}></Image>
                <AvenirText style={styles.accountTypeName} weight="demi">{this.props.name}</AvenirText>
                {this._selectedIndicator()}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({

    accountType: {
        borderRadius: 6,
        height: 100,
        width: 100,
        paddingLeft: 5,
        paddingRight: 5,
        alignItems: 'center',
        alignContent: 'center',
        overflow: 'hidden'
    },
    accountTypeName: {
        color: '#fff'
    },
    checkedOverlay:{
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,.5)',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flexDirection: 'column',
        alignItems:'center',
        alignContent: 'space-around',
        justifyContent: 'center'
    },
    checked: {
        color: '#fff',
        alignItems:'center'
    }
});
