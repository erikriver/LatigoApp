import React from 'react';
import {
    TouchableOpacity,
    FlatList
} from 'react-native';
import currencies from '../../constants/Currency';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import Colors from '../../constants/Colors';
import { getListLoan } from '../../utils/transactionHelper';
import DebtLoanRow from '../debtLoans/row';
import { DefaultPanel } from '../panels';
import { Icon } from 'expo';
import { Separator } from '../separator';

class LoanTransactions extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            value: this.props.value,
        }
    }

    render() {
        let loans = getListLoan(this.props.transactions);
        return (
            loans.results.length > 0 && (
                <DefaultPanel
                    title={"Loans"}
                    largeHeader 
                    rightComponent={<TouchableOpacity onPress={() => { this.props.navigation.navigate(screens.AccountType) }}><Icon.AntDesign name="plus" color={Colors.mainColor} size={24}/></TouchableOpacity>}
                >

                    <FlatList
                        data={loans.results}
                        renderItem={({ item }) => (<DebtLoanRow data={item} />)}
                        keyExtractor={({index}) => 'loan_' + index}
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
export default withNavigation(connect(mapStateToProps, null)(LoanTransactions));


