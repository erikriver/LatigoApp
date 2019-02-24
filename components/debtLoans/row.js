import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { getCategoryById } from '../../utils/categoryHelper';
import Value from '../value';
import { AvenirText } from '../text/StyledText';
import Colors from '../../constants/Colors';
import { connect } from 'react-redux';
import Images from '../../constants/Images';
import { ContactBalance } from '../contacts/contactBalance';
import { dateFormat } from '../../utils/dateHelper';
import { IconShower } from '../icon';

class DebtLoanRow extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            item: this.props.data
        };
    };

    _renderAvatar = (item)=> {
        if (item.imageAvailable){
            return (
                <Image style={styles.avatar} source={item.image} width={42} height={42} />
            )
        }else{
            return (
                <Image style={styles.avatar} source={Images.defaultAvatar} width={42} height={42} />
            )
        }
    }

    _renderIcon = (item)=> {
        const category = getCategoryById(this.props.categories, item.category);
        return (
            <View style={styles.icon}>
                <IconShower style={{marginRight: 20}} icon={category ? category.icon : ''} size={42}></IconShower>
            </View>
        )
    }

    render() {
        const { item } = this.state;
        const note = item.transaction ? item.transaction.note : `${item.transactions.length} transactions`;
        const category = item.transaction ? getCategoryById(this.props.categories, item.transaction.category) : null;
        console.log(note, category);
        return (
            <TouchableOpacity {...this.props} style={styles.itemContainer}>
                <View style={styles.itemIcon}>
                    {item.contact && this._renderAvatar(item.contact)}
                    {item.transaction && this._renderIcon(item.transaction, category)}
                </View>
                <View style={styles.itemDescription}>
                    <View style={styles.itemDescriptionCenter}>
                        <AvenirText style={styles.itemName} weight="demi">{item.contact ? item.contact.name : category.name}</AvenirText>
                        <AvenirText style={styles.itemNote}>{note}</AvenirText>
                    </View>
                    <View>
                        { item.reminder && (<AvenirText styles={styles.itemReminder}>Till {dateFormat(item.reminder)}</AvenirText>) }
                        <ContactBalance balance={item.total}/>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        transactions: state.transactions,
    }
};
export default connect(mapStateToProps, null)(DebtLoanRow);


const styles = StyleSheet.create({
    itemContainer: {
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    itemIcon: {
        marginRight: 5,
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
    itemReminder:{
        color: Colors.textGray
    },
    avatar:{
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 10,
    },
    icon:{
        marginRight: 10,
    },
});
