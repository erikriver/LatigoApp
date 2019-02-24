import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SegmentedControlIOS,
  Animated
} from 'react-native';
import { IconShower, AvenirText, BlurView} from '../../components';
import { categoriesTypes } from "../../constants/Categories";
import Colors from '../../constants/Colors';

import { connect } from 'react-redux';
import R from 'ramda';
import Swipeout from 'react-native-swipeout';
import { categoriesOperations } from '../../modules/categories';
import screens from '../../constants/screens';

const customHeaderHeight = 120;
class CategoryDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
      return{
        tabBarVisible: false,
        header: null,
      }
    };
    
    constructor(props) {
      super(props);

      var selectedCategory = 1;
      if(this.props.navigation.state.params){
        switch(this.props.navigation.state.params.type){
          case categoriesTypes.debtLoan: selectedCategory=0; break;
          case categoriesTypes.expense: selectedCategory=1; break;
          case categoriesTypes.income: selectedCategory=2; break;
        }
      }

      this.state = {
        scrollTop: new Animated.Value(0),
        scrollEnabled: true,
        selectedCategory : selectedCategory
      }
    }
    
    _allowScroll = (scrollEnabled) => {
      this.setState({ scrollEnabled: scrollEnabled })
    }
    
    _onSelect = (id)=>{
      this.setState({ selectedCategory: id });

      if (this.props.navigation.state.params.callback) {
        this.props.navigation.state.params.callback(id);
      }
      this.props.navigation.goBack();
    }
    
    renderRow(category, style = null) {
      var rowStyle = [styles.row];

      var swipeoutBtns = [
        {
          text: 'Edit',
          type: 'primary',
          onPress: ()=>{
            this.props.navigation.navigate(screens.CategoryDetail, {id: category.id})
          }
        },
      ]

      if (style){
        rowStyle.push(style);
      }

      return (
        <TouchableOpacity style={styles.rowContainer} activeOpacity={0.5} onPress={() => { this._onSelect(category.id)}}>
            <View style={styles.iconContainer}>
              <IconShower icon={category.icon } size={32}></IconShower>
            </View>
            <View style={{ flex: '1' }}>
                <AvenirText style={styles.subtitle} weight="demi">{category.name}</AvenirText>
            </View>
        </TouchableOpacity>
      );
    }
    
    renderCategories(categories, type){
      var result = [];
      R.map(category => {
        var categoryType = categoriesTypes.expense;
        switch(this.state.selectedCategory){
          case 0: categoryType = categoriesTypes.debtLoan; break;
          case 1: categoryType = categoriesTypes.expense; break;
          case 2: categoryType = categoriesTypes.income; break;
        }
        
        if(!category.parentId && category.type==categoryType){
          result.push(this.renderRow(category));
        }
      }, categories);
      return result;
    }
    render() {
      const categories = this.props.categories.list;
      
      return (
        <View style={styles.container}>
          <Animated.ScrollView
              style={[styles.scrollView]}
              scrollEnabled={this.state.scrollEnabled}
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: this.state.scrollTop}}}]
              )}
            >
            <Animated.View style={styles.categoriesList}>
               {this.renderCategories(categories, false)}
            </Animated.View>
          </Animated.ScrollView>
          <BlurView tint="default" intensity={100} style={{...StyleSheet.absoluteFill, height: customHeaderHeight}}>
            <View style={{flex: 1, padding: 10, paddingTop: 40, alignItems: 'center', justifyContent: 'center', borderBottomColor: Colors.borderColor, borderBottomWidth: 1}} >
                <View>
                  <AvenirText weight="demi" style={{fontSize: 16}}>Select category</AvenirText>
                </View>
                <SegmentedControlIOS
                  style={{width: '80%'}}
                  values={['Debt/Loan', 'Expense', 'Income']}
                  selectedIndex={this.state.selectedCategory}
                  onChange={(event) => {
                    this.setState({selectedCategory: event.nativeEvent.selectedSegmentIndex});
                  }}
                />
            </View>
          </BlurView>
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
export default connect(mapStateToProps, categoriesOperations)(CategoryDetailScreen);
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.bodyColor,
      position: 'relative'
    },
    scrollView:{
      // flex: 1
      position: 'absolute',
      top: customHeaderHeight,
      bottom: 0,
      left: 0,
      right: 0,
      paddingTop: 0,
      overflow: 'visible'
    },
    rowContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        paddingTop: 10,
        paddingBottom: 10,
        overflow: 'hidden',
        borderBottomWidth: 1,
        borderBottomColor: '#efefef',        
    },
    iconContainer:{
      marginRight: 10
    },
    subtitle: {
        fontSize: 14,
        lineHeight: 14,
        marginTop: 5,
        color: '#333',
    },
    text: {
        fontSize: 14,
    },
    categoriesList:{
      flex: 1,
      flexDirection: 'row'
    }
  });
  