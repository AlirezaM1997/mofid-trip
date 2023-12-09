import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import BottomButtonLayout from "@components/layout/bottom-button";
import TourCreateTabs from "@modules/virtual-tabs/tour-create-tabs";
import { Button, Input, Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { initialState, setTourCreateData } from "@src/slice/tour-create-slice";
import { RootState } from "@src/store";
import { router } from "expo-router";
import { Formik } from "formik";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const DetailsTab = () => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const { data } = useSelector((state: RootState) => state.tourCreateSlice);
  const { title, description } = useSelector((state: RootState) => state.tourCreateSlice.data);

  const initialValues = { title: title, description: description };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(tr("Title is required")),
    description: Yup.string().nullable(),
  });

  const handleSubmit = values => {
    dispatch(
      setTourCreateData({
        ...data,
        ...values,
      })
    );
    router.replace({
      pathname: "tour/create/capacity",
      params: {
        x: -95,
      },
    });
  };

  useEffect(() => {
    // reset the redux
    return () => dispatch(setTourCreateData(initialState.data));
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit }) => (
        <>
          <Text heading2 bold>
            {tr("Tour title and details")}
          </Text>
          <Text type="grey3">
            {tr("To find a tour, address and information about a tour for travelers in Nuwayside.")}
          </Text>
          <WhiteSpace size={20} />

          <Input
            name="title"
            placeholder={tr("Tour Title")}
            textAlignVertical="top"
            onChangeText={handleChange("title")}
            onBlur={handleBlur("title")}
            value={values.title}
            errorMessage={touched.title && errors.title}
          />
          <Input
            name="description"
            placeholder={tr("Tour Details")}
            onChangeText={handleChange("description")}
            onBlur={handleBlur("description")}
            value={values.description}
            errorMessage={touched.description && errors.description}
            textAlignVertical="top"
            multiline={true}
            numberOfLines={4}
          />
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  formikContainer: {},
});

export default DetailsTab;
