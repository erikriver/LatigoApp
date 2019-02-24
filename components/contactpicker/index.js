import React, {Component} from 'react';
import { StyleSheet, View, TouchableOpacity, Image, SectionList} from 'react-native';
import { Icon, Permissions, Contacts  } from 'expo';
import { AvenirText } from '../text/StyledText';
import Colors from '../../constants/Colors';
import moment from 'moment';
import Layout from '../../constants/Layout';
import { SearchBar } from 'react-native-elements';
import Images from '../../constants/Images';
import R from 'ramda';
import { AnimatedModal } from '../modal';

import Styles from '../../constants/Styles';
import { getContactBalance } from '../../utils/transactionHelper';
import { connect } from 'react-redux';
import { ContactBalance } from '../contacts/contactBalance';
import { getPhonenumber } from '../../utils/contactHelper';

class ContactPicker extends Component {
    constructor(props){
        super(props);

        this.state = {
            date: moment(),
            today: moment().toDate(),
            yesterday: moment().add(-1,'days').toDate(),
            chosenCustomDate: moment().format('YYYY-MM-DD'),
            modalVisible: false,
            searchText: null,
            allContacts: [],
            filteredContacts: [],
            selectedItems: this.props.value || []
        };
        this._getContactList();
    }
    
    _getContactList() {
        // Ask for permission to query contacts.
        Permissions.askAsync(Permissions.CONTACTS).then(permission => {
            if (permission.status !== 'granted') {
                return;
            }
            Contacts.getContactsAsync({
                fields: [
                    Contacts.PHONE_NUMBERS,
                    Contacts.EMAILS,
                    Contacts.IMAGE
                ],
                sort: Contacts.SortTypes.FirstName,
                pageSize: 0,
                pageOffset: 0,
            }).then(contacts => {
                this.setState({ allContacts: contacts.data});
                this._filterContacts(this.state.searchText, contacts.data);
            });
        });
    }

    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
        this._getContactList();
    }

    _renderAvatar = (item)=> {
        if (item.imageAvailable){
            return (
                <Image style={styles.avatar} source={item.image} width={32} height={32} />
            )
        }else{
            return (
                <Image style={styles.avatar} source={Images.defaultAvatar} width={32} height={32} />
            )
        }
    }
    _changeSelect= (item) => {
        let selectedItems = this.state.selectedItems;

        if(this.props.single){
            selectedItems = [item];
        }else{
            existedList = R.filter((ele)=>{
                return ele.id == item.id;
            },selectedItems);
    
            if(existedList.length > 0){
                selectedItems = R.filter((ele)=>{
                    return ele.id != item.id;
                }, selectedItems);
            }else{
                selectedItems.push(item);
            }
        }
       
        this.setState({selectedItems: selectedItems});

        if(this.props.onChange){
            this.props.onChange(selectedItems);
        }
    }

    _renderChecked = (item) => {
        checked = R.filter((ele) => {
            return ele.id == item.id;
        }, this.state.selectedItems).length > 0;

        if (checked) {
            return (
                <Icon.MaterialCommunityIcons style={styles.checkedIcon} size={24} name="checkbox-marked-circle" />
            )
        } 
    }
    _renderBalance = (item) => {
        let balance = getContactBalance(this.props.transactions, item.id);
        return balance!=null && (balance >0 || balance < 0) && (<ContactBalance balance={balance}/>)
    }
    _renderContact = ({ item }) => {
        return (
            <TouchableOpacity onPress={()=>{ this._changeSelect(item) }} style={styles.card}>
                {this._renderAvatar(item)}
                <View style={{flex: 1}}>
                    <AvenirText style={styles.contactName} weight="demi">{item.name}</AvenirText>
                    <AvenirText style={styles.contactPhone}>{getPhonenumber(item)}</AvenirText>
                </View>
                {this._renderBalance(item)}
                {this._renderChecked(item)}
            </TouchableOpacity>
        )
    }

    _renderContactHeader = ({section}) =>{
        return (
            <AvenirText weight="demi" style={styles.contactGroup}>{section.title}</AvenirText>
        )
    }

    _filterContacts = (keyword, contacts)=>{
        if(!contacts){
            contacts = this.state.allContacts;
        }
        filteredData = R.filter((item) => {
            return !keyword || (keyword && item.name?item.name.includes(keyword):false)
        },contacts);

        groupedData = R.reduceBy((acc,item)=>{
            return acc.concat(item);
        }, [], (item)=>{
            return item.name?item.name[0].toUpperCase(): '#';
        } ,filteredData);

        var results = [];
        Object.keys(groupedData).forEach(function(key){
            results.push({
                title: key,
                data: groupedData[key]
            })
        });

        this.setState({filteredContacts: results});
    }

    _renderHeader = () => {
        return (
            <SearchBar 
                placeholder="Name, phone or card number" 
                lightTheme 
                autoCorrect={false} 
                onChangeText={this._filterContacts} 
                containerStyle={{ backgroundColor: 'transparent' }} 
                inputStyle={{ backgroundColor: 'transparent' }} 
            />
        );
    };

    _renderSelectedNames = () =>{
        const nameList =R.map((item)=>{
            return item.name;
        },this.state.selectedItems);
        return nameList.join(',');
    }
    
    _doneButton = () =>{
        this.setState({modalVisible: false})
    }


    _renderSelectedContact = () => {
        if(this.state.selectedItems.length){
            let item = this.state.selectedItems[0];

            return (
                <TouchableOpacity style={styles.buttonToggle} onPress={() => {!this.props.disabled && this._setModalVisible(true)}}>
                    {this._renderAvatar(item)}
                    <View style={{flex: 1}}>
                        <AvenirText style={styles.contactName} weight="demi">{item.name}</AvenirText>
                        <AvenirText style={styles.contactPhone}>{getPhonenumber(item)}</AvenirText>
                    </View>
                    {this._renderBalance(item)}
                </TouchableOpacity>
            )
        }

        return (
            <TouchableOpacity style={styles.buttonToggle} onPress={() => {!this.props.disabled && this._setModalVisible(true)}}>
                <Icon.Ionicons style={styles.toggleIcon} name="ios-contact" size={Styles.inputIconSize}/>
                <AvenirText style={styles.buttonLabel}>{this.props.placeholder || 'Select a contact'}</AvenirText>
            </TouchableOpacity>
        )
        
    }

    render() {
        return (
            <View style={{position: 'relative'}}>
                {this._renderSelectedContact()}
                {
                    !this.props.disabled &&
                    (
                        <AnimatedModal
                            title="Contacts" 
                            searchInputComponent={this._renderHeader}
                            visible={this.state.modalVisible}
                            onDonePress={this._doneButton}
                            onHideModal={this._doneButton}
                            contentContainerStyle={{backgroundColor: '#fff'}}
                        >
                            <SectionList
                                initialNumToRender = {30}
                                sections={this.state.filteredContacts}
                                renderItem={this._renderContact}
                                renderSectionHeader={this._renderContactHeader}
                                keyExtractor={(item, index) => index}
                                style={{ height: Layout.window.height - 300, backgroundColor: '#fff', overflow: 'visible', marginTop: 85 }}
                            />
                        </AnimatedModal>
                    )
                }
                
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        transactions: state.transactions,
    }
};
export default connect(mapStateToProps, null)(ContactPicker);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'rgba(0,0,0,.5)',
    },
    buttonToggle:{
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10
    },
    toggleIcon:{
        color: Colors.textGray,
        width: 25,
        textAlign: 'center'
    },
    content: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0, 
        paddingTop: 92,
        backgroundColor: '#fff',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        overflow: 'hidden'
    },
    button: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    buttonLabel: {
        textAlign: 'center',
        marginTop: 3,
        marginLeft: 10
    },
    mainButton: {
        backgroundColor: Colors.mainColor
    },
    mainButtonLabel:{
        color: '#fff'
    },
    header:{
        paddingTop: 15,
        paddingLeft: 15,
        paddingBottom: 0,
        // backgroundColor: '#F8F8F8',
        // borderBottomColor: Colors.borderColor,
        // borderBottomWidth: 1,
    },
    headerTitle: {
        textAlign: 'left',
        fontSize: 26,
    },
    card:{
        flexDirection:'row',
        alignItems: 'center',
        alignContent: 'center',
        padding: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderColor
    },
    avatar:{
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 10,
    },
    contactName:{
        fontSize: 16
    },
    contactPhone:{
        color: Colors.textGray
    },
    searchBarWrap:{
        position:'absolute',
        top: 0,
        left: 0,
        right: 0
    },
    contactGroup:{
        fontSize: 18,
        paddingLeft: 20,
        backgroundColor: '#fff',
        paddingTop: 10
    },
    checkedIcon:{
        color: Colors.mainColor,
        marginLeft: 10
    },
    balanceContainer:{
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#EAFCEF',
        borderRadius: 40,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    balanceValue:{
        marginLeft: 5,
        fontSize: 12
    },
    balanceText:{
        fontSize: 12
    },
    balanceRedContainer: {
        backgroundColor: '#FFEBEB',
    },
    dollarCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        marginLeft: 5,
        overflow: 'hidden',
        textAlign: 'center',
        alignContent:'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dollarCircleBlue:{
        backgroundColor: '#00DD52',
    },
    dollarCircleRed: {
        backgroundColor: '#FF004F'
    }
  });