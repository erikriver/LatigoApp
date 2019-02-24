import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import  { AvenirText } from '../text/StyledText';
import  { Icon } from 'expo';
import Colors from '../../constants/Colors';

export class CalButton extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        textOrIcon = ()=>{
            if(this.props.icon){
                return (
                    <Icon.Feather style={styles.text} name={this.props.icon} size={26}/>
                )
            }else{
                return (
                    <AvenirText style={[styles.text, {color: this.props.color || Colors.mainColor, fontSize: this.props.fontSize || 20}]} weight="demi">{this.props.value}</AvenirText>
                )
            }
        }
        return (
            <TouchableOpacity {...this.props} style={[this.props.style, styles.container, {backgroundColor: this.props.background, width: this.props.width, height: this.props.height}]} activeOpacity={0.7}>
                {textOrIcon()}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderColor: '#efefef'
    },
    text:{
        color: Colors.mainColor,
        fontSize: 20
    }
});