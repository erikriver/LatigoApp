import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import { Icon } from 'expo';
import Value from '../value';
import { withNavigation } from 'react-navigation';
import { withGlobalize } from 'react-native-globalize';
import screens from '../../constants/screens';
import Styles from '../../constants/Styles';

class Calculator extends React.Component {
    constructor(props){
        super(props);

        this.state= {
            value: Math.abs(props.value),
            currency: props.currency
        }
    }

    componentDidMount(){
        this.setState({currency: this.props.currency});
    }

    _formatNumber = (number) => {
        const numberFormatter = this.props.globalize.getNumberFormatter({ maximumFractionDigits: 20 });
        return numberFormatter(parseFloat(number || 0))
    }

    _onChange = (value) => {
        this.setState({ value: value});
        if (this.props.onChange){
            this.props.onChange(value);
        }
    }

    render() {
        return (
            <TouchableOpacity {...this.props} style={styles.container} activeOpacity={0.7} onPress={() => { this.props.navigation.navigate(screens.Calculator, {value: this.state.value, callback: this._onChange})}}>
                <View style={styles.labelContainer}>
                    <Value value={this.state.value} weight="demi" currency={this.state.currency} style={styles.label}></Value>
                </View>
                <Icon.Entypo style={{ color: '#333' }} name="chevron-thin-right" />
            </TouchableOpacity>
        );
    }
}

export default withGlobalize(withNavigation(Calculator));

const styles = StyleSheet.create({
    container:{
        flexDirection: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 5,
        paddingTop: 5,
    },
    label: {
        fontSize: Styles.largeFontSize 
    }
});
