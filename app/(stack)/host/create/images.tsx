import Container from "@atoms/container";
import BottomButtonLayout from "@components/layout/bottom-button";
import CustomImagePicker from "@modules/image-picker";
import HostCreateTabs from "@modules/virtual-tabs/host-create-tabs";
import { Button, Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { setHostCreateData } from "@src/slice/host-create-slice";
import { RootState } from "@src/store";
import { router } from "expo-router";
import { Field, Formik } from "formik";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const initialValues = {
  images: { main: "", first: "", sec: "", third: "", fourth: "", fifth: "", sixth: "" },
};

const HostCreateImagesScreen = () => {
  const { tr } = useTranslation();
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.hostCreateSlice);

  const handleSubmit = values => {
    const images = Object.values(values.images).filter(path => path);
    dispatch(
      setHostCreateData({
        ...data,
        base64Images: images as string[],
      })
    );
    console.log("data", data);
    router.push({
      pathname: "host/create/facilities",
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
          <HostCreateTabs index={6} />
          <Container style={styles.container}>
            <View style={styles.header}>
              <Text heading2>{tr("Pictures related to the host")}</Text>
              <Text caption type="grey2">
                {tr(
                  "you can upload images related to your host, please note that the size of the images should be less than 3 mb. note that this section is optional."
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

export default HostCreateImagesScreen;
