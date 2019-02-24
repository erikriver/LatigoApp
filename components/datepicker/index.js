import React, {Component} from 'react';
import { StyleSheet, Modal, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Icon, BlurView } from 'expo';
import { AvenirText } from '../text/StyledText';
import Colors from '../../constants/Colors';
import moment from 'moment';
import Layout from '../../constants/Layout';
import { Calendar, CalendarList } from 'react-native-calendars';
import { AnimatedModal } from '../modal';

export class Datepicker extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: moment(),
            today: moment().toDate(),
            yesterday: moment().add(-1,'days').toDate(),
            chosenCustomDate: moment().format('YYYY-MM-DD'),
            modalVisible: false,
            showCustom: false,
      };
    }
  
    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    _backButtonEvent =() =>{
        if(this.state.showCustom){
            this.setState({showCustom: false});
        }else{
            this.setState({modalVisible: false});
        }
    }

    _customDateToggle = (visible) => {
        this.setState({showCustom: visible});
    }

    _setDate = (date) => {
        this.setState({date: moment(date), chosenCustomDate: date});
        this._setModalVisible(false);
        if(this.props.onChange){
            this.props.onChange(moment(date).toDate());
        }
    }

    _setCustomDate = () => {
        this._setDate(this.state.chosenCustomDate);
        this._setModalVisible(false);
    }

    _getMarkedDate = () =>{
        var result = {};
        result[this.state.chosenCustomDate] = { selected: true, marked: true, selectedColor: Colors.mainColor };
        return result;
    }
    render() {
        return (
            <View style={{position: 'relative'}}>
                <TouchableOpacity onPress={() => {this._setModalVisible(true)}}>
                    <AvenirText style={{...this.props.style}}>{moment(this.state.date).format('MMMM Do YYYY')}</AvenirText>
                </TouchableOpacity>
                <AnimatedModal
                    visible={this.state.modalVisible}
                    title="Choose a date" 
                    searchInputComponent={this._renderHeader}
                    visible={this.state.modalVisible}
                    onDonePress={this._setCustomDate}
                >
                    <View style={{...styles.datepicker}}>
                        <CalendarList
                            style={{overflow:'visible'}}
                            calendarWidth={Layout.window.width}
                            markedDates={this._getMarkedDate()} 
                            dynamicHeight={true}
                            onDayPress={(day) => { this.setState({ chosenCustomDate: day.dateString }) }}
                        />
                    </View>
                    <View style={{...styles.optionList}}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {this._setDate(this.state.today);}}
                            style={{...styles.button, ...styles.optionItem}}
                            >
                            <AvenirText style={styles.buttonLabel} weight="demi">Today</AvenirText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => { this._setDate(this.state.yesterday); }}
                            style={{...styles.button, ...styles.optionItem}}
                            >
                            <AvenirText style={styles.buttonLabel} weight="demi">Yesterday</AvenirText>
                        </TouchableOpacity>
                    </View>
                </AnimatedModal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'rgba(0,0,0,.5)',
    },
    content: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
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
        color: Colors.mainColor,
        textAlign: 'center',
        fontSize: 16,
        marginTop: 3,
    },
    mainButton: {
        backgroundColor: Colors.mainColor
    },
    mainButtonLabel:{
        color: '#fff'
    },
    optionList:{
        overflow: 'hidden',
        paddingBottom: 40,
        backgroundColor: '#fff',
    },
    optionItem: {
        borderRadius: 0,
        borderTopColor: Colors.borderColor,
        borderTopWidth: 1,
    },
    datepicker: {
        flex: 1,
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderBottomColor: Colors.borderColor,
        borderBottomWidth: 1,
        paddingTop: 60,
    },
    header:{
        padding: 20,
        backgroundColor: '#F8F8F8',
        borderBottomColor: Colors.borderColor,
        borderBottomWidth: 1,
        alignItems: 'center',
        alignContent: 'center',
    },
    headerTitle: {
        textAlign: 'center',
        fontSize: 16,
        color: Colors.textGray
    }
  });