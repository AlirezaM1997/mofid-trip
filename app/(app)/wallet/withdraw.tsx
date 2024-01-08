import * as Yup from "yup";
import { Formik } from "formik";
import Input from "@atoms/input";
import { router } from "expo-router";
import React, { useState } from "react";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import parseText from "@src/helper/number-input";
import useTranslation from "@src/hooks/translation";
import { useUserDetailQuery } from "@src/gql/generated";
import { useFormatPrice } from "@src/hooks/localization";
import LoadingIndicator from "@modules/Loading-indicator";
import WithdrawBankCard from "@modules/wallet/withdraw/bankCard";
import BottomButtonLayout from "@components/layout/bottom-button";
import { Button, CheckBox, Divider, Text, useTheme } from "@rneui/themed";

const WithdrawScreen = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { formatPrice } = useFormatPrice();
  const [selectedCard, setCard] = useState("0");

  const submitHandler = values => {
    console.log(values);
  };

  const { data, loading } = useUserDetailQuery();

  if (!data || loading) return <LoadingIndicator />;

  const { walletCards, balance } = data.userDetail.wallet;

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required(tr("amount is required"))
      .max(balance, tr("the desired amount is more than the account balance")),
  });

  return (
    <Formik
      onSubmit={submitHandler}
      initialValues={{ amount: "" }}
      validationSchema={validationSchema}>
      {({ values, setFieldValue, handleSubmit, touched, errors }) => (
        <BottomButtonLayout
          buttons={[<Button onPress={handleSubmit}>{tr("withdrawal request")}</Button>]}>
          <WhiteSpace size={24} />

          <Container>
            <Text heading2>{tr("withdraw from the wallet")}</Text>

            <WhiteSpace />

            <Text caption type="grey3">
              {tr(
                "to request a withdrawal from the wallet, please enter the desired amount and select one of your previously created bank cards or register a new bank card."
              )}
            </Text>

            <WhiteSpace size={24} />

            <Text center caption type="grey3">
              {tr("wallet balance")}
            </Text>

            <WhiteSpace size={4} />

            <Text center heading2>
              {formatPrice(balance)}
            </Text>

            <WhiteSpace size={32} />

            <Input
              value={values.amount}
              placeholder={tr("amount")}
              errorMessage={touched?.amount && (errors?.amount as string)}
              onChangeText={t => setFieldValue("amount", parseText(t))}
            />

            <Text onPress={() => setFieldValue("amount", balance)} underline caption type="primary">
              {tr("withdrawal of total balance")}
            </Text>

            <Divider style={styles.divider} />

            <View style={styles.cardsHeader}>
              <Text bold>{tr("deposit to the account")}</Text>
              <Button
                size="sm"
                type="solid"
                color="secondary"
                onPress={() => router.push("wallet/cards/add")}
                icon={<AntDesign name="plus" size={16} color={theme.colors.white} />}>
                {tr("add a new card")}
              </Button>
            </View>

            {walletCards?.map(card => (
              <CheckBox
                key={card.id}
                iconRight={true}
                iconType="material-community"
                checkedIcon="radiobox-marked"
                uncheckedIcon="radiobox-blank"
                onPress={() => setCard(card.id)}
                wrapperStyle={styles.card(theme)}
                checked={selectedCard === card.id}
                checkedColor={theme.colors.secondary}
                title={<WithdrawBankCard card={card} />}
              />
            ))}
          </Container>
          <WhiteSpace size={24} />
        </BottomButtonLayout>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  divider: {
    marginVertical: 40,
  },
  cardsHeader: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: theme => ({
    padding: 16,
    borderWidth: 1,
    marginBottom: 8,
    borderRadius: 12,
    justifyContent: "space-between",
    borderColor: theme.colors.grey0,
  }),
});

export default WithdrawScreen;
