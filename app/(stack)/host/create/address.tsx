import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import BottomButtonLayout from "@components/layout/bottom-button";
import LocationPicker from "@modules/formik/fields/location-picker";
import HostCreateTabs from "@modules/virtual-tabs/host-create-tabs";
import { Button, Input, Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { setHostCreateData } from "@src/slice/host-create-slice";
import { RootState } from "@src/store";
import { router } from "expo-router";
import { Field, Formik } from "formik";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const HostCreateAddressScreen = () => {
  const innerRef = useRef();
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const { data } = useSelector((state: RootState) => state.hostCreateSlice);

  const initialValues = {
    province: data.accommodation.province,
    city: data.accommodation.city,
    address: data.accommodation.address,
    lat: data?.accommodation.lat,
    lng: data?.accommodation.lng,
  };

  const validationSchema = Yup.object().shape({
    province: Yup.string().required(tr("Province is required")),
    city: Yup.string().required(tr("City is required")),
    address: Yup.string().required(tr("Address is required")),
    lat: Yup.string().required(tr("Select location on the map")),
    lng: Yup.string().required(tr("Select location on the map")),
  });

  const handleBlurProvince = () => {
    innerRef.current.handleBlur("province");
    dispatch(
      setHostCreateData({
        ...data,
        accommodation: {
          ...data.accommodation,
          province: innerRef.current?.values?.province,
        },
      })
    );
  };

  const handleBlurCity = () => {
    innerRef.current.handleBlur("city");
    dispatch(
      setHostCreateData({
        ...data,
        accommodation: {
          ...data.accommodation,
          city: innerRef.current?.values?.city,
        },
      })
    );
  };

  const handleBlurAddress = () => {
    innerRef.current.handleBlur("address");
    dispatch(
      setHostCreateData({
        ...data,
        accommodation: {
          ...data.accommodation,
          address: innerRef.current?.values?.address,
        },
      })
    );
  };

  const handleSubmit = values => {
    dispatch(
      setHostCreateData({
        ...data,
        accommodation: values,
      })
    );
    router.push({
      pathname: "host/create/capacity",
      params: {
        x: -100 * 3,
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
          <HostCreateTabs index={2} />
          <WhiteSpace size={20} />
          <Container>
            <Text heading2 bold>
              {tr("Place of movement")}
            </Text>
            <Text type="grey3">
              {tr(
                "To easily find the origin and start the host, set the address and the map of the place of departure."
              )}
            </Text>
            <WhiteSpace size={20} />
            <Input
              name="province"
              placeholder={tr("Province")}
              textAlignVertical="top"
              onChangeText={handleChange("province")}
              onBlur={handleBlurProvince}
              value={values.province}
              errorMessage={touched.province && (errors.province as string)}
            />
            <Input
              name="city"
              placeholder={tr("City")}
              textAlignVertical="top"
              onChangeText={handleChange("city")}
              onBlur={handleBlurCity}
              value={values.city}
              errorMessage={touched.city && (errors.city as string)}
            />
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

export default HostCreateAddressScreen;
