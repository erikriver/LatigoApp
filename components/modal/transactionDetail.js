import React from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import { Icon } from "expo";
import { AvenirText } from "../text/StyledText";
import { withNavigation } from "react-navigation";
import { IconShower } from "../icon/index";
import { connect } from "react-redux";
import { AnimatedModal } from "../modal";
import Value from "../value";
import moment from "moment";
import { WithIconButton, RoundedButton } from "../buttons/StyledButton";
import Colors from "../../constants/Colors";
import ContactPicker from "../contactpicker";
import { LocationPicker } from "../locationPicker";
import AccountPicker from "../accountPicker";
import { getCategoryById } from "../../utils/categoryHelper";
import screens from "../../constants/screens";
import { iOSColors } from "react-native-typography";
import { accountsOperations } from "../../modules/accounts";
import { transactionsOperations } from "../../modules/transactions";
import { accountTransactionsSum } from "../../utils/transactionHelper";
import { getAccountById } from "../../utils/accountHelper";
import { ImagePicker } from "../imagePicker";

class TransactionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: this.props.item,
      visible: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item.id != this.state.selectedItem.id) {
      this.setState({ selectedItem: nextProps.item, visible: true });
    }
  }

  _openDetailScreen = id => {
    this.props.navigation.navigate(screens.TransactionDetail, { id: id });
    this.setState({ visible: false });
  };

  _openRepeatScreen = id => {
    this.props.navigation.navigate(screens.TransactionDetail, {
      id: id,
      isRepeat: true
    });
    this.setState({ visible: false });
  };

  _deleteItem = id => {
    // Works on both iOS and Android
    Alert.alert(
      "Delete transaction",
      "This transaction will be permanently deleted, are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            //Update account
            const account = getAccountById(this.props.accounts, this.state.selectedItem.account);
            
            //Remove transaction
            this.props.removeTransaction(id);
    
            //New balance
            const newBalance = account.initialBalance + accountTransactionsSum(this.props.transactions, this.state.selectedItem.account, id);
            this.props.updateAccount({ ...account, balance: newBalance});

            //Hide modal
            this.setState({ visible: false, selectedItem: {} });
          }
        }
      ],
      { cancelable: true }
    );
  };

  _renderItemNote = note => {
    if (note) {
      return (
        <AvenirText
          numberOfLines={1}
          ellipsizeMode="clip"
          style={styles.itemNote}
        >
          {note}
        </AvenirText>
      );
    }
  };

  _modalHeader = () => {
    const item = this.state.selectedItem;
    const category = getCategoryById(this.props.categories, item.category);

    return (
      <View style={styles.modalHeader}>
        <View style={styles.selectedItemContainer}>
          <View style={styles.selectedItemIcon}>
            <IconShower
              icon={category ? category.icon : ""}
              isSquare
              size={42}
            />
          </View>
          <View style={styles.selectedItemDescription}>
            <View style={styles.selectedItemDescriptionCenter}>
              <AvenirText style={styles.itemName} weight="demi">
                {category ? category.name : ""}
              </AvenirText>
              {this._renderItemNote(item.note)}
            </View>
            <AvenirText>{moment(item.date).format("DD MMMM, YYYY")}</AvenirText>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Value
            weight="demi"
            style={{ fontSize: 32, paddingLeft: 20, marginTop: 10 }}
            value={item.value}
            currency={item.currency}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <AnimatedModal
        visible={this.state.visible}
        title="Transaction detail"
        customHeader={this._modalHeader}
        onHideModal={() => {
          this.setState({ visible: false, selectedItem: {} });
        }}
      >
        <ScrollView
          style={{ flex: 1, backgroundColor: "#fff", paddingTop: 120 }}
        >
          <View style={styles.modalButtons}>
            <WithIconButton
              onPress={() => {
                this._deleteItem(this.state.selectedItem.id);
              }}
              text="Delete"
              color={iOSColors.red}
            >
              <Icon.MaterialIcons
                name="delete"
                size={18}
                color={iOSColors.red}
              />
            </WithIconButton>
            <WithIconButton
              onPress={() => {
                this._openDetailScreen(this.state.selectedItem.id);
              }}
              text="Edit"
            >
              <Icon.MaterialCommunityIcons
                name="pencil"
                size={20}
                color={Colors.mainColor}
              />
            </WithIconButton>
            <WithIconButton
              onPress={() => {
                this._openRepeatScreen(this.state.selectedItem.id);
              }}
              text="Repeat"
            >
              <Icon.Feather name="repeat" size={16} color={Colors.mainColor} />
            </WithIconButton>
          </View>
          <View style={styles.modalRow}>
            <AvenirText weight="demi" style={styles.modalRowTitle}>
              {this.state.selectedItem.value > 0 ? "To" : "From"} Account
            </AvenirText>
            <AccountPicker value={this.state.selectedItem.account} disabled />
          </View>
          {this.state.selectedItem.contacts &&
          this.state.selectedItem.contacts.length ? (
            <View style={styles.modalRow}>
              <AvenirText weight="demi" style={styles.modalRowTitle}>
                Contact
              </AvenirText>
              <ContactPicker
                value={this.state.selectedItem.contacts}
                disabled
              />
            </View>
          ) : null}
          {this.state.selectedItem.location ? (
            <View style={styles.modalRow}>
              <AvenirText weight="demi" style={styles.modalRowTitle}>
                Location
              </AvenirText>
              <LocationPicker
                value={this.state.selectedItem.location}
                disabled
              />
            </View>
          ) : null}

          {this.state.selectedItem.image ? (
            <View style={styles.modalRow}>
              <AvenirText weight="demi" style={styles.modalRowTitle}>
                Image
              </AvenirText>
              <ImagePicker
                value={this.state.selectedItem.image}
                disabled
              />
            </View>
          ) : null}
        </ScrollView>
      </AnimatedModal>
    );
  }
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    settings: state.settings,
    transactions: state.transactions,
    categories: state.categories
  };
};
export default withNavigation(
  connect(
    mapStateToProps,
    { ...accountsOperations, ...transactionsOperations }
  )(TransactionModal)
);

const styles = StyleSheet.create({
  modalHeader: {
    backgroundColor: "#F8F8F8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd"
  },
  modalButtons: {
    flexDirection: "row",
    alignContent: "stretch",
    alignItems: "stretch",
    marginTop: 20
  },
  modalRow: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor
  },
  modalRowTitle: {
    fontSize: 16,
    marginBottom: 10
  },
  selectedItemContainer: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  selectedItemIcon: {
    marginRight: 20
  },
  selectedItemName: {
    fontSize: 14
  },
  selectedItemNote: {
    color: Colors.textGray
  },
  selectedItemDescription: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "space-between",
    justifyContent: "space-between"
  },
  itemNote: {
    color: Colors.textGray
  }
});
