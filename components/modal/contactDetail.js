import React from "react";
import { StyleSheet, View, ScrollView, Image, FlatList } from "react-native";
import { AvenirText } from "../text/StyledText";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { AnimatedModal } from "../modal";
import screens from "../../constants/screens";
import Images from "../../constants/Images";
import { getPhonenumber } from "../../utils/contactHelper";
import Colors from "../../constants/Colors";
import { iOSUIKit } from "react-native-typography";
import { IOSButton } from "../buttons/StyledButton";
import Value from '../value';
import TransactionRow from '../transaction/row';
import { Separator } from '../separator';
import { DefaultPanel } from "../panels";
import { getContactTransactions, getContactBalance } from "../../utils/transactionHelper";
import { Icon, Permissions, Contacts } from 'expo';

class ContactModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: this.props.data,
      transactions: getContactTransactions(this.props.transactions, this.props.data.id),
      balance: getContactBalance(this.props.transactions, this.props.data.id),
      visible: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data != this.state.contact) {
      this.setState({ 
        contact: nextProps.data,
        visible: true, 
        transactions: getContactTransactions(this.props.transactions, nextProps.data.id),
        balance: getContactBalance(this.props.transactions, nextProps.data.id),
      });
    }
  }

  _getContactById = async (id) =>{
    await Contacts.getContactByIdAsync(id);
  }

  _openDetailScreen = id => {
    this.props.navigation.navigate(screens.TransactionDetail, { id: id });
    this.setState({ visible: false });
  };

  _openContactEditScreen = async () => {
    // Edit contact
    await Contacts.presentFormAsync(this.state.contact.id);
  };

  _modalHeader = () => {
    const contact = this.state.contact;
    return (
      <View style={styles.modalHeader}>
        <View style={styles.headerContainer}>
          <Image
            style={styles.avatar}
            source={
              contact.imageAvailable ? contact.image : Images.defaultAvatar
            }
            width={90}
            height={90}
          />
          <View style={styles.contactDescription}>
            <AvenirText weight="bold" style={styles.contactName}>
              {contact.name}
            </AvenirText>
            <AvenirText style={styles.contactPhoneNumber}>
              {getPhonenumber(contact)}
            </AvenirText>

            <IOSButton onPress={()=> this._openContactEditScreen()} style={styles.editButton} text="EDIT" />
          </View>
          <Separator left={15} color="#ddd" />
        </View>
        <View style={styles.headerSummaryContainer}>
          <View style={styles.headerSummaryColumn}>
            <AvenirText>Transactions</AvenirText>
            <AvenirText weight="demi" style={styles.summaryValue}>{this.state.transactions.length}</AvenirText>
          </View>
          <View style={styles.headerSummaryColumn}>
            <AvenirText>Balance</AvenirText>
            <Value weight="demi" value={this.state.balance} style={styles.summaryValue} />
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <AnimatedModal
        visible={this.state.visible}
        title="Contact Detail"
        customHeader={this._modalHeader}
        onHideModal={() => {
          this.setState({ visible: false, contact: {} });
          this.props.onHideModal && this.props.onHideModal();
        }}
      >
        <View style={{backgroundColor: '#fff', flex: 1, paddingTop: 160 }}>
          <DefaultPanel
            title="Transactions"
            largeHeader
          >
            <FlatList
              data={this.state.transactions}
              renderItem={({ item }) => (
                <TransactionRow
                  transaction={item}
                  showAccountIcon={true}
                />
              )}
              keyExtractor={(item, index) => "contactTransaction_" + index}
              ItemSeparatorComponent={({ leadingItem }) =>
                leadingItem ? <Separator left={75} /> : null
              }
            />
          </DefaultPanel>
        </View>
      </AnimatedModal>
    );
  }
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    settings: state.settings,
    categories: state.categories,
    transactions: state.transactions
  };
};
export default withNavigation(
  connect(
    mapStateToProps,
    null
  )(ContactModal)
);

const styles = StyleSheet.create({
  modalHeader: {
    backgroundColor: "#F8F8F8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd"
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15
  },
  contactDescription: {
    alignItems: "flex-start",
    paddingLeft: 10
  },
  contactName: {
    fontSize: 20
  },
  contactPhoneNumber: {
    color: Colors.textGray
  },
  avatar: {
    borderRadius: 45,
    marginRight: 10
  },
  editButton: {
    marginTop: 15
  },
  headerSummaryContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "stretch",
    justifyContent: "flex-start"
  },
  headerSummaryColumn: {
    padding: 10,
    marginRight: 20,
  },
  summaryValue: {
    fontSize: 16
  }
});
