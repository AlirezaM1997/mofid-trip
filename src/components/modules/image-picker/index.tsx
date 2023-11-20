import React from "react";
import { FieldArray } from "formik";
import { Image, Text } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import useTranslation from "@src/hooks/translation";
import { Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CustomImagePicker = ({ field, form }) => {
  const { tr } = useTranslation();

  const pickImage = async push => {
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
      push(result.uri);
    }
  };

  const initialImages = Array.from({ length: Math.max(5, form.values[field.name].length) });

  return (
    <FieldArray name={field.name}>
      {({ push, remove }) =>
        initialImages.map((_, index) => (
          <Pressable
            key={index}
            onPress={() => pickImage(push)}
            style={styles.imageContainer(form.values[field.name][index])}>
            {form.values[field.name][index] ? (
              <>
                <Image
                  source={{ uri: form.values[field.name][index] }}
                  style={{ width: 330, height: 160 }}
                  resizeMode="cover"
                />
                <Text onPress={() => remove(index)}>Delete</Text>
              </>
            ) : (
              <MaterialCommunityIcons name="image-plus" size={24} color="black" />
            )}
          </Pressable>
        ))
      }
    </FieldArray>
  );
};

const styles = StyleSheet.create({
  imageContainer: image => ({
    height: 160,
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    alignItems: "center",
    borderStyle: "dashed",
    justifyContent: "center",
    borderWidth: image ? 0 : 2,
  }),
});

export default CustomImagePicker;
