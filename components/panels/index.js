import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { AvenirText } from '../text/StyledText';
import Colors from '../../constants/Colors';

export class DefaultPanel extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        let headerTextStyle = {...styles.headerText};
        if(this.props.largeHeader){
            headerTextStyle.fontSize = 20
        }
        return (
            <View {...this.props} style={[styles.container, this.props.containerStyle ? this.props.containerStyle: {}]}>
                <View style={[styles.header, {display: this.props.notitle?'none':'flex'}]}>
                    <View>
                        <AvenirText style={headerTextStyle} weight="demi">{this.props.title}</AvenirText>
                        {
                            (this.props.description) && <AvenirText  style={styles.headerDescription}>{this.props.description}</AvenirText>
                        }
                    </View>
                    {this.props.rightComponent?this.props.rightComponent:null}
                </View>
                <View style={styles.body}>
                    {this.props.children}
                </View>
           </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    header: {
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 30,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 14
    },
    headerDescription:{
        color: Colors.textGray,
        marginTop: 0
    }
});
