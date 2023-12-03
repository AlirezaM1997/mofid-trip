import React from "react";
import {
  WalletTransactionQueryType,
  WalletWalletTransactionActionChoices,
} from "@src/gql/generated";
import moment from "jalali-moment";
import { useTheme } from "@rneui/themed";
import WhiteSpace from "@atoms/white-space";
import { Avatar, Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

type LookUpType = Record<
  Exclude<WalletWalletTransactionActionChoices, "IN_APP_PURCHASE">,
  {
    title: string;
    amount: string;
    color: typeof Colors;
    icon: { name: string; type: string; color: typeof Colors; size: number };
  }
>;

const WalletTransactionCard = ({ transaction }: { transaction: WalletTransactionQueryType }) => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();

  const transactionAction = () => {
    const lookup: LookUpType = {
      [WalletWalletTransactionActionChoices.Deposit]: {
        icon: { name: "arrowup", type: "ant-design", color: theme.colors.black, size: 16 },
        title: tr("increase balance"),
        amount: `+ ${transaction.amount}`,
        color: "success",
      },
      [WalletWalletTransactionActionChoices.Withdraw]: {
        icon: { name: "arrowdown", type: "ant-design", color: theme.colors.black, size: 16 },
        title: tr("withdrawal from the wallet"),
        amount: `- ${transaction.amount}`,
        color: "error",
      },
    };
    return lookup[transaction.action];
  };

  return (
    <>
      <View style={styles.transactionCard(theme)}>
        <Avatar
          rounded
          size={40}
          icon={transactionAction().icon}
          containerStyle={styles.avatarContainer(theme)}
        />
        <View style={styles.header}>
          <Text>{transactionAction().title}</Text>
          <Text body2 type="grey2">
            {moment(transaction.modifiedTime).locale("fa").format("jDD jMMMM , HH:mm a")}
          </Text>
        </View>
        <Text type={transactionAction().color}>{localizeNumber(transactionAction().amount)}</Text>
      </View>
      <WhiteSpace size={8} />
    </>
  );
};

const styles = StyleSheet.create({
  transactionCard: theme => ({
    gap: 10,
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    borderColor: theme.colors.grey0,
  }),
  avatarContainer: theme => ({ backgroundColor: theme.colors.grey1 }),
  header: { flex: 1 },
});

export default WalletTransactionCard;
