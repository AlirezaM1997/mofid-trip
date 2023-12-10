import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { router } from "expo-router";
import { RootState } from "@src/store";
import * as Network from "expo-network";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import { Button, Input, Text } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { WALLET_ZARINPAL_CALLBACK_URL } from "@src/settings";
import { useDepositWalletMutation } from "@src/gql/generated";
import BottomButtonLayout from "@components/layout/bottom-button";
import { setWalletTransactionIdData } from "@src/slice/wallet-transaction-slice";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

const Increase = () => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();
  const { balance } = useSelector((state: RootState) => state.userSlice.userDetail.wallet);

  const [depositWallet, { loading }] = useDepositWalletMutation();

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .min(10000, tr("amount should be at least 10000"))
      .required(tr("amount is required")),
  });

  const handleSubmit = async value => {
    const ip = await Network.getIpAddressAsync();
    const { data } = await depositWallet({
      variables: {
        data: {
          ip,
          amount: +value.amount,
          description: `${tr("increase wallet balance")}`,
          appLink: `${WALLET_ZARINPAL_CALLBACK_URL}`,
        },
      },
    });

    if (data.depositWallet.status === "OK") {
      dispatch(setWalletTransactionIdData(data.depositWallet.metadata.transaction_id));
      router.push(data.depositWallet.metadata?.url);
    }
  };

  return (
    <Formik
      initialValues={{ amount: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
        <BottomButtonLayout
          buttons={[
            <Button loading={loading} onPress={handleSubmit}>
              {tr("increase balance")}
            </Button>,
          ]}>
          <WhiteSpace size={24} />
          <Container>
            <Text heading2>{tr("increase balance")}</Text>
            <WhiteSpace size={4} />
            <Text caption type="grey2">
              {tr("select or enter an amount to increase your wallet balance.")}
            </Text>

            <WhiteSpace size={24} />

            <Text caption center type="grey2">
              {tr("wallet balance")}
            </Text>

            <WhiteSpace />

            <Text center>
              {localizeNumber(balance)} {tr("tooman")}
            </Text>

            <WhiteSpace size={32} />

            <Input
              name="amount"
              value={values.amount}
              onBlur={handleBlur("amount")}
              onChangeText={handleChange("amount")}
              placeholder={`${tr("amount")} (${tr("tooman")})`}
              errorMessage={touched.amount && (errors.amount as string)}
            />
          </Container>
        </BottomButtonLayout>
      )}
    </Formik>
  );
};

export default Increase;
