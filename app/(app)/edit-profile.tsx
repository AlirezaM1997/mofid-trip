import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import React, { useEffect, useState } from "react";
import useTranslation from "@src/hooks/translation";
import Container from "@src/components/atoms/container";
import handleUploadImage from "@src/helper/image-picker";
import LoadingIndicator from "@modules/Loading-indicator";
import WhiteSpace from "@src/components/atoms/white-space";
import { Button, Colors, Divider, Input, useTheme } from "@rneui/themed";
import convertImageURIToFile from "@src/helper/image-picker/convert-uri-to-file";
import { useUserDetailProfileQuery, useUserEditMutation } from "@src/gql/generated";
import { Image, Pressable, ScrollView, StyleSheet, View, ViewStyle } from "react-native";

const Page = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const [editProfile] = useUserEditMutation();
  const { loading, data } = useUserDetailProfileQuery();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userDetailTemp, setUserDetailTemp] = useState({
    bio: "",
    lastname: "",
    firstname: "",
    image: "",
  });

  const handleImagePicker = async () => {
    const image = await handleUploadImage();

    convertImageURIToFile(image as string)
      .then(file => {
        setSelectedFile(file);
      })
      .catch(error => {
        console.error("Error:", error);
      });
    setUserDetailTemp({ ...userDetailTemp, image: image as string });
  };

  const handleSave = async () => {
    let tempData = {
      firstname: userDetailTemp?.firstname ?? "",
      lastname: userDetailTemp?.lastname ?? "",
      bio: userDetailTemp?.bio ?? "",
    };
    if (selectedFile !== null) {
      tempData = { ...tempData, image: selectedFile };
    }
    const { data } = await editProfile({
      variables: {
        data: tempData,
      },
    });
    if (data?.userEdit?.status === "ACCEPTED") {
      Toast.show({
        type: "success",
        text1: tr("Successful"),
        text2: tr("Profile saved successfully"),
      });
      router.push("/profile");
    }
  };

  useEffect(
    () =>
      setUserDetailTemp({
        firstname: data?.userDetail?.firstname ?? "",
        lastname: data?.userDetail?.lastname ?? "",
        bio: data?.userDetail?.bio ?? "",
        image: data?.userDetail?.avatarS3?.small ?? "",
      }),
    [data]
  );

  if (loading && !data) return <LoadingIndicator />;

  return (
    <>
      <WhiteSpace size={20} />
      <ScrollView contentContainerStyle={style.container}>
        <Pressable style={style.imagePicker(theme)} onPress={handleImagePicker}>
          {userDetailTemp?.image ? (
            <Image style={style.imageStyle} source={{ uri: userDetailTemp?.image }} />
          ) : (
            <Feather name="camera" size={45} color={theme.colors.grey2} />
          )}
        </Pressable>

        <Container style={style.containerContainer}>
          <Input
            label={tr("First Name")}
            value={userDetailTemp.firstname}
            onChangeText={t => {
              setUserDetailTemp({
                ...userDetailTemp,
                firstname: t,
              });
            }}
          />
          <Input
            label={tr("Last Name")}
            value={userDetailTemp.lastname}
            onChangeText={t =>
              setUserDetailTemp({
                ...userDetailTemp,
                lastname: t,
              })
            }
          />
          <Input
            label={tr("Bio")}
            value={userDetailTemp.bio}
            multiline={true}
            numberOfLines={4}
            style={{ textAlignVertical: "top" }}
            onChangeText={t =>
              setUserDetailTemp({
                ...userDetailTemp,
                bio: t,
              })
            }
          />
        </Container>
      </ScrollView>
      <Divider />
      <View style={style.btnContainer}>
        <Button
          onPress={handleSave}
          buttonStyle={style.btnContainerStyle}
          containerStyle={style.btnContainerStyle}
          size="lg"
          disabled={loading || !userDetailTemp.firstname || !userDetailTemp.lastname}
          loading={loading}>
          {tr("confirm")}
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
  imagePicker: ((theme: { colors: { grey2: keyof Colors; grey0: keyof Colors } }) => ({
    borderColor: theme.colors.grey2,
    backgroundColor: theme.colors.grey0,
    width: 105,
    height: 105,
    borderRadius: 50,
    borderWidth: 2,
    borderStyle: "dashed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  })) as ViewStyle,
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

export default Page;
