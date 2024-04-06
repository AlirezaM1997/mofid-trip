import * as Yup from "yup";
import Input from "@atoms/input";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Formik, FormikProps } from "formik";
import Toast from "react-native-toast-message";
import React, { useRef, useState } from "react";
import useTranslation from "@src/hooks/translation";
import Container from "@src/components/atoms/container";
import handleUploadImage from "@src/helper/image-picker";
import { Button, Colors, useTheme } from "@rneui/themed";
import LoadingIndicator from "@modules/Loading-indicator";
import WhiteSpace from "@src/components/atoms/white-space";
import BottomButtonLayout from "@components/layout/bottom-button";
import { Image, Pressable, StyleSheet, ViewStyle } from "react-native";
import { useMyNgoDetailQuery, useNgoEditMutation } from "@src/gql/generated";
import convertImageURIToFile from "@src/helper/image-picker/convert-uri-to-file";

type PropsType = {
  title: string;
  address: string;
  image: string;
  description: string;
  contactNumber: string;
};

const Index = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const [editNgo, { loading }] = useNgoEditMutation();
  const innerRef = useRef<FormikProps<PropsType> | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { loading: loadingNGODetail, data: dataNGODetail } = useMyNgoDetailQuery();

  const handleImagePicker = async () => {
    const image = await handleUploadImage();
    convertImageURIToFile(image as string)
      .then(file => {
        setSelectedFile(file);
      })
      .catch(error => {
        console.error("Error:", error);
      });
    innerRef?.current && innerRef?.current?.setFieldValue("image", image);
  };

  const onSubmit = async (values: PropsType) => {
    let tempData = {
      title: values.title,
      address: values.address,
      description: values.description,
      contactNumber: values.contactNumber,
    };
    if (selectedFile !== null) {
      tempData = { ...tempData, image: selectedFile };
    }
    const { data } = await editNgo({
      variables: {
        data: tempData,
      },
    });
    if (data) {
      Toast.show({
        type: "success",
        text1: tr("Successful"),
      });
      router.push("/profile");
    }
  };

  if (loadingNGODetail) return <LoadingIndicator />;

  const detail = dataNGODetail?.NGODetail;

  const initialValues = {
    title: detail?.title,
    address: detail?.address,
    description: detail?.description,
    contactNumber: detail?.user?.phoneNumber,
    image: detail?.avatarS3?.small || null,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(tr("display name is required")),
  });

  return (
    <>
      <Formik
        innerRef={innerRef}
        validationSchema={validationSchema}
        initialValues={initialValues as PropsType}
        onSubmit={onSubmit}>
        {({ handleSubmit, values, handleChange, touched, errors }) => (
          <>
            <BottomButtonLayout
              contentContainerStyle={style.contentContainer}
              buttons={[
                <Button onPress={handleSubmit} size="lg" disabled={loading} loading={loading}>
                  {tr("confirm")}
                </Button>,
              ]}>
              <WhiteSpace />
              <Pressable style={style.imagePicker(theme)} onPress={handleImagePicker}>
                {values?.image ? (
                  <Image style={style.imageStyle} source={{ uri: values?.image }} />
                ) : (
                  <Feather name="camera" size={45} color={theme.colors.grey2} />
                )}
              </Pressable>
              <Container style={{ width: "100%" }}>
                <Input
                  label={tr("Title")}
                  value={values.title}
                  onChangeText={handleChange("title")}
                  errorMessage={(touched.title && errors.title) as string}
                />
                <Input
                  label={tr("Address")}
                  value={values.address as string}
                  onChangeText={handleChange("address")}
                  errorMessage={(touched.address && errors.address) as string}
                />
                <Input
                  disabled={true}
                  keyboardType="phone-pad"
                  label={tr("Contact Number")}
                  value={values.contactNumber as string}
                  onChangeText={handleChange("contactNumber")}
                  errorMessage={(touched.contactNumber && errors.contactNumber) as string}
                />
                <Input
                  multiline={true}
                  numberOfLines={4}
                  label={tr("Description")}
                  style={{ textAlignVertical: "top" }}
                  value={values.description as string}
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
  contentContainer: { alignItems: "center" },
  imagePicker: ((theme: { colors: { grey2: keyof Colors; grey0: keyof Colors } }) => ({
    width: 105,
    height: 105,
    borderWidth: 2,
    display: "flex",
    borderRadius: 50,
    borderColor: theme.colors.grey2,
    alignItems: "center",
    borderStyle: "dashed",
    justifyContent: "center",
    backgroundColor: theme.colors.grey0,
  })) as ViewStyle,
  imageStyle: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 50,
    resizeMode: "contain",
    borderColor: "transparent",
  },
  containerContainer: { width: "100%" },
});

export default Index;
