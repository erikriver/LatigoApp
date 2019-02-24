import React from "react";
import Swipeout from "react-native-swipeout";
import { withNavigation } from "react-navigation";
import { AccountButton } from "../buttons/AccountButton";
import screens from "../../constants/screens";

class AccountRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var { account } = this.props;

    if (account.id >= 0) {
      var swipeoutBtns = [
        {
          text: "Delete",
          type: "delete",
          onPress: () => {
            this.props.navigation.navigate(screens.AccountDetail, {
              id: account.id
            });
          }
        },
        {
          text: "Edit",
          type: "primary",
          onPress: () => {
            this.props.navigation.navigate(screens.AccountDetail, {
              id: account.id
            });
          }
        }
      ];
    }
    return (
      <Swipeout key={account.id} right={swipeoutBtns} autoClose={true}>
        <AccountButton
          {...this.props}
          label={account.name}
          balance={account.balance}
          currency={account.currency}
          icon={account.icon}
          color={account.color}
          type={account.type}
        />
      </Swipeout>
    );
  }
}

export default withNavigation(AccountRow);