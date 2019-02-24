import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'expo';
import { connect } from 'react-redux';
import { getAccountById } from '../../utils/accountHelper';
import { IconShower } from '../icon';

class AccountSelector extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const activeAccount = getAccountById(this.props.accounts, this.props.settings.activeAccount);
        return (
            <TouchableOpacity {...this.props} style={styles.container}>
                <View style={styles.iconContainer}>
                    <IconShower isSquare key={activeAccount.icon} icon={activeAccount.icon} size={32}></IconShower>
                </View>
                <Icon.Ionicons name='md-arrow-dropdown' size={20} color={this.props.color ? this.props.color : '#fff'}/>
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
export default connect(mapStateToProps)(AccountSelector);


const styles = StyleSheet.create({
    container: {       
        flexDirection: 'row',
        marginLeft: 15,
        alignItems: 'center',
    },
    iconContainer: {
      marginRight: 3
    },
})