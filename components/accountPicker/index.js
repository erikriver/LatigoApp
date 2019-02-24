import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { Icon } from 'expo';
import { AvenirText } from '../text/StyledText';
import Value from '../value';
import currencies from '../../constants/Currency';
import { withNavigation } from 'react-navigation';
import IconPicker from '../iconPicker';
import {IconShower} from '../icon/index'
import { getAccountById } from '../../utils/accountHelper';
import { connect } from 'react-redux';
import R from 'ramda';
import screens from '../../constants/screens';
import Colors from '../../constants/Colors';

class AccountPicker extends React.Component {
    _onSelectIcon = (code) =>{
        this.setState({ value: code, currency: currencies[code]});
        if (this.props.onChange){
            this.props.onChange(code);
        }
    }

    constructor(props){
        super(props);
        
        this.state = {
            value: this.props.value,
            activeAccount: getAccountById(this.props.accounts, this.props.value)
        }
    }

    _onSelectAccount = (value) => {
        this.setState({
            value: value,
            activeAccount: getAccountById(this.props.accounts, value)
        });

        if (this.props.onChange){
            this.props.onChange(value);
        }
    }

    render() {
        return (
            <TouchableOpacity 
                {...this.props} 
                style={styles.container} 
                activeOpacity={0.7} 
                onPress={() => { !this.props.disabled && this.props.navigation.navigate(screens.AccountChooser, { value: this.state.value, callback: this._onSelectAccount, hideTotal: true})}}
            >
                <View style={styles.iconInput}>
                    <IconShower isSquare size={42} key={this.state.activeAccount.icon} icon={this.state.activeAccount.icon} color='#ccc'></IconShower>
                </View>
                <View style={{flex: 1}}>
                    <AvenirText style={styles.nameInput}>{this.state.activeAccount.name}</AvenirText>
                    <Value style={styles.balanceInput} currency={this.state.activeAccount.currency} value={this.state.activeAccount.balance}></Value>
                </View>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accounts: state.accounts,
        settings: state.settings
    }
};
export default withNavigation(connect(mapStateToProps, null)(AccountPicker));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        overflow: 'hidden',
    },
    labelContainer:{
        paddingTop: 5
    },
    iconInput: {
        width: 50,
        marginRight: 10
    },
    nameInput: {
        marginTop: 3,
        fontSize: 14,
    },
    balanceInput: {
        fontSize: 14,
        color: Colors.textGray
    },
});
