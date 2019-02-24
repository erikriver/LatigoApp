import React from 'react';
import { AccountCarousel, ViewWithTitle, DefaultPanel } from '../components';

import { connect } from 'react-redux';
import { accountsOperations } from '../modules/accounts';
import { accountTotalSpend, accountTotalIncome } from '../utils/transactionHelper';
import screens from '../constants/screens';
import { VictoryChart, VictoryTheme, VictoryPolarAxis, VictoryArea } from "victory-native";

class BankChooserScreen extends React.Component {

  render() {
    return (
      <ViewWithTitle title="Stats" subTitle="Thursday, 18 January">

      </ViewWithTitle>
    );
  }
}
