import { FilesContext } from "./context";
import React, { useContext } from "react";
import { useFormikContext } from "formik";
import WhiteSpace from "@atoms/white-space";
import { Ionicons } from "@expo/vector-icons";
import useTranslation from "@src/hooks/translation";
import { TourAddInputType } from "@src/gql/generated";
import handleUploadImage from "@src/helper/image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, Image, Text, useTheme } from "@rneui/themed";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import convertImageURIToFile from "@src/helper/image-picker/convert-uri-to-file";

const CustomImagePicker = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { selectedFiles, setSelectedFiles } = useContext(FilesContext);
  const { values, setFieldValue } = useFormikContext<TourAddInputType>();

  const handleImagePicker = async () => {
    const image = await handleUploadImage();
    setFieldValue("images", values?.images?.length ? [...values.images, image] : [image]);
    convertImageURIToFile(image as string).then(file => {
      setSelectedFiles([...selectedFiles, file]);
    });
  };

  const removeHandler = (targetIndex: string) => {
    setFieldValue(
      "images",
      values?.images?.filter((i, index) => index.toString() !== targetIndex)
    );
    setSelectedFiles(selectedFiles.filter((i, index) => index.toString() !== targetIndex));
  };

  return (
    <>
      <Pressable onPress={handleImagePicker} style={[styles.imageContainer, styles.mainImageSize]}>
        {values.images?.[0] ? (
          <>
            <Image
              source={{ uri: values.images?.[0] }}
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
            style={[styles.imageContainer, styles.subImageSize]}>
            {values.images?.[+item] ? (
              <>
                <Image
                  source={{ uri: values.images?.[+item] }}
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
  imageContainer: {
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
    borderStyle: "dashed",
    justifyContent: "center",
    borderWidth: 2,
  },

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
  deleteIcon: ((theme: { colors: { white: keyof Colors } }) => ({
    padding: 4,
    borderRadius: 8,
    position: "absolute",
    backgroundColor: theme.colors.white,
  })) as ViewStyle,
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
