import React, { useState } from "react";
import {
  WalletTransactionQueryType,
  WalletWalletTransactionActionChoices,
  WalletWalletTransactionStatusStepChoices,
} from "@src/gql/generated";
import moment from "jalali-moment";
import { useTheme } from "@rneui/themed";
import WhiteSpace from "@atoms/white-space";
import { Avatar, Text } from "@rneui/themed";
import { Pressable, StyleSheet, View, ViewProps } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import SuccessReceiptBottomSheet from "@modules/receipt-bottom-sheet/success";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { WIDTH } from "@src/constants";

type LookUpType = Record<
  Exclude<WalletWalletTransactionActionChoices, "IN_APP_PURCHASE">,
  {
    title: string;
    amount: string;
    subTitle?: string;
    color: typeof Colors;
    icon: { name: string; type: string; color: typeof Colors; size: number };
  }
>;

const WalletTransactionCard = ({ transaction }: { transaction: WalletTransactionQueryType }) => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const { localizeNumber } = useLocalizedNumberFormat();

  const transactionAction = () => {
    const lookup: LookUpType = {
      [WalletWalletTransactionActionChoices.Deposit]: {
        icon: { name: "arrowup", type: "ant-design", color: theme.colors.black, size: 16 },
        title: tr("increase balance"),
        amount: `+ ${transaction.amount}`,
        color: "success",
      },
      [WalletWalletTransactionActionChoices.Withdraw]:
        transaction.statusStep === WalletWalletTransactionStatusStepChoices.Request
          ? {
              icon: { name: "arrowdown", type: "ant-design", color: theme.colors.black, size: 16 },
              title: tr("withdrawal from the wallet"),
              subTitle: `/ ${tr("awaiting confirmation")}`,
              amount: `- ${transaction.amount}`,
              color: "grey2",
            }
          : {
              icon: { name: "arrowdown", type: "ant-design", color: theme.colors.black, size: 16 },
              title: tr("withdrawal from the wallet"),
              amount: `- ${transaction.amount}`,
              color: "error",
            },
    };
    return lookup[transaction.action];
  };

  const transactionActionHolder = transactionAction();

  return (
    <>
      <Pressable onPress={() => setIsVisible(true)} style={styles.transactionCard(theme)}>
        <Avatar
          rounded
          size={40}
          icon={transactionActionHolder.icon}
          containerStyle={styles.avatarContainer(theme)}
        />
        <View style={styles.header}>
          <Text>{transactionActionHolder.title}</Text>
          <Text body2 type="grey2">
            {localizeNumber(
              moment(transaction.modifiedTime).locale("fa").format("jDD jMMMM , HH:mm a")
            )}
            {transactionActionHolder.subTitle}
          </Text>
          {WIDTH < 320 && (
            <Text type={transactionActionHolder.color}>
              {localizeNumber(transactionActionHolder.amount)}
            </Text>
          )}
        </View>

        {WIDTH >= 320 && (
          <Text type={transactionActionHolder.color}>
            {localizeNumber(transactionActionHolder.amount)}
          </Text>
        )}
      </Pressable>
      <WhiteSpace size={8} />
      {transaction.statusStep !== WalletWalletTransactionStatusStepChoices.Request && (
        <SuccessReceiptBottomSheet
          isVisible={isVisible as boolean}
          transaction={transaction as WalletTransactionQueryType}
          setIsVisible={setIsVisible as React.Dispatch<React.SetStateAction<boolean>>}
        />
      )}
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
  avatarContainer: (theme => ({ backgroundColor: theme.colors.grey1 })) as ViewProps,
  header: { flex: 1 },
});

export default WalletTransactionCard;
