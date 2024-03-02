import * as Yup from "yup";
import { Formik } from "formik";
import Input from "@atoms/input";
import React, { useState } from "react";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import { Text, useTheme } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import parseText from "@src/helper/number-input";
import useTranslation from "@src/hooks/translation";
import LoadingIndicator from "@modules/Loading-indicator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomButtonLayout from "@components/layout/bottom-button";
import NgoAuthenticationBottomSheet from "@modules/ngo-authentication-bottom-sheet";
import { NgoQueryType, useMyNgoDetailVerifyQuery, useNgoEditMutation } from "@src/gql/generated";

const NgoAuthenticationScreen = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { data, loading } = useMyNgoDetailVerifyQuery();
  const [submit, { loading: submitLoading }] = useNgoEditMutation();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(tr("invalid email address")),
    title: Yup.string().required(tr("ngo name is required")),
    address: Yup.string().required(tr("address is required")),
  });

  if (!data && loading) return <LoadingIndicator />;

  const { address, title, contactNumber, kind, description, user } = data?.NGODetail as NgoQueryType;
  const initialValues = {
    kind,
    title,
    address,
    description,
    contactNumber,
    email: user?.email,
  };

  const handleSubmit = async (values, resetForm) => {
    const { data } = await submit({
      variables: {
        data: values,
      },
    });
    if (data?.ngoEdit?.status === "OK") {
      setIsVisible(true);
      resetForm();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ values, errors, touched, handleChange, setFieldValue }) => (
        <BottomButtonLayout
          buttons={[
            <NgoAuthenticationBottomSheet
              isVisible={isVisible as boolean}
              setIsVisible={setIsVisible as React.Dispatch<React.SetStateAction<boolean>>}
              submitLoading={submitLoading as boolean}
            />,
          ]}>
          <WhiteSpace size={24} />

          <Container style={styles.container}>
            <Text heading2>{tr("verify your ngo!")}</Text>

            <WhiteSpace size={14} />

            <Input
              value={values.title}
              placeholder={tr("ngo name")}
              onChangeText={handleChange("title")}
              errorMessage={touched.title && (errors.title as string)}
            />
            <Input
              value={values.address as string}
              placeholder={tr("address")}
              onChangeText={handleChange("address")}
              errorMessage={touched.address && (errors.address as string)}
            />
            <Input
              disabled={true}
              value={user?.phoneNumber as string}
              keyboardType="number-pad"
              leftIcon={
                <MaterialCommunityIcons
                  size={24}
                  name="shield-check-outline"
                  color={theme.colors.success}
                />
              }
            />
            <Input
              keyboardType="number-pad"
              value={values.contactNumber as string}
              placeholder={tr("landline number")}
              onChangeText={t => setFieldValue("contactNumber", parseText(t))}
            />
            <Input
              value={values.email}
              placeholder={tr("email")}
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              errorMessage={touched.email && (errors.email as string)}
            />

            <View>
              <Input
                value={values.kind as string}
                placeholder={tr("ngo type")}
                onChangeText={handleChange("kind")}
              />
              <Text caption type="grey3">
                {tr("charity group, student ngo, cultural group or...")}
              </Text>
              <WhiteSpace size={10} />
            </View>

            <Input
              multiline={true}
              numberOfLines={4}
              value={values.description as string}
              placeholder={tr("description ...")}
              onChangeText={handleChange("description")}
            />
          </Container>
        </BottomButtonLayout>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
});

export default NgoAuthenticationScreen;
