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
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const Screen = () => {
  const innerRef = useRef();
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

  const handleBlurAddress = () => {
    innerRef.current.handleBlur("address");
    dispatch(
      setTourCreateData({
        ...data,
        origin: {
          ...data.origin,
          address: innerRef.current?.values?.address,
        },
      })
    );
  };

  const handleSubmit = values => {
    dispatch(
      setTourCreateData({
        ...data,
        origin: values,
      })
    );
    router.push({
      pathname: "tour/create/destination",
      params: {
        x: -95 * 3,
      },
    });
  };

  return (
    <Formik
      innerRef={innerRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
        <BottomButtonLayout
          buttons={[
            <Button onPress={handleSubmit}>{tr("Next")}</Button>,
            <Button type="outline" color="secondary" onPress={() => router.back()}>
              {tr("back")}
            </Button>,
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
              onBlur={handleBlurAddress}
              value={values.address}
              errorMessage={touched.address && (errors.address as string)}
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
