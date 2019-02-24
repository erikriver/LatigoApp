import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { Icon } from 'expo';
import { getIcon } from '../../utils';
import { withNavigation } from 'react-navigation';
import { IconShower } from '../icon';
import screens from '../../constants/screens';

class IconPicker extends React.Component {
    _onSelectIcon = (icon) =>{
        this.setState({ icon: icon});
        if (this.props.onSelect){
            this.props.onSelect(icon);
        }
    }

    constructor(props){
        super(props);
        this.state= {
            icon: this.props.icon ? this.props.icon : '003coins1'
        }
    }
    render() {
        return (
            <TouchableOpacity {...this.props} style={styles.container} activeOpacity={0.7} onPress={() => { this.props.navigation.navigate(screens.IconPicker, {callback: this._onSelectIcon})}}>
                <View style={styles.iconContainer}>
                    <IconShower size={40} key={this.state.icon} icon={this.state.icon}></IconShower>
                    {/* <Image style={styles.icon} source={this.state.icon} /> */}
                </View>
                <Icon.Ionicons style={{ color: '#333' }} name="md-arrow-dropdown" />
            </TouchableOpacity>
        );
    }
}

export default withNavigation(IconPicker);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 4,
        overflow: 'hidden',
    },
    iconContainer: {
        marginRight: 10
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 5,
        color: '#333',
        fontWeight: 'bold',
    },
    text: {
        fontSize: 14,
    },
});
