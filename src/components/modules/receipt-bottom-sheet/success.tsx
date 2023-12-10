import React from "react";
import moment from "jalali-moment";
import Container from "@atoms/container";
import * as Clipboard from "expo-clipboard";
import WhiteSpace from "@atoms/white-space";
import Toast from "react-native-toast-message";
import { BottomSheet, Chip, Text } from "@rneui/themed";
import { useFormatPrice } from "@src/hooks/localization";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Avatar, Button, useTheme } from "@rneui/themed";
import { Pressable, StyleSheet, View } from "react-native";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { BackCardQueryType, WalletActionTransactionEnum } from "@src/gql/generated";
import ButtonRow from "@modules/button-rows";

type LookUpType = Record<
  Exclude<WalletActionTransactionEnum, "IN_APP_PURCHASE">,
  {
    icon: {};
    card: string;
    title: string;
    subTitle: string;
  }
>;

const CustomView = ({ children }) => {
  const { theme } = useTheme();

  return (
    <View style={[{ borderColor: theme.colors.grey0 }, styles.detailsContainer]}>{children}</View>
  );
};

const SuccessReceiptBottomSheet = ({ transaction, isVisible, setIsVisible }) => {
  const { theme } = useTheme();
  const { formatPrice } = useFormatPrice();
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();

  const totalPrice = transaction?.amount || 0;
  const formattedTotalPrice = formatPrice(totalPrice);

  const { invoiceNumber, modifiedTime, source, action, reference, purchaseRefId } = transaction;

  const transactionAction = () => {
    const lookup: LookUpType = {
      [WalletActionTransactionEnum.Deposit]: {
        title: tr("increase balance"),
        subTitle: tr("payment by card"),
        card: (source as BackCardQueryType)?.cardPan,
        icon: { name: "arrowup", type: "ant-design", color: theme.colors.black, size: 24 },
      },
      [WalletActionTransactionEnum.Withdraw]: {
        title: tr("withdrawal from the wallet"),
        subTitle: tr("deposit to the account"),
        card: (reference as BackCardQueryType)?.cardPan,
        icon: { name: "arrowdown", type: "ant-design", color: theme.colors.black, size: 24 },
      },
    };
    return lookup[action];
  };

  const transactionActionHolder: LookUpType["DEPOSIT"] = transactionAction();

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(invoiceNumber);
    Toast.show({
      type: "success",
      text1: tr("copied"),
    });
  };

  return (
    <BottomSheet isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
      <Container style={styles.topContainer}>
        <Avatar
          rounded
          size={56}
          containerStyle={styles.avatar(theme)}
          icon={transactionActionHolder.icon}
        />
        <WhiteSpace size={16} />

        <Text center subtitle2>
          {transactionActionHolder.title}
        </Text>

        <Pressable style={styles.tourTitleContainer} onPress={copyToClipboard}>
          <Feather name="copy" size={12} color="black" />
          <Text subtitle2 style={{ color: theme.colors.grey2 }}>
            {invoiceNumber}
          </Text>
        </Pressable>

        <WhiteSpace size={24} />

        <Text heading1 style={styles.price}>
          {localizeNumber(formattedTotalPrice)}
        </Text>

        <WhiteSpace size={24} />

        <Chip
          buttonStyle={styles.chip}
          color={theme.colors.success}
          title={tr("successful transfer")}
          titleStyle={styles.chipTitle(theme)}
          icon={<AntDesign size={16} name="checkcircle" color={theme.colors.white} />}
        />
      </Container>

      <Container style={styles.centerContainer}>
        <View style={styles.bottomContent(theme)} />

        <CustomView>
          <Text caption>{tr("time")}</Text>
          <Text caption>
            {localizeNumber(moment(modifiedTime).locale("fa").format("dddd jD jMMMM . HH:mm a"))}
          </Text>
        </CustomView>

        <CustomView>
          <Text caption>{tr("transaction type")}</Text>
          <Text caption>{transactionActionHolder.title}</Text>
        </CustomView>

        <CustomView>
          <Text caption>{transactionActionHolder.subTitle}</Text>
          <Text caption>{transactionActionHolder.card}</Text>
        </CustomView>

        <View style={styles.issueTrackingContainer}>
          <Text caption>{tr("issue tracking")}</Text>
          <Text caption>{localizeNumber(purchaseRefId)}</Text>
        </View>
      </Container>

      <Container>
        <ButtonRow>
          <Button>{tr("share")}</Button>
          <Button type="outline" onPress={() => setIsVisible(false)}>
            {tr("back")}
          </Button>
        </ButtonRow>
      </Container>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    display: "flex",
    alignItems: "center",
  },
  successButton: {
    width: 130,
    margin: "auto",
  },
  chip: { padding: 8, gap: 8 },
  chipTitle: theme => ({ color: theme.colors.white }),
  bottomContent: theme => ({
    borderTopWidth: 1,
    marginBottom: 16,
    borderStyle: "dashed",
    borderColor: theme.colors.grey0,
  }),
  issueTrackingContainer: {
    display: "flex",
    paddingVertical: 12,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  centerContainer: { marginVertical: 24 },
  detailsContainer: {
    width: "100%",
    display: "flex",
    paddingVertical: 12,
    borderBottomWidth: 1,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  avatar: theme => ({
    margin: "auto",
    backgroundColor: theme.colors.grey0,
  }),
  swapIconContainer: {
    zIndex: 2,
    top: "50%",
    left: "50%",
    borderRadius: 20,
    paddingHorizontal: 5,
    position: "absolute",
    backgroundColor: "#fff",
    transform: "translate(-50%,-50%)",
  },
  tourTitleContainer: {
    gap: 4,
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    gap: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  price: { textAlign: "center" },
});

export default SuccessReceiptBottomSheet;
