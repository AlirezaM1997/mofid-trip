import React from "react";
import { FieldArray } from "formik";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import useTranslation from "@src/hooks/translation";
import { Image, Text, useTheme } from "@rneui/themed";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CustomImagePicker = ({ field, form }) => {
  const { theme } = useTheme();
  const { tr } = useTranslation();

  const pickImage = async (item: string) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      base64: true,
      aspect: [4, 4],
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    if (result.canceled) {
      return;
    }

    if ("uri" in result) {
      form.setValues({ ...form.values, images: { ...form.values.images, [item]: result.uri } });
    }
  };

  const removeHandler = (item: string) => {
    form.setValues({
      ...form.values,
      images: { ...form.values.images, [item]: "" },
    });
  };

  return (
    <FieldArray name={field.name}>
      {() => (
        <>
          <Pressable
            onPress={() => pickImage("main")}
            style={[styles.imageContainer(form.values.images.main), styles.mainImageSize]}>
            {form.values.images.main ? (
              <>
                <Image
                  source={{ uri: form.values.images.main }}
                  style={{ width: 330, height: 160 }}
                  resizeMode="cover"
                />
                <Ionicons
                  size={19}
                  color={theme.colors.primary}
                  style={[styles.deleteIcon(theme), styles.mainDeleteIconPosition]}
                  name="trash-outline"
                  onPress={() => removeHandler("main")}
                />
              </>
            ) : (
              <View style={styles.placeHolder}>
                <MaterialCommunityIcons name="image-plus" size={24} color={theme.colors.black} />
                <Text>{tr("upload image")}</Text>
              </View>
            )}
          </Pressable>

          <View style={styles.imagesContainer}>
            {Object.keys(form.values.images)
              .slice(1)
              .map(item => (
                <Pressable
                  key={item}
                  onPress={() => pickImage(item)}
                  style={[styles.imageContainer(form.values.images[item]), styles.subImageSize]}>
                  {form.values.images[item] ? (
                    <>
                      <Image
                        source={{ uri: form.values.images[item] }}
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
                      <MaterialCommunityIcons
                        size={19}
                        name="image-plus"
                        color={theme.colors.black}
                      />
                      <Text body2>{tr("upload image")}</Text>
                    </View>
                  )}
                </Pressable>
              ))}
          </View>
        </>
      )}
    </FieldArray>
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
    borderWidth: image ? 0 : 2,
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
