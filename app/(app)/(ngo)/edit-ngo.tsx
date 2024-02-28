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
import { Formik, FormikProps } from "formik";
import React, { useRef } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

type PropsType = {
  title: string;
  address: string;
  base64Image: string;
  description: string;
  contactNumber: string;
};

const Index = () => {
  const { tr } = useTranslation();
  const [editProfile, { loading }] = useNgoEditMutation();
  const { loading: loadingNGODetail, data: dataNGODetail } = useMyNgoDetailQuery();
  const innerRef = useRef<FormikProps<PropsType> | null>(null);

  const onSubmit = async (values: PropsType) => {
    const { data, errors } = await editProfile({ variables: { data: values } });
    if (data) {
      Toast.show({
        type: "success",
        text1: tr("Successful"),
      });
    }
  };

  if (loadingNGODetail) return <LoadingIndicator />;

  const detail = dataNGODetail?.NGODetail;

  const initialValues = {
    title: detail?.title,
    address: detail?.address,
    description: detail?.description,
    contactNumber: detail?.user?.phoneNumber,
    base64Image: detail?.avatarS3?.medium || null,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(tr("display name is required")),
  });

  const handleImagePicker = async () => {
    const imageBase64 = await handleUploadImage();
    innerRef?.current && innerRef?.current?.setFieldValue("base64Image", `${imageBase64}`);
  };

  return (
    <>
      <Formik
        innerRef={innerRef}
        validationSchema={validationSchema}
        initialValues={initialValues as PropsType}
        onSubmit={onSubmit}>
        {({ handleSubmit, values, handleChange, touched, errors }) => (
          <>
            {console.log(values)}
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
  imagePicker: {
    width: 105,
    height: 105,
    borderWidth: 2,
    display: "flex",
    borderRadius: 50,
    borderColor: "#ccc",
    alignItems: "center",
    borderStyle: "dashed",
    justifyContent: "center",
    backgroundColor: "#F3F3F3",
  },
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
