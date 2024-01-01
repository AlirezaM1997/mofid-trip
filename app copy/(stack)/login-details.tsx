import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Input from "@atoms/input";
import { router } from "expo-router";
import { RootState } from "@src/store";
import Container from "@atoms/container";
import { useSelector } from "react-redux";
import WhiteSpace from "@atoms/white-space";
import { Button, Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { ScrollView } from "react-native-gesture-handler";
import LoadingIndicator from "@modules/Loading-indicator";
import BottomButtonLayout from "@components/layout/bottom-button";
import { useUserDetailQuery, useUserEditMutation } from "@src/gql/generated";

const LoginDetailScreen = () => {
  const { tr } = useTranslation();
  const { data, loading } = useUserDetailQuery();
  const [edit, { loading: editLoading }] = useUserEditMutation();
  const { redirectToScreenAfterLogin } = useSelector((state: RootState) => state.navigationSlice);

  if (loading || !data) return <LoadingIndicator />;

  const { bio, lastname, avatarS3 } = data?.userDetail;

  const submitHandler = async ({ name }) => {
    const { data } = await edit({
      variables: {
        data: {
          bio: bio,
          firstname: name,
          lastname: lastname,
          base64Image: avatarS3[0],
        },
      },
    });

    if (data.userEdit.status === "ACCEPTED") {
      router.push(redirectToScreenAfterLogin ? redirectToScreenAfterLogin : "/");
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(tr("display name is required")),
  });

  return (
    <Formik
      onSubmit={submitHandler}
      initialValues={{ name: "" }}
      validationSchema={validationSchema}>
      {({ values, handleChange, handleSubmit, touched, errors }) => (
        <BottomButtonLayout
          contentContainerStyle={{ flex: 1 }}
          buttons={[
            <Button loading={editLoading} onPress={handleSubmit}>
              {tr("submit and enter")}
            </Button>,
          ]}>
          <ScrollView>
            <Container>
              <WhiteSpace size={32} />
              <Text heading1>{tr("write a screen name for yourself")}</Text>
              <WhiteSpace size={4} />
              <Text caption>
                {tr("choose a display name for yourself to create an account on mofidtrip")}
              </Text>
              <WhiteSpace size={24} />
              <Input
                name="name"
                value={values.name}
                placeholder={tr("display name")}
                onChangeText={handleChange("name")}
                errorMessage={touched?.name && (errors?.name as string)}
              />
            </Container>
          </ScrollView>
          <Text center type="grey2">
            {tr(
              "by clicking the registration and login button, you agree to mofidtrip rules and regulations."
            )}
          </Text>
          <WhiteSpace />
        </BottomButtonLayout>
      )}
    </Formik>
  );
};

export default LoginDetailScreen;
