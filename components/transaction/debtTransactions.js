import React from 'react';
import {
    TouchableOpacity,
    FlatList
} from 'react-native';
import currencies from '../../constants/Currency';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import Colors from '../../constants/Colors';
import { getListDebt } from '../../utils/transactionHelper';
import DebtLoanRow from '../debtLoans/row'
import { DefaultPanel } from '../panels';
import { Icon } from 'expo';
import { Separator } from '../separator';

class DebtTransactions extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            value: this.props.value,
        }
    }

    render() {
        let debts = getListDebt(this.props.transactions);
        return (
            debts.results.length > 0 && (
                <DefaultPanel 
                    title="Debts" 
                    // description={'Total ' + debts.total}
                    largeHeader 
                    rightComponent={<TouchableOpacity onPress={() => { this.props.navigation.navigate(screens.AccountType) }}><Icon.AntDesign name="plus" color={Colors.mainColor} size={24}/></TouchableOpacity>}
                >
                    <FlatList
                        data={debts.results}
                        renderItem={({ item }) => (<DebtLoanRow data={item} />)}
                        keyExtractor={({index}) => 'debt_' + index}
                        ItemSeparatorComponent={({ leadingItem }) => leadingItem ? (<Separator left={75} />) : null}
                    />
                </DefaultPanel>
            )
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accounts: state.accounts,
        transactions: state.transactions
    }
};
export default withNavigation(connect(mapStateToProps, null)(DebtTransactions));


