import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
    ScrollView,
    FlatList,
    SafeAreaView
} from 'react-native';
import R from 'ramda';
import { AccountTypeButton, AvenirText, Icon, SearchBar } from '../../components';
import { settingsOperations } from '../../modules/settings';
import Colors from '../../constants/Colors';
import { connect } from 'react-redux';
import currencies from '../../constants/Currency';
import flags from '../../constants/Flags';

class IconPickerScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Select Account Currency',
            headerRight: null,
            tabBarVisible: false,
        }
    };

    constructor(props) {
        super(props);

        this.state= {
            search: null,
            value: this.props.navigation.state.params.value,
            filtedCurrencies: this._filterData()
        }
    }

    _filterData = (keyword)=>{
        var results = [];
        Object.keys(currencies).map((key)=>{
            const currency = currencies[key];
            if(flags[key]){
                if(
                    !keyword ||
                    (keyword && currency.name.includes(keyword))||
                    (keyword && currency.code.includes(keyword))
                ){
                    results.push(currency);
                }
            }
        })
        return results;
    }

    _onSelect = (key) => {
        if (this.props.navigation.state.params.callback){
            this.props.navigation.state.params.callback(key);
        }
        this.props.navigation.goBack();
    }

    _renderCheckedIcon = (code)=>{
        if(this.state.value==code){
            return (<Icon.Ionicons name="ios-checkmark" color={Colors.mainColor} size={26}/>)
        }
    }

    _renderRow = ({item}) => {
        return (
            <TouchableOpacity key={item.code} style={styles.button} onPress={() => this._onSelect(item.code)}>
                <View style={styles.buttonContainer}>
                    <Image source={flags[item.code]} style={styles.flag}/>
                    <View style={styles.label}>
                        <AvenirText style={styles.name}>{item.name}</AvenirText>
                        <AvenirText style={styles.code}>{item.code} - {item.symbol}</AvenirText>
                    </View>
                    {this._renderCheckedIcon(item.code)}
                   
                </View>
            </TouchableOpacity>
        )
    }

    _changeSearchText = (text) =>{
        this.setState({ 
            search:text, 
            filtedCurrencies: this._filterData(text) 
        });
    }

    render() {
        return (
        <SafeAreaView>
           <SearchBar placeholder="Search..." lightTheme onChangeText={this._changeSearchText} containerStyle={{backgroundColor: '#fff'}} />
                
            <FlatList
                data={this.state.filtedCurrencies}
                extraData={this.state}
                keyExtractor={(item, index) => item.code}
                renderItem={this._renderRow}
            />
        </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accounts: state.accounts,
        settings: state.settings
    }
};
export default connect(mapStateToProps, settingsOperations)(IconPickerScreen);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
    },
    previewContainer: {
        flex: 1,
        padding: 40,
        alignItems: 'center',
    },
    iconsContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    button: {
        flex: 1
    },
    buttonContainer:{
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems:'center',
        padding: 7
    },
    flag:{
        height: 32, marginRight: 10,borderRadius: 2,
    },
    label: {
        flex: 1
    },
    name: {

    },
    code: {
      color: '#777'
    }
});
