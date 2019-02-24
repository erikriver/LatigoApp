import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    SegmentedControlIOS,
    FlatList
} from 'react-native';
import { Icon } from 'expo';
import { AvenirText } from '../text/StyledText';
import { withNavigation } from 'react-navigation';
import {IconShower} from '../icon/index';
import { connect } from 'react-redux';
import R from 'ramda';
import { AnimatedModal } from '../modal';
import { categoriesTypes } from "../../constants/Categories";
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

class CategoryPicker extends React.Component {
    constructor(props){
        super(props);
        
        let selectedCategory = 1;
        if(this.props.selectedTab){
            switch(this.props.selectedTab){
                case categoriesTypes.debtLoan: selectedCategory=0; break;
                case categoriesTypes.expense: selectedCategory=1; break;
                case categoriesTypes.income: selectedCategory=2; break;
            }
        }
        this.state= {
            value: this.props.value,
            modalVisible: this.props.autoShow?true:false,
            selectedCategory: selectedCategory,
            disabledSwipeDown: false,
            activeCategory: this._getActiveCategory(this.props.value),
            categories: this._getCategories(selectedCategory)
        }
    }

    _allowScroll = (scrollEnabled) => {
        this.setState({ scrollEnabled: scrollEnabled })
    }

    _getActiveCategory = (id) => {
        var activeAccount = this.props.categories.list[id];
        if(!activeAccount){
            return {};
        }
        return activeAccount;
    }

    _onSelectCategory = (id)=>{
        this.setState({ value: id, activeCategory: this._getActiveCategory(id)});

        if (this.props.onChange) {
            this.props.onChange(id);
        }
        this._setModalVisible(false);
    }
      
    _renderRow({item}) {
        return (
            <TouchableOpacity style={styles.rowContainer} activeOpacity={0.5} onPress={() => { this._onSelectCategory(item.id)}}>
                <View style={styles.iconContainer}>
                    <IconShower icon={ item.icon } size={42} isSquare></IconShower>
                </View>
                <View style={{ flex: '1'}}>
                    <AvenirText style={styles.subtitle}>{item.name}</AvenirText>
                </View>
                {item.isIncome?(<Icon.AntDesign style={styles.incomeIcon} name="pluscircle"/>):(<Icon.AntDesign style={styles.expenseIcon} name="minuscircle"/>)}
                
            </TouchableOpacity>
        );
    }
      
    _getCategories(selectedCategory){
        var result = [];
        R.map(category => {
            var categoryType = categoriesTypes.expense;
            switch(selectedCategory){
                case 0: categoryType = categoriesTypes.debtLoan; break;
                case 1: categoryType = categoriesTypes.expense; break;
                case 2: categoryType = categoriesTypes.income; break;
            }
            
            if(!category.parentId && category.type==categoryType){
                result.push(category);
            }
        }, this.props.categories.list);
        return result;
    }

    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    _renderSelectedCategory = () => {
        return (
            <TouchableOpacity 
                {...this.props} 
                style={styles.container} 
                activeOpacity={0.7} 
                onPress={() => { this._setModalVisible(true) }}
            >
                <View style={styles.iconInput}>
                    <IconShower isSquare key={this.state.activeCategory.icon} size={40} icon={this.state.activeCategory.icon} color="#ccc"></IconShower>
                </View>
                <View style={{flex: 1}}>
                    <AvenirText style={styles.nameInput} weight="demi">{this.state.activeCategory.name ? this.state.activeCategory.name: 'Select a category'}</AvenirText>
                </View>
            </TouchableOpacity>
        )
    }

    _changeCategoriesList = (event)=>{
        const selectedIndex = event.nativeEvent.selectedSegmentIndex;
        this.setState({selectedCategory: selectedIndex, categories: this._getCategories(selectedIndex)});
    }
    _renderHeader = ()=>{
        return (
            <View style={{padding: 10, alignItems: 'center'}}>
                <SegmentedControlIOS
                    style={{width: '80%'}}
                    values={['Debt/Loan', 'Expense', 'Income']}
                    selectedIndex={this.state.selectedCategory}
                    onChange={this._changeCategoriesList}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={{position: 'relative'}}>
                {this._renderSelectedCategory()}
                <AnimatedModal 
                    visible={this.state.modalVisible}
                    title="Category" 
                    visible={this.state.modalVisible}
                    onHideModal={() => { this.setState({ modalVisible: false}) }}
                    disabledSwipeDown={this.state.disabledSwipeDown}
                    searchInputComponent= {this._renderHeader}
                >
                    <View style={{flex:1, backgroundColor: '#fff', paddingTop: 10}}>
                        <FlatList
                            numColumns={3} 
                            data={this.state.categories}
                            renderItem = {this._renderRow.bind(this)}
                            keyExtractor={(item, index) => item.id}
                            style={styles.scrollView}
                            >
                        </FlatList>
                    </View>
                </AnimatedModal>
            </View>
            
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accounts: state.accounts,
        settings: state.settings,
        categories: state.categories
    }
};
export default withNavigation(connect(mapStateToProps, null)(CategoryPicker));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
    },
    iconInput: {
        width: 50,
        marginRight: 10
    },
    labelContainer:{
        paddingTop: 5
    },
    nameInput: {
        marginTop: 3,
        fontSize: 16,
    },
    rowContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#efefef',  
        margin: 5,
        borderRadius: 4,
        maxWidth: Layout.window.width/3 -10     
    },
    iconContainer:{
        marginBottom: 5,
        position: 'relative'
    },
    incomeIcon: {
        position: 'absolute',
        top: 5,
        right: 10,
        fontSize: 14,
        overflow: 'hidden',
        textAlign: 'center',
        color: Colors.mainColor,
    },
    expenseIcon: {
        position: 'absolute',
        top: 5,
        right: 10,
        fontSize: 14,
        overflow: 'hidden',
        textAlign: 'center',
        color: Colors.warningColor,
    },
    subtitle: {
        fontSize: 13,
        lineHeight: 14,
        marginTop: 5,
        color: '#333',
    },
    text: {
        fontSize: 14,
    },
    scrollView: {
        marginTop: 95,
        overflow: 'visible',
        marginBottom: 20,
    }
});
