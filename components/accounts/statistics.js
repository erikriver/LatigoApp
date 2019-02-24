import Carousel, { Pagination  } from 'react-native-snap-carousel';
import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  SegmentedControlIOS,
} from 'react-native';
import Colors from '../../constants/Colors';
import R from 'ramda';
import { VictoryChart, VictoryTheme, VictoryPie, VictoryAxis, VictoryLine, VictoryLabel} from "victory-native";
import Layout from '../../constants/Layout';
import Svg from 'react-native-svg';
import { withGlobalize } from 'react-native-globalize';
import { formatNumber } from '../../utils/format';
import { iOSColors } from 'react-native-typography';
import { getTransactionByDay, accountTransactionsSum } from '../../utils/transactionHelper';
import moment from 'moment';
import icons from '../../constants/Icons';
import { getRate } from '../../utils/rateExchangeHelper';
import { connect } from 'react-redux';

const sliderWidth = Dimensions.get("window").width;
const itemWidth = Dimensions.get("window").width;

class CustomLabel extends React.Component {
  render() {
    let x= this.props.x;
    let y= this.props.y;
    if(this.props.textAnchor=='end'){
      x = x - 40;
    }

    let color = icons[this.props.datum.icon] ? icons[this.props.datum.icon].color : iOSColors.gray;
    if (iOSColors.customGray == color) {
      color = iOSColors.gray
    }

    return (
      this.props.datum.value >= 10
      &&
      (
        <Svg.G width={50} height={20} {...this.props} x={x} y={y}>
          <Svg.Rect x={0} y={0} width={50} height={20} fill={color} rx={10} ry={10} style={{opacity:.2}}/>
          <Svg.Circle/>
          <Svg.Text x={25} y={14} textAnchor="middle" verticalAnchor="middle" fill={color} fontWeight="bold">
            {this.props.text}
          </Svg.Text>
          {/* <VictoryLabel {...this.props} /> */}
        </Svg.G>
      )
    );
  }
}

const tabs = {
  accounts: 1,
};

class AccountStatistics extends React.Component {
  constructor(props) {
    super(props);

    let initialAccounts = [];
    let colors = [];
    this.props.accounts.map(account => {
      let color = icons[account.icon]
        ? icons[account.icon].color
        : iOSColors.gray;

      if (iOSColors.customGray == color) {
        color = iOSColors.midGray;
      }
      colors.push(color);
      initialAccounts.push({
        name: account.name,
        value: 33.33,
        icon: account.icon
      });
    });

    let total = this._getSummaryAccount(this.props.accounts);

    this.state = {
      tabs: R.values(tabs),
      accounts: initialAccounts,
      colors: colors,
      total: total,
      activeSlide: 0
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        accounts: this.props.accounts
      });
    }, 100);
  }

  _getSummaryAccount = accounts => {
    let total = 0;
    accounts.map(account => {
      if (this.props.settings.currency == account.currency) {
        account.value = account.balance;
      } else {
        let rate = getRate(
          this.props.rateExchanges,
          account.currency,
          this.props.settings.currency
        );
        account.value = account.balance * rate;
      }
      total += account.value;
    });
    return total;
  };

  _renderAccountStatistics = () => {
    return (
      <View style={{ alignItems: "center", alignContent: "center" }}>
        <Svg
          width={Layout.window.width - 20}
          height={Layout.window.width - 20}
          viewBox="0 0 400 400"
        >
          <VictoryPie
            standalone={false}
            width={400}
            height={400}
            theme={VictoryTheme.material}
            innerRadius={125}
            padding={60}
            x="name"
            y="value"
            colorScale={this.state.colors}
            labels={d => {
              return `● ${Math.round(
                ((d.endAngle - d.startAngle) * 100) / 360
              )}%`;
            }}
            data={this.state.accounts}
            labelComponent={<CustomLabel />}
            origin={{ x: 200, y: 200 }}
            animate={{
              duration: 5000
            }}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{ fontSize: 20 }}
            x={200}
            y={180}
            text="Mi Balance"
          />
          <VictoryLabel
            textAnchor="middle"
            style={{ fontSize: 32 }}
            x={200}
            y={210}
            text={formatNumber(this.props.globalize, this.state.total)}
          />
        </Svg>
      </View>
    );
  };

  _renderIncomeExpense = () => {
    const transactions = R.values(this.props.transactions.list);
    const startBalance = accountTransactionsSum(
      this.props.transactions,
      null,
      null,
      moment().startOf("month")
    );
    const data = getTransactionByDay(
      transactions,
      startBalance,
      moment().startOf("month"),
      moment().endOf("day")
    );
    // const data2 = getTransactionByDay(transactions, false);
    if (data.results.length) {
      return (
        <View style={{ alignItems: "center", alignContent: "center" }}>
          <VictoryChart height={320} theme={VictoryTheme.material}>
            <VictoryLine
              x="name"
              y="total"
              interpolation="monotoneX"
              data={data.results}
              // labels={(datum) => formatNumber(this.props.globalize ,datum.total)}
              style={{
                data: {
                  stroke: iOSColors.blue,
                  strokeWidth: 3,
                  strokeLinecap: "round"
                },
                parent: { borderWidth: 0 }
              }}
            />
            <VictoryAxis
              style={{
                axis: { stroke: "transparent" },
                grid: { stroke: "transparent" },
                ticks: { stroke: "transparent", size: 0 },
                tickLabels: { fontSize: 12, padding: 0, fill: Colors.textGray }
              }}
            />
          </VictoryChart>
          <SegmentedControlIOS
            width="80%"
            values={["Last Month", "This Month", "This Year", "All"]}
            selectedIndex={1}
          />
        </View>
      );
    }
  };

  _renderItem = ({ item }) => {
    switch (item) {
      case tabs.accounts:
        return this._renderAccountStatistics();
      // case tabs.incomeExpense: return this._renderIncomeExpense();
    }
  };
  get pagination() {
    const { activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={3}
        activeDotIndex={activeSlide}
        containerStyle={{ padding: 0, marginTop: -20, marginBottom: -20 }}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 5,
          marginHorizontal: 0,
          marginVertical: 0,
          backgroundColor: Colors.mainColor
        }}
        inactiveDotStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        }}
        inactiveDotOpacity={0.8}
        inactiveDotScale={0.9}
      />
    );
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Carousel
            layout={"default"}
            ref={c => {
              this._carousel = c;
            }}
            data={this.state.tabs}
            renderItem={this._renderItem}
            windowSize={sliderWidth}
            layoutCardOffset={0}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            activeSlideOffset={0}
            inactiveSlideScale={0.95}
            onSnapToItem={index => this.setState({ activeSlide: index })}
          />

          {/* {this.pagination} */}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.settings,
    rateExchanges: state.rateExchanges
  }
};
export default withGlobalize(connect(mapStateToProps, null)(AccountStatistics));

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
