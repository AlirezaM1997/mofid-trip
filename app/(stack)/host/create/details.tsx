import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import BottomButtonLayout from "@components/layout/bottom-button";
import HostCreateTabs from "@modules/virtual-tabs/host-create-tabs";
import { Button, Input, Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { initialState, setHostCreateData } from "@src/slice/host-create-slice";
import { RootState } from "@src/store";
import { router } from "expo-router";
import { Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const HostCreateDetailsScreen = () => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const { data } = useSelector((state: RootState) => state.hostCreateSlice);
  const { name, description } = useSelector((state: RootState) => state.hostCreateSlice.data);

  const initialValues = { name: name, description: description };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(tr("Title is required")),
    description: Yup.string().nullable(),
  });

  const handleSubmit = values => {
    dispatch(
      setHostCreateData({
        ...data,
        ...values,
      })
    );

    router.push({
      pathname: "host/create/host-type",
      params: {
        x: -95,
      },
    });
  };

  useEffect(() => {
    // reset the redux
    return () => dispatch(setHostCreateData(initialState.data));
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
        <BottomButtonLayout
          buttons={[
            <Button onPress={handleSubmit}>{tr("Next")}</Button>,
            <Button type="outline" color="secondary" onPress={() => router.back()}>
              {tr("back")}
            </Button>,
          ]}>
          <HostCreateTabs index={0} />
          <WhiteSpace size={20} />
          <Container>
            <Text heading2 bold>
              {tr("Host title and details")}
            </Text>
            <Text type="grey3">
              {tr(
                "To find a host, address and information about a host for travelers in Nuwayside."
              )}
            </Text>
            <WhiteSpace size={20} />

            <Input
              name="name"
              placeholder={tr("Host Title")}
              textAlignVertical="top"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              errorMessage={touched.name && (errors.name as string)}
            />
            <Input
              name="description"
              placeholder={tr("Host Details")}
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
              errorMessage={touched.description && (errors.description as string)}
              textAlignVertical="top"
              multiline={true}
              numberOfLines={4}
            />
          </Container>
        </BottomButtonLayout>
      )}
    </Formik>
  );
};

export default HostCreateDetailsScreen;
