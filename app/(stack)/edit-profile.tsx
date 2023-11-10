import { Feather } from "@expo/vector-icons";
import { Button, Divider, Input } from "@rneui/themed";
import Container from "@src/components/atoms/container";
import WhiteSpace from "@src/components/atoms/white-space";
import { useUserDetailQuery, useUserEditMutation } from "@src/gql/generated";
import { SECONDARY_COLOR } from "@src/theme";
import React, { useEffect, useRef, useState } from "react";
import { Image, Platform, ScrollView, StyleSheet } from "react-native";
import { Pressable, View } from "react-native";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/store";
import { setUserDetail } from "@src/slice/user-slice";
import { isBase64 } from "@src/helper/extra";
import useTranslation from "@src/hooks/translation";

const Page = () => {
  const { tr } = useTranslation();
  const dispatch = useDispatch();
  const [editProfile, { loading, data, error }] = useUserEditMutation();
  const { userDetail } = useSelector((state: RootState) => state.userSlice);
  const { loading: loadingUserDetail, data: dataUserDetail, error: errorUserDetail, refetch } = useUserDetailQuery();
  const [userDetailTemp, setUserDetailTemp] = useState({
    firstname: "",
    lastname: "",
    bio: "",
    base64Image: "",
  });

  useEffect(() => {
    setUserDetailTemp({
      firstname: userDetail?.firstname ?? "",
      lastname: userDetail?.lastname ?? "",
      bio: userDetail?.bio ?? "",
      base64Image: userDetail?.avatarS3?.small ?? "",
    });
  }, [userDetail]);

  const handleUploadImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      setUserDetailTemp({
        ...userDetailTemp,
        base64Image: `data:image/jpg;base64,${result.assets[0].base64}`,
      });
    }
  };

  const handleSave = () => {
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
    editProfile({
      variables: {
        data: tempData,
      },
    });
  };

  useEffect(() => {
    if (!loading && data) {
      refetch();
      Toast.show({
        type: "success",
        text1: tr("Successful"),
        text2: tr("Profile saved successfully"),
      });
    }
    if (error) {
      Toast.show({
        type: "error",
        text1: tr("Error"),
        text2: JSON.stringify(error.message),
      });
    }
  }, [loading, data, error]);

  useEffect(() => {
    if (!loadingUserDetail && dataUserDetail) {
      dispatch(setUserDetail(dataUserDetail.userDetail));
    }
  }, [loadingUserDetail, dataUserDetail, errorUserDetail]);

  return (
    <>
      <WhiteSpace size={20} />
      <ScrollView contentContainerStyle={style.container}>
        <Pressable style={style.imagePicker} onPress={handleUploadImage}>
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
              onChangeText={(t) => {
                setUserDetailTemp({
                  ...userDetailTemp,
                  firstname: t,
                });
              }}
            />
            <Input
              label={tr("Last Name")}
              value={userDetailTemp.lastname}
              onChangeText={(t) =>
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
              onChangeText={(t) =>
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
