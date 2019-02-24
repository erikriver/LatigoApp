import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Alert
} from 'react-native';
import { CalButton } from '../../components';
import { withGlobalize } from 'react-native-globalize';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import math from 'mathjs';

const operators = ['÷', '×', '+', '-'];
const defaultArray = [[0]];

const buttonWidth = Layout.window.width/4;
const buttonHeight = buttonWidth*3/4;
class CalculatorScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Enter Money',
            headerRight: null,
            tabBarVisible: false,
        }
    };

    constructor(props) {
        super(props);

        var debugArray = [
            // ['5', '6'], '+', ['4'], '×', ['2'], '+', ['3'], '÷' , ['1']
        ];

        var value = 0;
        var groups = debugArray.length?debugArray:defaultArray;
        if (this.props.navigation.state.params.value>=0){
            value = this.props.navigation.state.params.value;
            groups = [
                value.toString().split('')
            ]
        }
        this.state = {
            text: this._formatNumber(value),
            value: value,
            fontSize: 20,
            groups: groups,
            displayDone: true
        }
    }

    componentDidMount(){
        this._setFontSize();
    }

    _getGroupParsedValue = (group) => {
        return parseFloat(group.join('') || 0)
    }

    _formatNumber = (number) => {
        const numberFormatter = this.props.globalize.getNumberFormatter({ maximumFractionDigits: 20 });
        return numberFormatter(parseFloat(number || 0))
    }

    _setFontSize = () => {
        if (this.state.text.length > 20) {
            this.setState({ fontSize: 20 });
        } else {
            this.setState({ fontSize: 32 });
        }
    }

    _setDoneState = (groups) => {
        var isDone = true;
        groups.forEach((group) => {
            if (operators.indexOf(group) >= 0) {
                isDone=false;
            }
        })
        this.setState({ displayDone: isDone });
    }

    _onPressButton = (value) => {
        //Save groups as 
        //  [
        //      [1,2,3,.,5],
        //      '+'
        //      [6,7,8,.,9]  
        //  ]
        switch (value) {
            case '=': break;
            default:
                let groups = this.state.groups;
                var lastGroup = groups[groups.length - 1];
                //Check if last group is operators -> add new group
                if (value == 'del') {
                    if(typeof lastGroup!='string'){
                        lastGroup.pop();
                    }else{
                        lastGroup='';
                    }
                    
                    if (!lastGroup.length) {
                        groups.pop();

                        if (!groups.length) {
                            groups.push([0]);
                        }
                    }
                } else if(value == 'C'){
                    groups = defaultArray;
                } else if (operators.indexOf(value) >= 0) {//Check if press operator
                    if (operators.indexOf(lastGroup) >= 0) {
                        groups[groups.length - 1] = value;
                    } else {
                        groups.push(value);
                    }
                } else if (operators.indexOf(lastGroup) >= 0) { //Check if start new group
                    groups.push([value]);
                } else { //Add to last group
                    //Check if last group has '.' => return
                    if (value == '.' && lastGroup.indexOf('.') >= 0) {
                        return;
                    }

                    if (lastGroup[0] == '0') {
                        lastGroup.splice(0, 1);
                    }

                    lastGroup.push(value);
                    groups[groups.length - 1] = lastGroup;
                }

                var text = '';
                groups.forEach((group) => {
                    if (operators.indexOf(group) >= 0) {
                        text += group;
                    } else {
                        var tempGroup = [].concat(group);
                        //Check if last is '.' => remove from list
                        var addDotInLast = false;
                        if (tempGroup[tempGroup.length - 1] == '.') {
                            tempGroup.pop();
                            addDotInLast = true;
                        }
                        text += this._formatNumber(tempGroup.join('')) + (addDotInLast ? '.' : '');
                    }
                })

                this.setState({ text: text, groups: groups });
                this._setDoneState(groups);

               //Set font size
               this._setFontSize();
        }
    }

    _onPressEnterButton = () => {
        var total = 0;
        const groups = this.state.groups;

        //Check if last group is operator => remove
        if (groups.length) {
            var lastgroup = groups[groups.length - 1];
            if (operators.indexOf(lastgroup[0]) >= 0) {
                groups.pop();
            }
        }

        //Parse array to number 
        var parsedGroups =  [].concat(groups);
        for (var i = 0; i < parsedGroups.length; i++) {
            var group = parsedGroups[i];
            if (typeof group != 'string'){
                parsedGroups[i] = this._getGroupParsedValue(group);
            }else{
                if (group =='×'){
                    parsedGroups[i]='*';
                } else if (group == '÷'){
                    parsedGroups[i] = '/';
                }
            }
        }

        //Calculate x and ÷ first 
        var mathExpressions = parsedGroups.join('');
        var total = math.eval(mathExpressions);
        if(isFinite(total)){
            var newGroups = [total.toString().split('')];
            this.setState({ value: total, text: this._formatNumber(total), groups: newGroups });
            this._setDoneState(newGroups);

            //Set font size
            this._setFontSize();

            //Check if done button
            if(this.state.displayDone){
                if (this.props.navigation.state.params.callback){
                    this.props.navigation.state.params.callback(total);
                }
                this.props.navigation.goBack();
                return;
            }
        }else{
            Alert.alert(
                'Wrong input',
                'Please check the math expressions',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: true }
            )
        }
    }

    _renderButton = (value) => {
        switch (value) {
            case '=':
                return (
                    <CalButton 
                        width={buttonWidth} 
                        height={buttonHeight*2} 
                        style={styles.enterButton} 
                        background={Colors.mainColor} 
                        color='#fff' 
                        value={this.state.displayDone?'DONE':'='} 
                        fontSize= {this.state.displayDone?16:24} 
                        onPress={() => { this._onPressEnterButton() }}>
                    </CalButton>
                )
            case 'del':
                return (
                    <CalButton width={buttonWidth} height={buttonHeight} value={value} onPress={() => { this._onPressButton(value) }} icon="delete"></CalButton>
                )
            default:
                return (
                    <CalButton width={buttonWidth} height={buttonHeight} value={value} onPress={() => { this._onPressButton(value) }}></CalButton>
                )
        }
    }

    render() {
        return (
            <View {...this.props} style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput style={[styles.input, { fontSize: this.state.fontSize }]} editable={false} value={this.state.text} multiline></TextInput>
                </View>
                <View style={styles.calContainer}>
                    <View style={styles.calRow}>
                        {this._renderButton('C')}
                        {this._renderButton('÷')}
                        {this._renderButton('×')}
                        {this._renderButton('del')}
                    </View>
                    <View style={styles.calRow}>
                        {this._renderButton('7')}
                        {this._renderButton('8')}
                        {this._renderButton('9')}
                        {this._renderButton('+')}
                    </View>
                    <View style={styles.calRow}>
                        {this._renderButton('4')}
                        {this._renderButton('5')}
                        {this._renderButton('6')}
                        {this._renderButton('-')}
                    </View>
                    <View style={styles.bottomRowGroup}>
                        <View style={styles.calRow}>
                            {this._renderButton('1')}
                            {this._renderButton('2')}
                            {this._renderButton('3')}
                        </View>
                        <View style={styles.calRow}>
                            {this._renderButton('0')}
                            {this._renderButton('000')}
                            {this._renderButton('.')}
                        </View>
                    </View>
                    {this._renderButton('=')}
                </View>
            </View>
        );
    }
}

export default withGlobalize(CalculatorScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputContainer: { 
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems:'center',
        justifyContent: 'space-around'
    },
    input: {
        flex: 1,
        color: Colors.mainColor,
        margin: 15,
        textAlign: 'center'
    },
    calContainer: {
        backgroundColor: '#fff',
        position: 'relative',
        borderTopWidth: 1,
        borderTopColor: '#eee'
    },
    calRow: {
        flexDirection: 'row',
        alignContent: 'stretch',
        alignItems: 'stretch'
    },
    enterButton: {
        backgroundColor: Colors.mainColor,
        color: '#fff',
        bottom: 0,
        right: 0,
        position: 'absolute',
        borderRightColor: Colors.mainColor
    },
    bottomRowGroup: {
        paddingRight: Layout.window.width/4
    }
});
