import { Field } from "formik";
import { Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import useTranslation from "@src/hooks/translation";
import HostImagePicker from "@modules/image-picker/host-image-picker";

const TabImage = () => {
  const { tr } = useTranslation();

  return (
    <>
      <View style={styles.header}>
        <Text heading2 bold>{tr("Pictures related to the tour")}</Text>
        <Text caption type="grey2">
          {tr(
            "you can upload images related to your tour, please note that the size of the images should be less than 3 mb. note that this section is optional."
          )}
        </Text>
      </View>

      <Field name="accommodation.images" component={HostImagePicker} />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    gap: 5,
    marginBottom: 20
  },
});

export default TabImage;
