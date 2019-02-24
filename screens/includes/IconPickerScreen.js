import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import { IconShower, AvenirText } from '../../components';
import { settingsOperations } from '../../modules/settings';
import Colors from '../../constants/Colors';
import { connect } from 'react-redux';
import images from '../../constants/Icons';
import Layout from '../../constants/Layout';

const iconMargin = 7;
const iconWidth = Layout.window.width/6 - iconMargin*2;

class IconPickerScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Select Account Icon',
            headerRight: null,
            tabBarVisible: false,
        }
    };

    constructor(props) {
        super(props);
    }

    _onSelect = (key) => {
        if (this.props.navigation.state.params.callback){
            this.props.navigation.state.params.callback(key);
        }
        this.props.navigation.goBack();
    }

    _renderIcons = () => {
        let icons = [];
        Object.keys(images).map((key)=>{
            icons.push(
                <TouchableOpacity key={key} style={styles.button} onPress={() => this._onSelect(key)}>
                    <IconShower icon={key} size={iconWidth} isSquare/>
                    <AvenirText>{key}</AvenirText>
                </TouchableOpacity>
            );
        })
        return icons;
    }

    render() {
        return (
            <ScrollView
                style={[styles.container]}
            >
                <View style={styles.iconsContainer}>
                    {this._renderIcons()}
                </View>
            </ScrollView>
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 20,
        paddingBottom: Layout.bottomOffset,
    },
    button: {
        width: iconWidth,
        margin: iconMargin,
    }
});
