import Input from "@atoms/input";
import BottomButtonLayout from "@components/layout/bottom-button";
import { Feather } from "@expo/vector-icons";
import LoadingIndicator from "@modules/Loading-indicator";
import { Button } from "@rneui/themed";
import Container from "@src/components/atoms/container";
import WhiteSpace from "@src/components/atoms/white-space";
import { useMyNgoDetailQuery, useNgoEditMutation } from "@src/gql/generated";
import handleUploadImage from "@src/helper/image-picker";
import useTranslation from "@src/hooks/translation";

import { Formik } from "formik";
import React, { useRef } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import * as Yup from "yup";

const Index = () => {
  const { tr } = useTranslation();
  const [editProfile, { loading }] = useNgoEditMutation();
  const { loading: loadingNGODetail, data: dataNGODetail } = useMyNgoDetailQuery();
  const innerRef = useRef(null);

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
  };

  const phoneRegExp = /^\+(?:[0-9] ?){6,14}[0-9]$/;

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(tr("display name is required")),
    // contactNumber: Yup.string()
    //   .matches(phoneRegExp, tr("Phone number is not valid"))
    //   .required(tr("Phone number is required")),
  });

  const handleImagePicker = async () => {
    const imageBase64 = await handleUploadImage();
    innerRef.current && innerRef.current.setFieldValue("base64Image", `${imageBase64}`);
  };

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
              <Pressable style={style.imagePicker} onPress={handleImagePicker}>
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
