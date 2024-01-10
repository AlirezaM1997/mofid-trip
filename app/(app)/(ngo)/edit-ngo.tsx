import { Feather } from "@expo/vector-icons";
import { Button, Divider, Input, Text } from "@rneui/themed";
import Container from "@src/components/atoms/container";
import WhiteSpace from "@src/components/atoms/white-space";
import {
  useMyNgoDetailQuery,
  useNgoDetailQuery,
  useNgoEditMutation,
  useUserDetailQuery,
  useUserEditMutation,
} from "@src/gql/generated";
import { SECONDARY_COLOR } from "@src/theme";
import React, { useEffect, useRef, useState } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import { Pressable, View } from "react-native";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import { isBase64 } from "@src/helper/extra";
import useTranslation from "@src/hooks/translation";
import LoadingIndicator from "@modules/Loading-indicator";
import { Formik } from "formik";
import * as Yup from "yup";
import BottomButtonLayout from "@components/layout/bottom-button";

const Index = () => {
  const { tr } = useTranslation();
  const [editProfile, { loading }] = useNgoEditMutation();
  const { loading: loadingNGODetail, data: dataNGODetail } = useMyNgoDetailQuery();
  const innerRef = useRef();

  const handleUploadImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      innerRef.current.setFieldValue(
        "base64Image",
        `data:image/jpg;base64,${result.assets[0].base64}`
      );
    }
  };

  const onSubmit = async values => {
    const { data, errors } = await editProfile({ variables: { data: values } });
    if (data) {
      console.log("DATA", data, errors);
    }
  };

  if (loadingNGODetail) return <LoadingIndicator />;

  const detail = dataNGODetail.NGODetail;

  const initialValues = {
    title: detail.title,
    address: detail.address,
    base64Image: detail.avatarS3?.medium ? atob(detail.avatarS3.medium) : null,
    contactNumber: detail.contactNumber,
    description: detail.description,
    phoneNumber: null,
  };

  const phoneRegExp = /^\+(?:[0-9] ?){6,14}[0-9]$/;

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(tr("display name is required")),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, tr("Phone number is not valid"))
      .required(tr("Phone number is required")),
  });

  return (
    <>
      <Formik
        innerRef={innerRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {({ handleSubmit, values, handleChange, touched, errors }) => (
          <>
            <BottomButtonLayout
              contentContainerStyle={{
                alignItems: "center",
              }}
              buttons={[
                <Button
                  onPress={() => handleSubmit()}
                  size="lg"
                  disabled={loading}
                  loading={loading}>
                  {tr("confirm")}
                </Button>,
              ]}>
              <WhiteSpace />
              <Pressable style={style.imagePicker} onPress={handleUploadImage}>
                {values?.base64Image ? (
                  <Image style={style.imageStyle} source={{ uri: values?.base64Image }} />
                ) : (
                  <Feather name="camera" size={45} color="#ccc" />
                )}
              </Pressable>
              <Container style={{ width: "100%" }}>
                <Input
                  label={tr("Title")}
                  value={values.title}
                  onChangeText={handleChange("title")}
                  errorMessage={touched.title && (errors.title as string)}
                />
                <Input
                  label={tr("Phone Number")}
                  value={values.phoneNumber}
                  onChangeText={handleChange("phoneNumber")}
                  errorMessage={touched.phoneNumber && (errors.phoneNumber as string)}
                />
                <Input
                  label={tr("Address")}
                  value={values.address}
                  onChangeText={handleChange("address")}
                  errorMessage={touched.address && (errors.address as string)}
                />
                <Input
                  label={tr("Contact Number")}
                  value={values.contactNumber}
                  onChangeText={handleChange("contactNumber")}
                  errorMessage={touched.contactNumber && (errors.contactNumber as string)}
                  keyboardType="phone-pad"
                />
                <Input
                  label={tr("Description")}
                  value={values.description}
                  multiline={true}
                  numberOfLines={4}
                  style={{ textAlignVertical: "top" }}
                  onChangeText={handleChange("description")}
                />
              </Container>
            </BottomButtonLayout>
          </>
        )}
      </Formik>
    </>
  );
};

const style = StyleSheet.create({
  imagePicker: {
    borderColor: "#ccc",
    backgroundColor: "#F3F3F3",
    width: 105,
    height: 105,
    borderRadius: 50,
    borderWidth: 2,
    borderStyle: "dashed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 50,
  },
  containerContainer: { width: "100%" },
});

export default Index;
