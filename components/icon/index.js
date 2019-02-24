import React from 'react';
import {
    StyleSheet,
    Image
} from 'react-native';
import { getIcon, getIconColor, isIconFullSize } from '../../utils';
import { SmallIconBackground } from '../background/smallIconBackground';

export class IconShower extends React.Component {
    constructor(props){
        super(props);
        
        let backgroundColor = this.props.icon ? getIconColor(this.props.icon) : (this.props.color ? this.props.color : getIconColor(''));
        
        this.state = {
            icon: this.props.icon ? getIcon(this.props.icon) : getIcon(''),
            color: backgroundColor,
            iconSize: isIconFullSize(this.props.icon) ? this.props.size : this.props.size * (this.props.isSquare ? 50 : 70) / 100
        }
    }
    render() {
        return (
            <SmallIconBackground {...this.props} background={this.state.color} style={styles.iconContainer} width={this.props.size} height={this.props.size}>
                <Image key={this.props.icon} style={{ width: this.state.iconSize, height: this.state.iconSize}} source={this.state.icon}/>
            </SmallIconBackground>
        );
    }
}

const styles = StyleSheet.create({
    iconContainer:{
        alignContent:'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
