import { Feather } from "@expo/vector-icons";
import LoadingIndicator from "@modules/Loading-indicator";
import { Button, Divider, Input } from "@rneui/themed";
import Container from "@src/components/atoms/container";
import WhiteSpace from "@src/components/atoms/white-space";
import { useUserDetailProfileQuery, useUserEditMutation } from "@src/gql/generated";
import { isBase64 } from "@src/helper/extra";
import handleUploadImage from "@src/helper/image-picker";
import useTranslation from "@src/hooks/translation";
import { SECONDARY_COLOR } from "@src/theme";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

const Page = () => {
  const { tr } = useTranslation();
  const [editProfile] = useUserEditMutation();
  const { loading, data } = useUserDetailProfileQuery();
  const [userDetailTemp, setUserDetailTemp] = useState({
    firstname: "",
    lastname: "",
    bio: "",
    base64Image: "",
  });

  const handleImagePicker = async () => {
    const imageBase64 = await handleUploadImage();
    setUserDetailTemp({
      ...userDetailTemp,
      base64Image: imageBase64 as string,
    });
  };

  const handleSave = async () => {
    let tempData = {
      firstname: userDetailTemp?.firstname ?? "",
      lastname: userDetailTemp?.lastname ?? "",
      bio: userDetailTemp?.bio ?? "",
    };
    if (userDetailTemp?.base64Image && isBase64(userDetailTemp.base64Image)) {
      tempData = {
        ...tempData,
        base64Image: userDetailTemp.base64Image ?? "",
      };
    }
    const { data } = await editProfile({ variables: { data: tempData } });
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
        base64Image: data?.userDetail?.avatarS3?.small ?? "",
      }),
    [data]
  );

  if (loading && !data) return <LoadingIndicator />;

  return (
    <>
      <WhiteSpace size={20} />
      <ScrollView contentContainerStyle={style.container}>
        <Pressable style={style.imagePicker} onPress={handleImagePicker}>
          {userDetailTemp?.base64Image ? (
            <Image style={style.imageStyle} source={{ uri: userDetailTemp?.base64Image }} />
          ) : (
            <Feather name="camera" size={45} color="#ccc" />
          )}
        </Pressable>

        <View style={style.containerContainer}>
          <Container>
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
        </View>
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
  textStyle: { color: SECONDARY_COLOR },
  imagePicker: {
    borderColor: "#ccc",
    backgroundColor: "#F3F3F3",
    width: 105,
    height: 105,
    borderRadius: 50,
    borderWidth: 2,
    borderStyle: "dashed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadText: {
    color: "#ccc",
  },
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
