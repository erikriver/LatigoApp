import React from 'react';
import { View } from 'react-native';
import {
    AvenirText
} from '../text/StyledText';
import Value from '../value';

import { connect } from 'react-redux';
import { accountsOperations } from '../../modules/accounts';
import { getAccountById } from "../../utils/accountHelper";

class ActiveAccountName extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const activeAccount = getAccountById(this.props.accounts, this.props.settings.activeAccount);

        render = (activeAccount) => {
            if (this.props.type == 'withBalance') {
                return (
                    <View style={{ flexDirection: 'column', alignItems: 'center',}}>
                        <AvenirText {...this.props} style={{fontSize: 12}}>{activeAccount.name}</AvenirText>
                        <Value weight="demi" value={activeAccount.balance} style={{fontSize: 16}}></Value>
                    </View>
                );
            }else{
                return (
                    <View>
                        <AvenirText {...this.props}>{activeAccount.name}</AvenirText>
                    </View>
                );
            }
        }

        return (
            <View>
                {render(activeAccount)}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accounts: state.accounts,
        settings: state.settings
    }
};

export default connect(mapStateToProps, accountsOperations)(ActiveAccountName);