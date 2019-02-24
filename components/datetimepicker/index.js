import React, {Component} from 'react';
import { DatePickerIOS, View, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { AvenirText } from '../text/StyledText';
import Colors from '../../constants/Colors';
import moment from 'moment';
import { AnimatedModal } from '../modal';
import Collapsible from 'react-native-collapsible';
import { Icon } from 'expo';
import Styles from '../../constants/Styles';

export class DateTimepicker extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: this.props.value || null,
            chosenDate : this.props.value || moment().toDate(),
            modalVisible: false,
      };
    }
  
    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    _setDate = () => {
        this.setState({date: this.state.chosenDate});
        this._setModalVisible(false);
        if(this.props.onChange){
            this.props.onChange(this.state.chosenDate);
        }
    }
    _clearDate = () => {
        this.setState({date: null});
        if(this.props.onChange){
            this.props.onChange(null);
        }
    }
    render() {
        return (
            <View style={{position: 'relative'}}>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => {this._setModalVisible(true)}}>
                        <AvenirText style={{...this.props.style}}>{this.state.date ? moment(this.state.date).format('LLLL') : 'Set reminder'}</AvenirText>
                    </TouchableOpacity>
                    {
                        this.state.date ? (
                            <TouchableOpacity onPress={() => {this._clearDate()}}>
                                <Icon.MaterialCommunityIcons name="close-circle" color='#ccc' size={18}/>
                            </TouchableOpacity>
                        ): null
                    }
                </View>
                <AnimatedModal
                    title="Choose date time" 
                    visible={this.state.modalVisible}
                    onDonePress={this._setDate}
                    height = {300}
                >
                    <View style={{...styles.datepicker}}>
                        <DatePickerIOS date={this.state.chosenDate} onDateChange={(date) => this.setState({chosenDate: date})}></DatePickerIOS>
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
    button:{
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between',
        alignItems: 'center'
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