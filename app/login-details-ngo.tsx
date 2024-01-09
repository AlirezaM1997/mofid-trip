import React from "react";
import * as Yup from "yup";
import Input from "@atoms/input";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import useTranslation from "@src/hooks/translation";
import LoadingIndicator from "@modules/Loading-indicator";
import BottomButtonLayout from "@components/layout/bottom-button";
import { Formik } from "formik";
import { Redirect } from "expo-router";
import { RootState } from "@src/store";
import { ScrollView } from "react-native-gesture-handler";
import { useSession } from "@src/context/auth";
import { useSelector } from "react-redux";
import { Button, Text } from "@rneui/themed";
import { useMyNgoDetailQuery, useNgoDetailQuery, useNgoEditMutation } from "@src/gql/generated";

const LoginDetailScreen = () => {
  const { tr } = useTranslation();
  const { session, signIn } = useSession();
  const [edit, { loading: editLoading }] = useNgoEditMutation();
  const { data, loading } = useMyNgoDetailQuery();
  const { redirectToScreenAfterLogin } = useSelector((state: RootState) => state.navigationSlice);

  if (loading) return <LoadingIndicator />;

  const initialValues = {
    title: data?.NGODetail.title,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(tr("Title is required")),
  });

  const submitHandler = async values => {
    const { data } = await edit({
      variables: {
        data: values,
      },
    });

    console.log("YY", data.ngoEdit.status);
    // if (data.ngoEdit.status === "ACCEPTED") {
    //   const parsedSession = JSON.parse(session);
    //   // signIn({
    //   //   ...parsedSession,
    //   //   metadata: {
    //   //     ...parsedSession.metadata,
    //   //     firstname: firstname,
    //   //     lastname: lastname,
    //   //   },
    //   // });
    // }
  };

  if (session) {
    const { firstname, lastname } = JSON.parse(session).metadata;
    if (firstname || lastname) {
      return redirectToScreenAfterLogin ? (
        <Redirect href={redirectToScreenAfterLogin} />
      ) : (
        <Redirect href="/" />
      );
    }
  }

  return (
    <Formik
      onSubmit={submitHandler}
      initialValues={initialValues}
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
                name="firstname"
                value={values.firstname}
                placeholder={tr("First Name")}
                onChangeText={handleChange("firstname")}
                errorMessage={touched?.firstname && (errors?.firstname as string)}
              />
              <Input
                name="lastname"
                value={values.lastname}
                placeholder={tr("Last Name")}
                onChangeText={handleChange("lastname")}
                errorMessage={touched?.lastname && (errors?.lastname as string)}
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
