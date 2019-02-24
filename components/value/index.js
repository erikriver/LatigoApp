import React from 'react';
import { AvenirText } from '../text/StyledText';
import { withGlobalize } from 'react-native-globalize';
class Value extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const currencyFormatter = this.props.globalize.getCurrencyFormatter(this.props.currency || 'MXN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
        const formattedCurrency = currencyFormatter(this.props.value ? this.props.value:0);

        return (
            <AvenirText {...this.props}>
                {this.props.prefix?this.props.prefix:''}{formattedCurrency}
            </AvenirText>
        );
    }
}
export default withGlobalize(Value)