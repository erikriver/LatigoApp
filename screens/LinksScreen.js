import React from 'react';
import {
  StyleSheet,
  Dimensions
} from 'react-native';
import { AccountCarousel, ViewWithTitle, DefaultPanel } from '../components';
import Colors from '../constants/Colors';

import { connect } from 'react-redux';
import { accountsOperations } from '../modules/accounts';
import { getAccountById } from "../utils/accountHelper";
import { accountTotalSpend, accountTotalIncome } from '../utils/transactionHelper';
import screens from '../constants/screens';
import { VictoryChart, VictoryTheme, VictoryPolarAxis, VictoryArea } from "victory-native";
class LinksScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: true,
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      totalSpend: accountTotalSpend(this.props.transactions, this.props.settings.activeAccount),
      totalReceive: accountTotalIncome(this.props.transactions, this.props.settings.activeAccount)
    }
  }

  _openCategorySelect = (type) => {
    this.props.navigation.navigate(screens.TransactionDetail, { categoryType: type });
  }

  render() {

    const sampleData = [
      { x: 1, y: 2, y0: 0 },
      { x: 2, y: 3, y0: 1 },
      { x: 3, y: 5, y0: 1 },
      { x: 4, y: 4, y0: 2 },
      { x: 5, y: 6, y0: 2 }
    ]

    return (
      <ViewWithTitle title="Análisis" subTitle="Domingo, 24 Febrero">
        <AccountCarousel accounts={this.props.accounts}></AccountCarousel>
        <DefaultPanel title="Cards">
          <VictoryChart polar
            theme={VictoryTheme.material}
          >
            <VictoryPolarAxis dependentAxis
              style={{ axis: { stroke: "none" } }}
              tickFormat={() => null}
            />
            <VictoryPolarAxis />
            <VictoryArea
              data={sampleData}
              style={{
                data: { fill: "#c43a31" },
              }}
            />
          </VictoryChart>
        </DefaultPanel>
      </ViewWithTitle>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    accounts: state.accounts,
    settings: state.settings,
    transactions: state.transactions
  }
};
export default connect(mapStateToProps, accountsOperations)(LinksScreen);


