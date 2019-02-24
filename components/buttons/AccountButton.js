import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import { Icon } from 'expo';
import { AvenirText } from '../text/StyledText';
import Value from '../value';
import Colors from '../../constants/Colors';
import { IconShower } from '../icon';
import AccountTypes from '../../constants/AccountTypes';

export class AccountButton extends React.Component {
    render() {
        const isChecked = ()=> {
            if(this.props.isChecked){
                return (
                  <Icon.MaterialCommunityIcons
                    style={styles.checked}
                    size={24}
                    name="checkbox-marked-circle"
                  />
                );
            }
        }

        accountTypeName = '';
        switch(this.props.type){
            case AccountTypes.Default: accountTypeName = 'Default account'; break;
            case AccountTypes.Credit: accountTypeName = 'Credit account'; break;
            case AccountTypes.Saving: accountTypeName = 'Saving account'; break;
        }
        return (
          <TouchableOpacity
            {...this.props}
            style={styles.container}
            activeOpacity={0.5}
          >
            <View style={styles.iconContainer}>
              <IconShower
                isSquare
                color={this.props.color}
                size={42}
                icon={this.props.icon}
              />
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.accountNameContainer}>
                <AvenirText style={styles.subtitle} weight="demi">
                  {this.props.label}
                </AvenirText>
                <AvenirText style={styles.accountType}>
                  {accountTypeName} - {this.props.currency}
                </AvenirText>
              </View>
              <Value
                style={styles.balance}
                value={this.props.balance}
                currency={this.props.currency}
              />
              {isChecked()}
            </View>
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
        paddingHorizontal: 15,
        overflow: 'hidden',      
        position: 'relative',
    },
    iconContainer: {
        marginRight: 15,
    },
    contentContainer: { 
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 20,
        // borderBottomWidth: 1,
        // borderBottomColor: '#efefef',  
    },
    accountNameContainer:{
        flex: 1,
    },
    subtitle: {
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold',
    },
    balance: {
        fontSize: 14,
        color: Colors.textGray
    },
    checked: {
        color: Colors.mainColor,
        marginLeft: 10,
    }
});
