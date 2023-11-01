import React, { useEffect, useState } from "react";
import { Image, Platform, Pressable, StyleSheet, View } from "react-native";
import { Button, CheckBox, Input, Text, useTheme } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/store";
import { setData } from "@src/slice/transaction-slice";
import Container from "@src/components/atoms/container";
import WhiteSpace from "@src/components/atoms/white-space";
import { deepCopy, isValidPassportNo } from "@src/helper/extra";
import { SECONDARY_COLOR } from "@src/theme";
import { Feather } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import useTranslation from "@src/hooks/translation";
import { useFormikContext, getIn } from "formik";
import { GuestGenderEnum } from "@src/gql/generated";

const GuestFormItem = ({ index }) => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const { data } = useSelector((state: RootState) => state.transactionSlice);
  const { handleChange, values, errors, setValues, handleBlur, setFieldTouched, touched } = useFormikContext();

  const handleDelete = () => {
    const newItems = values.guests.filter(i => i.id !== values.guests[index].id);
    setValues({
      ...data,
      guests: newItems,
    });
  };

  // const handleUploadImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 4],
  //     quality: 1,
  //     base64: true,
  //   });

  //   if (!result.canceled) {
  //     if (result.assets[0].base64.length < 2047892) {
  //       handleChange(`guests[${index}].identifyPicture`)(
  //         `data:image/jpg;base64,${result.assets[0].base64}`
  //       );
  //     } else {
  //       alert("invalid file size");
  //     }
  //   }
  // };

  useEffect(() => {
    console.log(values)
  }, [values])

  return (
    <>
      <View
        style={[
          style.container,
          {
            backgroundColor: index % 2 ? theme.colors.grey0 : theme.colors.white,
          },
        ]}>
        <Container>
          <WhiteSpace size={10} />
          <Text variant="body1">
            #{index + 1}. {tr("person number")} {index + 1}
          </Text>
          <WhiteSpace size={10} />

          <Input
            name={`guests[${index}].name`}
            placeholder={tr("Name")}
            onChangeText={handleChange(`guests[${index}].name`)}
            onBlur={e => handleBlur(`guests[${index}].name`)}
            value={values?.guests?.[index]?.name || ""}
            errorMessage={errors?.guests?.[index]?.name}
          />

          {console.log("pp", index, errors?.guests?.[index]?.name)}

          <View style={style.checkboxContainer}>
            <CheckBox
              containerStyle={style.checkboxContainerStyle}
              textStyle={style.textStyle}
              title={tr("Male")}
              checked={values?.guests?.[index]?.gender === GuestGenderEnum.Male}
              onPress={() => handleChange(`guests.${index}.gender`)(GuestGenderEnum.Male)}
            />
            <CheckBox
              containerStyle={style.checkboxContainerStyle}
              textStyle={style.textStyle}
              title={tr("Female")}
              checked={values?.guests?.[index]?.gender === GuestGenderEnum.Female}
              onPress={() => handleChange(`guests.${index}.gender`)(GuestGenderEnum.Female)}
            />
          </View>

          {/* <Pressable style={style.imagePicker} onPress={handleUploadImage}>
            {values.guests[index]?.identifyPicture ? (
              <Image
                style={style.imageStyle}
                source={{ uri: values.guests[index]?.identifyPicture }}
              />
            ) : (
              <>
                <Feather name="image" size={45} color="#ccc" />
                <Text style={style.uploadText}>{tr("Upload")}</Text>
              </>
            )}
          </Pressable> */}

          <Button type="clear" color="secondary" onPress={handleDelete}>
            {tr("Delete Guest")}
          </Button>

          <WhiteSpace size={10} />
        </Container>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  container: {},
  checkboxContainer: {
    display: "flex",
    flexDirection: "row",
  },
  checkboxContainerStyle: { backgroundColor: "transparent", flex: 1 },
  textStyle: { color: SECONDARY_COLOR },
  imagePicker: {
    borderColor: "#ccc",
    width: "100%",
    height: 200,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: "dashed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GuestFormItem;
