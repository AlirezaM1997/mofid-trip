import * as Yup from "yup";
import { Formik } from "formik";
import { router } from "expo-router";
import React, { useState } from "react";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import { Image, Input } from "@rneui/themed";
import { Button, Text } from "@rneui/themed";
import Toast from "react-native-toast-message";
import { BANKES_DATA } from "@src/constant/banks";
import { ImageSourcePropType } from "react-native";
import useTranslation from "@src/hooks/translation";
import { useBankCardAddMutation } from "@src/gql/generated";
import BottomButtonLayout from "@components/layout/bottom-button";

const initialValues = { title: "", iban: "", cardPan: "" };

const AddCardScreen = () => {
  const { tr } = useTranslation();
  const [bankIcon, setBankIcon] = useState<string>("");

  const [bankCardAdd, { loading }] = useBankCardAddMutation();

  const validationSchema = Yup.object().shape({
    cardPan: Yup.number()
      .typeError(tr("must be a number"))
      .min(1000000000000000, tr("cardpan should be 16 character"))
      .required(tr("cardPan is required"))
      .test("startsWithValidId", tr("this cardpan does not exist"), value => {
        if (value) {
          const stringValue = value.toString();
          const first6Chars = stringValue.substring(0, 6);
          return BANKES_DATA.some(item => item.cardPan.toString().startsWith(first6Chars));
        }
        return false;
      }),
  });

  const handleSubmit = async value => {
    const { data } = await bankCardAdd({
      variables: {
        data: {
          title: value.title,
          cardPan: value.cardPan,
          ...(value.iban ? { iban: value.iban } : {}),
        },
      },
    });

    if (data.bankCardAdd.status === "OK") {
      Toast.show({
        type: "success",
        text1: tr("card added successfully"),
      });

      router.push("wallet/cards");
    }
  };

  const handleIcon = e => {
    const icon = BANKES_DATA.find(item => e.target.value.includes(item.cardPan))?.icon;
    icon && setBankIcon(icon);
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
              leftIcon={
                <Image source={bankIcon as ImageSourcePropType} style={{ width: 18, height: 18 }} />
              }
              onChange={handleIcon}
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
