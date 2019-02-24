import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { AccountTypeButton, RoundedButton , AvenirText, IconBackground} from '../../components';
import {settingsOperations} from '../../modules/settings';
import Colors from '../../constants/Colors';
import { connect } from 'react-redux';
import images from '../../constants/Images';
import Carousel from 'react-native-snap-carousel';
import LottieView from 'lottie-react-native';
import AccountTypes from '../../constants/AccountTypes';
import screens from '../../constants/screens';

const horizontalMargin = 5;
const sliderWidth = Dimensions.get("window").width;
const slideWidth = 110;
const itemWidth = slideWidth + horizontalMargin * 2;
const animationWidth = 300;

class AccountTypeChooserScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
      return{
        headerTitle: 'Select Account Type',
        headerRight: null,
        tabBarVisible: false,
      }
    };
  
    constructor(props) {
      super(props);
      this.state = {
        selectedType: AccountTypes.Default
      }
    }

    _changeSelectedType = (type, index)=>{
      this.setState({ selectedType: type });
      this._carousel.snapToItem(index);
      this._previewcarousel.snapToItem(index);
    }
   
    _renderItem = ({ item, index }) => {
      return (
        <AccountTypeButton 
          onPress={() => this._changeSelectedType(item.type, index)} 
          color={item.color} 
          image={item.image} 
          name={item.name} 
          value={item.type} 
          selectedType={this.state.selectedType}/>
      );
    }

    _renderAnimate =({ item, index }) => {
      return (
        <View>
          <View style={{ alignItems: 'center', marginBottom: 40 }}>
            <AvenirText weight="demi" style={{ fontSize: 28, marginBottom: 20, color: '#333' }}>{item.title}</AvenirText>
            <AvenirText style={{ fontSize: 18, textAlign: "center", color: '#999' }}>{item.description}</AvenirText>
          </View>

          <IconBackground width={animationWidth}>
            <LottieView
              source={item.animation}
              autoPlay
              loop
              style={[item.animationStyles, { width: animationWidth }]}
            />
          </IconBackground>
        </View>
      );
    }

    render() {
      const accountTypes = [
        {
          type: AccountTypes.Default,
          name: 'Default',
          title: 'Default Account',
          description: 'You can create and manage transactions by yourself',
          image: images.wallet,
          color: '#33BDA6',
          animation: require('../../assets/animations/atm.json'),
          animationStyles: { marginTop: -20 }
        },
        {
          type: AccountTypes.Credit,
          name: 'Credit Card',
          title: 'Credit Card',
          description: 'Manage your credit card for buy goods and pay later',
          image: images.mastercard,
          color: '#3C80AD',
          animation: require('../../assets/animations/credit_card.json'),
          animationStyles: {}
        },
        {
          type: AccountTypes.Saving,
          name: 'Savings',
          title: 'Savings Your Money',
          description: 'A wallet which you can manually note all your savings',
          image: images.save,
          color: '#273B7A',
          animation: require('../../assets/animations/coinpig.json'),
          animationStyles: {}
        },
      ];

      return (
        <View
          style={[styles.container]}
          >
          <View style={styles.previewContainer}>
            <Carousel
              scrollEnabled={false}
              ref={(c) => { this._previewcarousel = c; }}
              data={accountTypes}
              renderItem={this._renderAnimate}
              sliderWidth={300}
              itemWidth={300}
              removeClippedSubviews={false}
            />
          </View>
          <View style={styles.carouselContainer}>
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={accountTypes}
              renderItem={this._renderItem}
              selectedType={this.state.selectedType}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              paddingHorizontal={horizontalMargin} 
              activeSlideAlignment="center"
              activeSlideOffset={0}
              layoutCardOffset={0}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              extraData={this.state}
              removeClippedSubviews={false}
          />
          </View>
          <RoundedButton onPress={() => { this.props.navigation.navigate(screens.AccountDetail, {type: this.state.selectedType}) }}>
            Continue
          </RoundedButton>
        </View>
      );
    }
  }

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
    settings: state.settings
  }
};
export default connect(mapStateToProps, settingsOperations)(AccountTypeChooserScreen);
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.bodyColor,
    },
    previewContainer:{
      flex: 1,
      padding: 40,
      alignItems: 'center',
    },
    carouselContainer:{
      height: 130,
    },
    button:{
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      backgroundColor: Colors.mainColor,
      color: '#fff',
      marginBottom: 20,
      paddingTop: 18,
      paddingBottom: 15,
      marginLeft: 15,
      marginRight: 15,
    },
    animationContainer: {
      backgroundColor: Colors.iconBackgroundColor,
      width: animationWidth,
      height: animationWidth,
      borderRadius: animationWidth,
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
    },
  });
  