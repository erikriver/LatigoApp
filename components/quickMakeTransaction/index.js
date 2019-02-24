import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { getMostUsedCategories } from '../../utils/categoryHelper';
import { HorizonButton } from '../buttons/StyledButton';
import { getIcon } from '../../utils';
import screens from '../../constants/screens';

const limitItems = 6;
class QuickMakeTransaction extends React.Component {
    constructor(props) {
      super(props)
    
      this.state = {
         categories : getMostUsedCategories(this.props.categories)
      };
    //   console.log(this.state.categories);
    };
    
    _renderCategories =() =>{
        let items = [];
        listIndex = Object.keys(this.state.categories);
        for(var i=0; i<limitItems; i++){
            const category = this.state.categories[listIndex[i]];
            items.push(
                <HorizonButton key={category.id} style={styles.icon} text={category.name} icon={getIcon(category.icon)} onPress={() => { this.props.navigation.navigate(screens.TransactionDetail, {category: category.id})}}></HorizonButton>
            )
        }
        return items;
    }

    render() {
        return (
            <View {...this.props} style={{...styles.container, ...this.props.style}}>
                {this._renderCategories()}
            </View>
        );
    }
}

export default withNavigation(QuickMakeTransaction);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingHorizontal: 30,
        overflow: 'hidden',       
    },
    icon: {
        width: '50%',
        marginBottom: 40
    }
});
