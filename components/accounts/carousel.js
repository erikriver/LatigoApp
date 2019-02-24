import Carousel, { Pagination  } from 'react-native-snap-carousel';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import Value from '../value';
import Colors from '../../constants/Colors';
import { IconShower } from '../icon';
import { AvenirText } from '../text/StyledText';

const horizontalMargin = 10;
const slideWidth = Dimensions.get("window").width-20;

const sliderWidth = Dimensions.get("window").width;
const itemWidth = slideWidth - horizontalMargin * 2;

export class AccountCarousel extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      accounts: this.props.accounts,
      activeSlide: 0
    }
  }

  _renderItem ({item, index}) {
      return (
        <View style={[styles.accountBox, {backgroundColor: item.color}]} key={'carousel_' + index}>
          <View style={styles.accountHeader}>
            <View style={styles.accountHeaderInner}>
              <View style={styles.iconContainer}>
                  <IconShower isSquare={true} size={42} icon={item.icon}></IconShower>
              </View>
              <View style={styles.nameContainer}>
                <AvenirText style={styles.accountName}>{item.name}</AvenirText>
                <AvenirText style={styles.accountCurrency}>{item.currency}</AvenirText>
              </View>
            </View>
          </View>
          <View style={styles.accountBalance}>
            <Value weight="demi" value={item.balance} style={{fontSize: 36}}></Value>
          </View>
        </View>
      );
  }
  get pagination() {
    const { accounts, activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={accounts.length}
        activeDotIndex={activeSlide}
        containerStyle={{ padding: 0, marginTop: -20, marginBottom: -20}}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 5,
          marginHorizontal: 0,
          marginVertical: 0,
          backgroundColor: Colors.mainColor
        }}
        inactiveDotStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
        inactiveDotOpacity={0.8}
        inactiveDotScale={0.9}
      />
    );
  }
  
  render () {
    return (
      <View>
        <View style={styles.container}>
          <Carousel
            layout={'default'}
            ref={(c) => { this._carousel = c; }}
            data={this.state.accounts}
            renderItem={this._renderItem}
            windowSize={sliderWidth}
            layoutCardOffset={0}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            activeSlideOffset={0}
            inactiveSlideScale={.95}
            onSnapToItem={(index) => this.setState({ activeSlide: index })}
          />
        </View>
        {this.pagination}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
  },
  accountBox: {
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#333",
    shadowRadius: 10,
    shadowOpacity: .1,
    height: 150,
    zIndex: 101,
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  accountHeader: {
    position: 'relative',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    height: 70,
  },
  accountHeaderInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  accountBalance:{
    paddingTop: 30 
  },
  iconContainer:{
    marginRight: 10
  },
  accountName:{
    fontSize: 18
  },
  accountCurrency:{
    color: Colors.textGray,
    fontSize: 14,
    marginTop: 0
  }
});
