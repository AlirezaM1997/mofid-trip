import * as Yup from "yup";
import { Formik } from "formik";
import Input from "@atoms/input";
import { router, useLocalSearchParams } from "expo-router";
import { Image } from "@rneui/themed";
import React, { useState } from "react";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import { Button, Text } from "@rneui/themed";
import Toast from "react-native-toast-message";
import parseText from "@src/helper/number-input";
import { BANKES_DATA } from "@src/constant/banks";
import { ImageSourcePropType } from "react-native";
import useTranslation from "@src/hooks/translation";
import { useBankCardEditMutation, useUserDetailQuery } from "@src/gql/generated";
import BottomButtonLayout from "@components/layout/bottom-button";
import LoadingIndicator from "@modules/Loading-indicator";

const EditCardScreen = () => {
  const { tr } = useTranslation();
  const { cardId } = useLocalSearchParams();

  const [bankCardEdit, { loading }] = useBankCardEditMutation();

  const validationSchema = Yup.object().shape({
    iban: Yup.string().typeError(tr("must be a number")).min(24, tr("iban should be 24 character")),
    cardPan: Yup.string()
      .typeError(tr("must be a number"))
      .required(tr("cardPan is required"))
      .min(16, tr("cardpan should be 16 character"))
      .test("startsWithValidId", tr("this cardpan does not exist"), value => {
        if (value) {
          const stringValue = value.toString();
          const first6Chars = stringValue.substring(0, 6);
          return BANKES_DATA.some(item => item.cardPan.toString().startsWith(first6Chars));
        }
        return false;
      }),
  });

  const handleIcon = e => {
    const icon = BANKES_DATA.find(item => e.target.value.includes(item.cardPan))?.icon;
    icon && setBankIcon(icon);
  };

  const { data: userDetailData, loading: userDetailLoading } = useUserDetailQuery();

  if (userDetailLoading || !userDetailData) return <LoadingIndicator />;

  const card = userDetailData.userDetail.wallet.walletCards.find(card => card.id === cardId);

  const initialValues = {
    title: card.title,
    iban: card.iban.replace("IR", ""),
    cardPan: card.cardPan,
  };

  const [bankIcon, setBankIcon] = useState<string>(
    BANKES_DATA.find(item => card.cardPan.includes(item.cardPan))?.icon
  );

  const handleSubmit = async (value, resetForm) => {
    if (
      value.title === card.title &&
      `IR${value.iban}` === card.iban &&
      value.cardPan === card.cardPan
    )
      router.push("wallet/cards");
    else {
      const { data } = await bankCardEdit({
        variables: {
          data: {
            id: cardId.toString(),
            title: value.title,
            cardPan: value.cardPan,
            ...(value.iban ? { iban: `IR${value.iban}` } : {}),
          },
        },
      });

      if (data.bankCardEdit.status === "OK") {
        Toast.show({
          type: "success",
          text1: tr("card edited successfully"),
        });

        router.push("wallet/cards");
      }
      resetForm();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ values, errors, touched, handleBlur, handleSubmit, setFieldValue }) => (
        <BottomButtonLayout
          buttons={[
            <Button loading={loading} onPress={handleSubmit}>
              {tr("confirmation and registration")}
            </Button>,
          ]}>
          <Container>
            <WhiteSpace size={24} />

            <Text heading2>{tr("edit card")}</Text>

            <WhiteSpace size={6} />

            <Text caption type="grey2">
              {tr("to edit the card, touch the desired section to apply the desired changes")}
            </Text>

            <WhiteSpace size={24} />

            <Input
              name="title"
              value={values.title}
              onBlur={handleBlur("title")}
              placeholder={`${tr("card name")}`}
              onChangeText={text => setFieldValue("title", text)}
              errorMessage={touched.title && (errors.title as string)}
            />

            <WhiteSpace size={8} />

            <Input
              name="iban"
              maxLength={24}
              value={values.iban}
              onBlur={handleBlur("iban")}
              placeholder={`${tr("iban")}`}
              leftIcon={<Text>IR-</Text>}
              keyboardType="numeric"
              onChangeText={text => setFieldValue("iban", parseText(text))}
              errorMessage={touched.iban && (errors.iban as string)}
            />

            <WhiteSpace size={8} />

            <Input
              name="cardPan"
              maxLength={16}
              keyboardType="numeric"
              value={values.cardPan}
              onBlur={handleBlur("cardPan")}
              placeholder={`${tr("cardPan")}`}
              leftIcon={
                <Image source={bankIcon as ImageSourcePropType} style={{ width: 18, height: 18 }} />
              }
              onChange={handleIcon}
              onChangeText={text => setFieldValue("cardPan", parseText(text))}
              errorMessage={touched.cardPan && (errors.cardPan as string)}
            />
          </Container>
        </BottomButtonLayout>
      )}
    </Formik>
  );
};

export default EditCardScreen;
