import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
  } from 'react-native';
import { CardList } from '../../components/cardlist';
import { ViewWithTitle } from '../../components';

const cards = [
    {
      id: "0",
      title: "",
      picture: require('../../assets/images/banks/hsbc.png'),
      content: <Text>Data</Text>
    },
    {
      id: "1",
      title: "",
      picture: require('../../assets/images/banks/banregio.png'),
      content: <Text>Data</Text>
    },
    {
      id: "2",
      title: "                                 ",
      picture: require('../../assets/images/banks/compartamos.png'),
      content: <Text>Data</Text>
    }
]

export default class BankChooser extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CardList cards={cards} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      //alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
});
