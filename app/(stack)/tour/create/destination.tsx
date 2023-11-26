import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import BottomButtonLayout from "@components/layout/bottom-button";
import LocationPicker from "@modules/formik/fields/location-picker";
import TourCreateTab from "@modules/virtual-tabs";
import { Button, Input, Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { setTourCreateData } from "@src/slice/tour-create-slice";
import { RootState } from "@src/store";
import { router } from "expo-router";
import { Field, Formik } from "formik";
import { Pressable, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const Screen = () => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const { data } = useSelector((state: RootState) => state.tourCreateSlice);

  const initialValues = {
    province: "",
    city: "",
    address: "",
    lat: 0,
    lng: 0,
  };

  const validationSchema = Yup.object().shape({
    province: Yup.string().required(tr("province is required")),
    city: Yup.string().required(tr("city is required")),
    address: Yup.string().required(tr("address is required")),
  });

  const handleSubmit = values => {
    dispatch(
      setTourCreateData({
        ...data,
        origin: values,
      })
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
        <BottomButtonLayout
          buttons={[
            <Button type="outline" color="secondary" disabled>
              {tr("Cancel")}
            </Button>,
            <Button onPress={handleSubmit}>{tr("Next")}</Button>,
          ]}>
          <TourCreateTab index={3} />
          <WhiteSpace size={20} />
          <Container>
            <Text heading2 bold>
              {tr("Place of movement")}
            </Text>
            <Text type="grey3">
              {tr(
                "To easily find the origin and start the tour, set the address and the map of the place of departure."
              )}
            </Text>
            <WhiteSpace size={20} />
            <Input
              name="province"
              placeholder={tr("Province")}
              textAlignVertical="top"
              onChangeText={handleChange("province")}
              onBlur={handleBlur("province")}
              value={values.province}
              errorMessage={touched.province && errors.province}
            />
            <Input
              name="city"
              placeholder={tr("City")}
              textAlignVertical="top"
              onChangeText={handleChange("city")}
              onBlur={handleBlur("city")}
              value={values.city}
              errorMessage={touched.city && errors.city}
            />
            <Input
              name="address"
              placeholder={tr("Address")}
              textAlignVertical="top"
              onChangeText={handleChange("address")}
              onBlur={handleBlur("address")}
              value={values.address}
              errorMessage={touched.address && errors.address}
            />
            <Field name="lat" component={LocationPicker} />
            <WhiteSpace />
          </Container>
        </BottomButtonLayout>
      )}
    </Formik>
  );
};

export default Screen;
