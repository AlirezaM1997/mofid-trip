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
    address: data.origin.address,
    lat: data.origin.lat,
    lng: data.origin.lng,
  };

  const validationSchema = Yup.object().shape({
    address: Yup.string().required(tr("Address is required")),
    lat: Yup.string().required(tr("Select location on the map")),
    lng: Yup.string().required(tr("Select location on the map")),
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
          <TourCreateTab index={2} />
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
              name="address"
              placeholder={tr("Address")}
              textAlignVertical="top"
              onChangeText={handleChange("address")}
              onBlur={handleBlur("address")}
              value={values.address}
              errorMessage={touched.address && errors.address}
            />
            <Field name="lat" component={LocationPicker} />
            {console.log(touched , errors)}
            <WhiteSpace />
          </Container>
        </BottomButtonLayout>
      )}
    </Formik>
  );
};

export default Screen;
