import { Field, Formik } from "formik";
import { RootState } from "@src/store";
import Container from "@atoms/container";
import { Button, Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import TourCreateTab from "@modules/virtual-tabs";
import useTranslation from "@src/hooks/translation";
import CustomImagePicker from "@modules/image-picker";
import { useDispatch, useSelector } from "react-redux";
import { setTourCreateData } from "@src/slice/tour-create-slice";
import BottomButtonLayout from "@components/layout/bottom-button";
import { router } from "expo-router";

const initialValues = {
  images: { main: "", first: "", sec: "", third: "", fourth: "", fifth: "", sixth: "" },
};

const Screen = () => {
  const { tr } = useTranslation();
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.tourCreateSlice);

  const handleSubmit = values => {
    const images = Object.values(values.images).filter(path => path);
    dispatch(
      setTourCreateData({
        ...data,
        base64Images: images as string[],
      })
    );
    router.push({
      pathname: "tour/create/facilities",
      params: {
        x: -95 * 8,
      },
    });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleSubmit }) => (
        <BottomButtonLayout
          buttons={[
            <Button onPress={handleSubmit}>{tr("Next")}</Button>,
            <Button type="outline" color="secondary" onPress={() => router.back()}>
              {tr("back")}
            </Button>,
          ]}>
          <TourCreateTab index={6} />
          <Container style={styles.container}>
            <View style={styles.header}>
              <Text heading2>{tr("Pictures related to the tour")}</Text>
              <Text caption type="grey2">
                {tr(
                  "you can upload images related to your tour, please note that the size of the images should be less than 3 mb. note that this section is optional."
                )}
              </Text>
            </View>

            <Field name="images" component={CustomImagePicker} />
          </Container>
        </BottomButtonLayout>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  header: {
    gap: 8,
  },
  container: {
    gap: 24,
  },
});

export default Screen;
