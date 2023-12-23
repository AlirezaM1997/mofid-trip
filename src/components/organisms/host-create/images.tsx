import { Field } from "formik";
import { Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import useTranslation from "@src/hooks/translation";
import CustomImagePicker from "@modules/image-picker";
import WhiteSpace from "@atoms/white-space";
import HostImagePicker from "@modules/image-picker/host-image-picker";

const TabImage = () => {
  const { tr } = useTranslation();

  return (
    <>
      <View style={styles.header}>
        <Text heading2>{tr("Pictures related to the tour")}</Text>
        <Text caption type="grey2">
          {tr(
            "you can upload images related to your tour, please note that the size of the images should be less than 3 mb. note that this section is optional."
          )}
        </Text>
      </View>

      <WhiteSpace />

      <Field name="accommodation.base64Images" component={HostImagePicker} />
    </>
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

export default TabImage;
