import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import BottomButtonLayout from "@components/layout/bottom-button";
import TourCreateTab from "@modules/virtual-tabs";
import { Button, Input, Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { Formik } from "formik";
import { StyleSheet } from "react-native";

const Screen = () => {
  const { tr } = useTranslation();

  return (
    <BottomButtonLayout
      buttons={[
        <Button type="outline" color="secondary" disabled>
          {tr("Cancel")}
        </Button>,
        <Button>{tr("Next")}</Button>,
      ]}>
      <TourCreateTab index={0} />
      <WhiteSpace size={20} />
      <Container>
        <Text heading2 bold>
          {tr("Tour title and details")}
        </Text>
        <Text type="grey3">
          {tr("To find a tour, address and information about a tour for travelers in Nuwayside.")}
        </Text>
        <WhiteSpace size={20} />
        <Formik
          initialValues={{ email: "" }}
          validationSchema={{}}
          onSubmit={values => console.log(values)}>
          {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
            <>
              <Input
                textAlignVertical="top"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                errorMessage={errors.email}
                renderErrorMessage={!!touched.email && !!errors.email}
              />
              <Button onPress={handleSubmit}>Submit</Button>
            </>
          )}
        </Formik>
      </Container>
    </BottomButtonLayout>
  );
};

const styles = StyleSheet.create({
  formikContainer: {},
});

export default Screen;
