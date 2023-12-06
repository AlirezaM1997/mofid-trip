import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { router } from "expo-router";
import { Input } from "@rneui/themed";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import { Button, Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import BottomButtonLayout from "@components/layout/bottom-button";
import { useBankCardAddMutation } from "@src/gql/generated";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetail } from "@src/slice/user-slice";
import { RootState } from "@src/store";

const initialValues = { title: "", iban: "", cardPan: "" };

const AddCardScreen = () => {
  const { tr } = useTranslation();
  const dispatch = useDispatch();
  const { userDetail } = useSelector((state: RootState) => state.userSlice);

  const [bankCardAdd, { loading }] = useBankCardAddMutation();

  const validationSchema = Yup.object().shape({
    cardPan: Yup.number()
      .typeError(tr("must be a number"))
      .min(1000000000000000, tr("cardpan should be 16 character"))
      .required(tr("cardPan is required")),
  });

  const handleSubmit = async value => {
    const { data } = await bankCardAdd({ variables: { data: value } });

    if (data.bankCardAdd.status === "OK") {
      Toast.show({
        type: "success",
        text1: tr("card added successfully"),
      });
      dispatch(
        setUserDetail({
          ...userDetail,
          wallet: {
            ...userDetail.wallet,
            walletCards: [...userDetail.wallet.walletCards, value],
          },
        })
      );
      router.push("wallet/cards");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
        <BottomButtonLayout
          buttons={[
            <Button loading={loading} onPress={handleSubmit}>
              {tr("register card")}
            </Button>,
          ]}>
          <Container>
            <WhiteSpace size={24} />

            <Text heading2>{tr("add a new card")}</Text>

            <WhiteSpace size={6} />

            <Text caption type="grey2">
              {tr(
                "to create a new card, write the main details of your bank card so that it is registered in this account in mofidtrip"
              )}
            </Text>

            <WhiteSpace size={24} />

            <Input
              name="title"
              value={values.title}
              onBlur={handleBlur("title")}
              onChangeText={handleChange("title")}
              placeholder={`${tr("card name")}`}
              errorMessage={touched.title && (errors.title as string)}
            />

            <WhiteSpace size={8} />

            <Input
              name="iban"
              value={values.iban}
              onBlur={handleBlur("iban")}
              placeholder={`${tr("iban")}`}
              onChangeText={handleChange("iban")}
              errorMessage={touched.iban && (errors.iban as string)}
            />

            <WhiteSpace size={8} />

            <Input
              name="cardPan"
              maxLength={16}
              value={values.cardPan}
              onBlur={handleBlur("cardPan")}
              placeholder={`${tr("cardPan")}`}
              onChangeText={handleChange("cardPan")}
              errorMessage={touched.cardPan && (errors.cardPan as string)}
            />
          </Container>
        </BottomButtonLayout>
      )}
    </Formik>
  );
};

export default AddCardScreen;
