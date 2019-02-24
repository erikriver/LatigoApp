import React from "react";
import { StyleSheet, View, TouchableOpacity, FlatList, Image } from "react-native";
import { AccountCarousel, ViewWithTitle, DefaultPanel, AvenirText, Value, ImagePicker } from "../components";
import { Icon } from 'expo';
import Unsplash, { toJson } from 'unsplash-js/native';

import { connect } from "react-redux";
import { accountsOperations } from "../modules/accounts";
import {
  accountTotalSpend,
  accountTotalIncome
} from "../utils/transactionHelper";
import screens from "../constants/screens";
import { dateFormat } from "../utils/dateHelper";
import moment from "moment";
import Carousel from "react-native-snap-carousel";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";
class PlansScreen extends React.Component {
  static navigationOptions = () => {
    return {
      headerTransparent: true
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      summaryData: [
        { title: "Ingresos", value: 5978.22 },
        { title: "Gastos", value: 4553.12 },
        { title: "Presupuesto", value: 12000 }
      ],
      plans: [
        {
          note: 'Viaje a Oaxaca',
          limit: 20000,
          value: 5400
        }
      ],
      totalSpend: accountTotalSpend(
        this.props.transactions,
        this.props.settings.activeAccount
      ),
      totalReceive: accountTotalIncome(
        this.props.transactions,
        this.props.settings.activeAccount
      )
    };
  }

  _openCategorySelect = type => {
    this.props.navigation.navigate(screens.TransactionDetail, {
      categoryType: type
    });
  };

  _renderHeaderItem = ({ item, index }) => {
    return (
      <View style={styles.summaryBox} key={"carousel_" + index}>
        <AvenirText style={styles.summaryTitle}>{item.title}</AvenirText>
        <View style={styles.summaryValueFlex}>
          <Value style={styles.summaryValue} weight="demi" value={item.value} />
          <Icon.Ionicons name="ios-arrow-forward" color={Colors.textGray}/>
        </View>
      </View>
    )
  };

  render() {
    const headerWidth = Layout.window.width - 30;
    return (
      <ViewWithTitle
        title="Plan de ahorro"
        subTitle={dateFormat(moment(), "dddd, DD MMMM")}
      >
        <View style={styles.headerContainer}>
          <Carousel
            layout={"default"}
            activeSlideAlignment="start"
            data={this.state.summaryData}
            renderItem={this._renderHeaderItem}
            layoutCardOffset={0}
            sliderWidth={headerWidth}
            itemWidth={headerWidth/2}
            activeSlideOffset={0}
            inactiveSlideScale={1}
            onSnapToItem={index => this.setState({ activeSlide: index })}
          />
        </View>
        <DefaultPanel 
        title="Planes"
          largeHeader
          rightComponent={<TouchableOpacity onPress={() => { this.props.navigation.navigate(screens.AccountType) }}><Icon.AntDesign name="plus" color={Colors.mainColor} size={24} /></TouchableOpacity>}>
          <ImagePicker/>
        </DefaultPanel>
        <DefaultPanel 
          title="Presupuestos"
          largeHeader
          rightComponent={<TouchableOpacity onPress={() => { this.props.navigation.navigate(screens.AccountType) }}><Icon.AntDesign name="plus" color={Colors.mainColor} size={24} /></TouchableOpacity>}>

          <FlatList
            data={this.state.photos}
            renderItem={({ item }) => {
              return (<View><Image source={{ uri: item.urls.small }} style={{ width: Layout.window.width, height: 200 }} /></View>)
            }}
          />

        </DefaultPanel>
      </ViewWithTitle>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    accounts: state.accounts,
    settings: state.settings,
    transactions: state.transactions
  };
};
export default connect(
  mapStateToProps,
  accountsOperations
)(PlansScreen);

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.backgroundColor,
    paddingHorizontal: 15,
    overflow: 'visible'
  },
  summaryBox: {
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#333",
    shadowRadius: 10,
    shadowOpacity: .1,
    marginVertical: 20,
    paddingHorizontal: 15,
    paddingTop: 30,
    paddingBottom: 10,
    marginRight: 15,
  },
  summaryTitle: {
    color: Colors.textGray,
    fontSize: 12
  },
  summaryValueFlex: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 18
  }
});
