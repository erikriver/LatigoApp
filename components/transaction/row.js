import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';
import { getCategoryById } from '../../utils/categoryHelper';
import Value from '../value';
import { AvenirText } from '../text/StyledText';
import { IconShower } from '../icon';
import Colors from '../../constants/Colors';
import { connect } from 'react-redux';
import { getAccountById } from '../../utils/accountHelper';
import { getRateExchanges, getRate } from '../../utils/rateExchangeHelper';

class TransactionRow extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            item: this.props.transaction
        };
        //   console.log(this.state.categories);
    };

    _renderItemNote = (note) => {
        if (note) {
            return (
                <AvenirText style={styles.itemNote}>{note}</AvenirText>
            )
        }
    }
    
    _isShowExchangeRate = (item) => {
        return this.props.showRateExchange && item.currency && item.currency != this.props.settings.currency;
    }

    render() {
        const  { item } = this.state;
        const category = getCategoryById(this.props.categories, item.category);
        let title = category ? category.name : '';
        if(item.isDebtLoan && item.contacts && item.contacts.length){
            title = `${title} ${item.value > 0 ? 'from' : 'to'} ${item.contacts[0].name}`;
        }
        
        let value = item.value;
        if(this.props.showRateExchange && item.value != this.props.settings.currency){
            value = value / getRate(this.props.rateExchanges, this.props.settings.currency, item.currency);
        }

        return (
            <TouchableOpacity {...this.props} style={styles.itemContainer}>
                <View style={styles.itemIcon}>
                    <IconShower isSquare icon={category ? category.icon : ''} size={42}></IconShower>
                    { 
                        this.props.showAccountIcon && (
                            <View style={styles.itemAccount}>
                                <IconShower icon={getAccountById(this.props.accounts ,item.account).icon} size={18}></IconShower>
                            </View>
                        ) 
                    }
                </View>
                <View style={styles.itemDescription}>
                    <View style={styles.itemDescriptionCenter}>
                        <AvenirText style={styles.itemName} weight="demi">{title}</AvenirText>
                        {this._renderItemNote(item.note)}
                    </View>
                    <View style={styles.itemValue}>
                        {
                            this._isShowExchangeRate(item) && (<Value style={{ color: Colors.textGray, fontSize: 13 }} value={item.value} currency={item.currency}></Value>)
                        }
                        <Value style={{ color: item.value > 0 ? Colors.mainColor : Colors.alertColor, fontSize: 14 }} value={value} currency={this.props.settings.currency} prefix={this._isShowExchangeRate(item)?' ≈ ':''}></Value>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        accounts: state.accounts,
        settings: state.settings,
        rateExchanges: state.rateExchanges
    }
};
export default connect(mapStateToProps, null)(TransactionRow);


const styles = StyleSheet.create({
    itemContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    itemIcon: {
        marginRight: 20
    },
    itemName: {
        fontSize: 14,
    },
    itemNote: {
        color: Colors.textGray
    },
    itemDescription: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'space-between',
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingBottom: 15,
        minHeight: 58,
        // borderBottomWidth: 1,
        // borderBottomColor: Colors.borderColor,
    },
    itemAccount: {
        position: 'absolute',
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 20,
        right: -10,
        bottom: -5
    },
    itemValue:{
        alignItems: 'flex-end'
    }
});
