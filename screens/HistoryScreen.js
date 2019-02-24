import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SectionList,
  Animated,
  Image
} from 'react-native';

import { AccountSelector, AvenirText, Value, TransactionRow, TransactionModal, ViewWithTitle, Separator } from '../components';

import { connect } from 'react-redux';
import { accountsOperations } from '../modules/accounts';
import { filterByAccountAndDate, filterByDate, sortByDate } from '../utils/transactionHelper';
import moment from 'moment';
import Colors from '../constants/Colors';
import R from 'ramda';
import { getStartOfMonth, getEndOfMonth } from '../utils/dateHelper';
import screens from '../constants/screens';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from "react-native-underline-tabbar";
import Layout from '../constants/Layout';
import Images from '../constants/Images';
import { getAccountById } from '../utils/accountHelper';
import { getRate, getValueByCurrency } from '../utils/rateExchangeHelper';

const Tab = ({ tab, page, isTabActive, onPressHandler, onTabLayout }) => {
  const { label } = tab;
  const style = {
    marginHorizontal: 0,
    paddingVertical: 10,
  };
  const containerStyle = {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isTabActive ? Colors.backgroundColor : 'transparent',
    opacity: isTabActive ? 1 : .5,
  };
  const textStyle = {
    color: isTabActive ? Colors.mainColor : Colors.textColor,
    fontWeight: '600',
  };
  return (
    <TouchableOpacity style={style} onPress={onPressHandler} onLayout={onTabLayout} key={page}>
      <Animated.View style={containerStyle}>
        <Animated.Text style={textStyle}>{label}</Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

class HistoryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: true,
    };
  };
  constructor(props) {
    super(props);

    const defaultMonth = moment().startOf("month");
    let items = this._getItems(defaultMonth);

    const transactions = sortByDate(R.values(this.props.transactions.list));
    let months = [];
    let firstMonth = moment(transactions[transactions.length - 1].date)
      .startOf("month")
      .startOf("date");
    let lastMonth = moment(transactions[0].date)
      .startOf("month")
      .startOf("date");

    let renderingMonth = lastMonth.clone();
    while (renderingMonth.isSameOrAfter(firstMonth)) {
      months.splice(0, 0, renderingMonth.clone());
      renderingMonth = renderingMonth.subtract(1, "month");
    }

    this.state = {
      shouldShow: true,
      months: months,
      currentMonthIndex: months.length - 1,
      items: items,
      selectedMonth: defaultMonth,
      freshing: false,
      selectedItem: null,
      activeAccount: {}
    };
  }

  componentDidMount = () => {
    this._componentFocused();

    this._sub = this.props.navigation.addListener(
      "didFocus",
      this._componentFocused
    );
  };

  componentWillUnmount() {
    this._sub.remove();
  }

  _componentFocused = () => {
  };

  _getItems = month => {
    let range = {
      from: getStartOfMonth(month).toDate(),
      to: getEndOfMonth(month).toDate()
    };

    let items = {};
    let transactions = this.props.settings.activeAccount
      ? filterByAccountAndDate(
        this.props.transactions,
        this.props.settings.activeAccount,
        range
      )
      : filterByDate(this.props.transactions, range);
    transactions = sortByDate(transactions);
    transactions.forEach(item => {
      let key = moment(item.date).format("YYYY-MM-DD");
      let value = getValueByCurrency(this.props.rateExchanges, item.value, this.props.settings.currency, item.currency);
      if (items[key]) {
        items[key].data.push(item);
        if(item.currency != this.props.settings.currency){
          items[key].total += value
        }else{
          items[key].total += value;
        }
        items[key].currencies = item.currency;
      } else {
        items[key] = {
          title: moment(item.date).format("DD MMMM"),
          date: moment(item.date),
          total: value,
          data: [item],
          currencies: {
            [item.currency]: item.currency
          }
        };
      }
    });
    return R.values(items);
  };

  _renderItemNote = note => {
    if (note) {
      return <AvenirText style={styles.itemNote}>{note}</AvenirText>;
    }
  };

  _renderItem = ({ item, index }) => {
    return (
      <TransactionRow
        transaction={item}
        showAccountIcon={this.props.settings.activeAccount==null}
        showRateExchange={this.props.settings.activeAccount==null}
        onPress={() => {
          this.setState({ selectedItem: item, modalVisible: true });
        }}
      />
    );
  };

  _renderHeader = ({ section }) => {
    let title = section.title;
    if (moment(section.date).diff(new Date(), "day") == 0) {
      title = "Today";
    } else {
      title = moment(section.date).format("dddd");
    }

    return (
      <View style={{ ...styles.sectionHeader}}>
        <View style={styles.dateContainer}>
          <AvenirText style={styles.sectionTitle}>
            {moment(section.date).format("DD")}
          </AvenirText>
          <View>
            <AvenirText style={styles.sectionSubtitle}>{title}</AvenirText>
            <AvenirText style={styles.sectionSubtitle}>
              {section.title}
            </AvenirText>
          </View>
        </View>
        <Value
          weight="demi"
          style={{
            color: section.total > 0 ? Colors.mainColor : Colors.alertColor,
            fontSize: 14
          }}
          value={section.total}
          prefix={section.total > 0 ? "+" : ""}
          currency={
            this.state.activeAccount.id > 0
              ? this.state.activeAccount.currency
              : this.props.settings.currency
          }
        />
      </View>
    );
  };

  _renderMonthData = () => {
    let results = [];
    this.state.months.map(month => {
      results.push(this._renderTransactions(month));
    });
    return results;
  };

  _handleScroll = (event) => {
    if (this.containerView) {
      this.containerView.setOffsetY(event.nativeEvent.contentOffset.y);
    }
  }

  _renderTransactions = month => {
    let today = moment();
    let items = this._getItems(month);
    let label =
      today.diff(month, "month") == 0
        ? "This Month"
        : month.format("MMMM YYYY");


    return (
      <View key={month.format("MMMMYYYY")} tabLabel={{ label: label }}>
        <SectionList
          sections={items}
          renderItem={this._renderItem}
          renderSectionHeader={this._renderHeader}
          keyExtractor={(item) => item.id}
          style={{ overflow: "visible", backgroundColor: '#fff' }}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          onScroll={this._handleScroll}
          SectionSeparatorComponent={({ leadingItem }) => leadingItem ? (<View style={{ height: 30 }}></View>) : null}
          ItemSeparatorComponent={({ leadingItem }) => leadingItem ? (<Separator/>) : null}
          ListEmptyComponent={() => (
            <View
              key={month.format("MMMMYYYY")}
              tabLabel={{ label: label }}
              style={styles.noDataContainer}
            >
              <Image style={{ opacity: 0.8 }} source={Images.emptyTransaction} />
              <AvenirText
                weight="demi"
                style={{ color: Colors.textGray, fontSize: 20 }}
              >
                No transactions here :(
                </AvenirText>
            </View>
          )}
        />
      </View>
    );
  };

  render() {
    this.state.activeAccount = getAccountById(
      this.props.accounts,
      this.props.settings.activeAccount
    );

    return (
      <ViewWithTitle
        title="Movimientos"
        subTitle={this.state.activeAccount.name}
        rightTitle={( <AccountSelector
          color="#777"
          onPress={() => this.props.navigation.navigate(screens.AccountChooser)}
        />)}
        customContentArea={true}
        ref={c => (this.containerView = c)}
      >
        {
          this.state.selectedItem && (
          <TransactionModal
            item={this.state.selectedItem}
            visible={true}
            closeModal={() => {
              this.setState({ selectedItem: null });
            }}
          />
        )}
        <ScrollableTabView
          style = {{backgroundColor: '#fff'}}
          tabBarActiveTextColor={Colors.mainColor}
          renderTabBar={() => (
            <TabBar
              underlineColor="transparent"
              tabBarStyle={{
                backgroundColor: "#fff",
                borderBottomColor: Colors.borderColor,
                marginTop: 0
              }}
              renderTab={(
                tab,
                page,
                isTabActive,
                onPressHandler,
                onTabLayout
              ) => (
                  <Tab
                    key={page}
                    tab={tab}
                    page={page}
                    isTabActive={isTabActive}
                    onPressHandler={onPressHandler}
                    onTabLayout={onTabLayout}
                  />
                )}
            />
          )}
          initialPage={this.state.currentMonthIndex}
          prerenderingSiblingsNumber={1}
        >
          {this._renderMonthData()}
        </ScrollableTabView>
        {/* {this._renderTransactions(moment())} */}
      </ViewWithTitle>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    accounts: state.accounts,
    settings: state.settings,
    transactions: state.transactions,
    rateExchanges: state.rateExchanges
  };
};
export default connect(mapStateToProps, accountsOperations)(HistoryScreen);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    marginBottom: Layout.bottomOffset
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'rgba(255,255,255,1)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor
  },
  sectionTitle: {
    fontSize: 36,
    marginTop: 10,
    marginRight: 10,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: Colors.textGray
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  noDataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center', 
    backgroundColor: '#fff'
  },
  itemSeparator: { 
    borderBottomColor: Colors.borderColor, 
    borderBottomWidth: 1, 
    width: Layout.window.width - 85, 
    position: 'absolute', 
    right: 0, 
    bottom: 0 
  }
});
