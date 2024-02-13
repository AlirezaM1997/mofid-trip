import React from "react";
import { FieldArray, useFormikContext } from "formik";
import { Ionicons } from "@expo/vector-icons";
import useTranslation from "@src/hooks/translation";
import { Image, Text, useTheme } from "@rneui/themed";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import WhiteSpace from "@atoms/white-space";
import { TourAddInputType } from "@src/gql/generated";
import handleUploadImage from "@src/helper/image-picker";

const CustomImagePicker = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { values, setFieldValue } = useFormikContext<TourAddInputType>();

  const handleImagePicker = async () => {
    const imageBase64 = await handleUploadImage();
    setFieldValue("base64Images", [...values.base64Images, imageBase64]);
  };

  const removeHandler = (targetIndex: string) => {
    setFieldValue(
      "base64Images",
      values.base64Images.filter((i, index) => index.toString() !== targetIndex)
    );
  };

  return (
    <>
      <Pressable
        onPress={handleImagePicker}
        style={[styles.imageContainer(values.base64Images?.[0]), styles.mainImageSize]}>
        {values.base64Images?.[0] ? (
          <>
            <Image
              source={{ uri: values.base64Images?.[0] }}
              style={{ width: 330, height: 160 }}
              resizeMode="cover"
            />
            <Ionicons
              size={19}
              color={theme.colors.primary}
              style={[styles.deleteIcon(theme), styles.mainDeleteIconPosition]}
              name="trash-outline"
              onPress={() => removeHandler("0")}
            />
          </>
        ) : (
          <View style={styles.placeHolder}>
            <MaterialCommunityIcons name="image-plus" size={24} color={theme.colors.black} />
            <Text>{tr("upload image")}</Text>
          </View>
        )}
      </Pressable>

      <WhiteSpace />

      <View style={styles.imagesContainer}>
        {Object.keys([0, 1, 2, 3, 4, 5]).map(item => (
          <Pressable
            key={item}
            onPress={handleImagePicker}
            style={[styles.imageContainer(true), styles.subImageSize]}>
            {values.base64Images?.[item] ? (
              <>
                <Image
                  source={{ uri: values.base64Images?.[item] }}
                  style={{ width: 100, height: 100 }}
                  resizeMode="cover"
                />
                <Ionicons
                  size={19}
                  color={theme.colors.primary}
                  style={[styles.deleteIcon(theme), styles.subDeleteIconPosition]}
                  name="trash-outline"
                  onPress={() => removeHandler(item)}
                />
              </>
            ) : (
              <View style={styles.placeHolder}>
                <MaterialCommunityIcons size={19} name="image-plus" color={theme.colors.black} />
                <Text body2>{tr("upload image")}</Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: image => ({
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
    borderStyle: "dashed",
    justifyContent: "center",
    borderWidth: 2,
  }),

  mainImageSize: {
    height: 160,
    width: "100%",
  },
  imagesContainer: {
    flex: 1,
    gap: 13,
    flexWrap: "wrap",
    marginBottom: 56,
    flexDirection: "row",
    justifyContent: "center",
  },

  subImageSize: {
    width: 100,
    height: 100,
  },
  placeHolder: {
    gap: 8,
    alignItems: "center",
  },
  deleteIcon: theme => ({
    padding: 4,
    borderRadius: 8,
    position: "absolute",
    backgroundColor: theme.colors.white,
  }),
  mainDeleteIconPosition: {
    right: 8,
    bottom: 8,
  },
  subDeleteIconPosition: {
    bottom: -6,
    right: "50%",
    transform: "translateX(50%)",
  },
});

export default CustomImagePicker;
