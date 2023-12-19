import { Feather } from "@expo/vector-icons";
import { Button, Divider, Input, Text, useTheme } from "@rneui/themed";
import Container from "@src/components/atoms/container";
import WhiteSpace from "@src/components/atoms/white-space";
import { useNgoDetailQuery, useNgoEditMutation } from "@src/gql/generated";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import { Pressable, View } from "react-native";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import { isBase64 } from "@src/helper/extra";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import LoadingIndicator from "@modules/Loading-indicator";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useIsFocused } from "@react-navigation/native";

const EditNgoProfile = () => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const { localizeNumber } = useLocalizedNumberFormat();
  const isFocused = useIsFocused();
  const [editNgoProfile, { loading, data, error }] = useNgoEditMutation();
  const { loading: loadingNgoDetail, data: dataNgoDetail, refetch } = useNgoDetailQuery();

  const [ngoDetailTemp, setNgoDetailTemp] = useState({
    title: "",
    base64Image: "",
  });

  const handleUploadImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      setNgoDetailTemp({
        ...ngoDetailTemp,
        base64Image: `data:image/jpg;base64,${result?.assets[0]?.base64}`,
      });
    }
  };

  const handleSave = () => {
    let tempData = {
      title: ngoDetailTemp?.title ?? "",
      lat: 1.5,
      lng: 1.5,
    };
    if (ngoDetailTemp?.base64Image && isBase64(ngoDetailTemp?.base64Image)) {
      tempData = {
        ...tempData,
        base64Image: ngoDetailTemp?.base64Image ?? "",
      };
    }
    editNgoProfile({
      variables: {
        data: tempData,
      },
    });
  };
  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  useEffect(() => {
    setNgoDetailTemp({
      title: dataNgoDetail?.NGODetail?.title ?? "",
      base64Image: dataNgoDetail?.NGODetail?.user?.avatarS3?.small ?? "",
    });
  }, [loadingNgoDetail]);

  useEffect(() => {
    if (!loading && data) {
      Toast.show({
        type: "success",
        text1: tr("Successful"),
        text2: tr("Profile saved successfully"),
      });
      router.push("dashboard/profile");
    }
    if (error) {
      Toast.show({
        type: "error",
        text1: tr("Error"),
        text2: JSON.stringify(error.message),
      });
    }
  }, [loading, data, error]);
  if (loadingNgoDetail || !dataNgoDetail) return <LoadingIndicator />;

  return (
    <>
      <WhiteSpace size={20} />
      <ScrollView contentContainerStyle={style.container}>
        <Pressable style={style.imagePicker(theme)} onPress={handleUploadImage}>
          {ngoDetailTemp?.base64Image ? (
            <Image style={style.imageStyle} source={{ uri: ngoDetailTemp?.base64Image }} />
          ) : (
            <Feather name="camera" size={45} color={theme.colors.grey2} />
          )}
        </Pressable>

        <View style={style.containerContainer}>
          <Container>
            <Input
              label={tr("host name")}
              value={ngoDetailTemp.title}
              onChangeText={t => {
                setNgoDetailTemp({
                  ...ngoDetailTemp,
                  title: t,
                });
              }}
            />
            <Input
              label={tr("phone number")}
              value={localizeNumber(dataNgoDetail.NGODetail.user.phoneNumber)}
              disabled
              leftIcon={
                <Ionicons name="shield-checkmark-outline" size={24} color={theme.colors.success} />
              }
            />
          </Container>
        </View>
      </ScrollView>
      <Divider />
      <View style={style.btnContainer}>
        <Button
          onPress={handleSave}
          buttonStyle={style.btnContainerStyle}
          containerStyle={style.btnContainerStyle}
          size="lg"
          disabled={loading}
          loading={loading}>
          {tr("Save")}
        </Button>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  btnContainer: {
    display: "flex",
    alignItems: "center",
    padding: 15,
  },
  btnContainerStyle: {
    width: "100%",
  },
  container: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    flex: 1,
    gap: 20,
  },
  imagePicker: theme => ({
    borderColor: theme.colors.grey3,
    backgroundColor: theme.colors.grey0,
    width: 105,
    height: 105,
    borderRadius: 50,
    borderWidth: 2,
    borderStyle: "dashed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  imageStyle: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 50,
  },
  containerContainer: { width: "100%" },
});

export default EditNgoProfile;
