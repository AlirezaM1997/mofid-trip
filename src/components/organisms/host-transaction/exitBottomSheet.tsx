import Container from "@atoms/container";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { BottomSheet } from "@rneui/themed";
import WhiteSpace from "@atoms/white-space";
import ButtonRow from "@modules/button-rows";
import { Feather } from "@expo/vector-icons";
import { Button, Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { router, useNavigation } from "expo-router";
import { ImageBackground, Pressable, StyleSheet } from "react-native";
import { setTourCreateActiveStep } from "@src/slice/tour-create-slice";

const HostTransactionExitBottomSheet = () => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const navigation = useNavigation();
  const [isVisibleExit, setIsVisibleExit] = useState(false);
  const [exitElement, setExitElement] = useState<"HardwareBackButton" | "BackButton">();

  const handleOpen = () => setIsVisibleExit(true);
  const handleClose = () => setIsVisibleExit(false);

  const handleExit = () => {
    if (exitElement === "BackButton") {
      router.back();
      router.back();
    } else {
      router.back();
    }
  };

  const handleHeaderBackButtonPress = () => {
    handleOpen();
    navigation.removeListener("beforeRemove", beforeRemoveHandler);
    setExitElement("BackButton");
  };

  const beforeRemoveHandler = e => {
    e.preventDefault();
    window.history.pushState(null, "", "/host/transaction/add");
    navigation.removeListener("beforeRemove", beforeRemoveHandler);
    setExitElement("HardwareBackButton");
    handleOpen();
  };

  useEffect(() => {
    navigation.addListener("beforeRemove", beforeRemoveHandler);
    return () => {
      dispatch(setTourCreateActiveStep(1));
      navigation.removeListener("beforeRemove", beforeRemoveHandler);
    };
  }, []);

  useEffect(() => {
    if (!isVisibleExit) {
      navigation.addListener("beforeRemove", beforeRemoveHandler);
    }
  }, [isVisibleExit]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={handleHeaderBackButtonPress}>
          <Feather name="arrow-right" size={24} color="black" style={{ marginRight: 12 }} />
        </Pressable>
      ),
    });
  }, []);

  return (
    <BottomSheet isVisible={isVisibleExit} onBackdropPress={handleClose}>
      <Container>
        <ImageBackground
          style={styles.rejectIcon}
          imageStyle={{ resizeMode: "contain" }}
          source={require("@assets/image/rejectIcon.svg")}
        />
        <Text heading1 center>
          آیا از خروج از این صفحه اطمینان دارید؟
        </Text>
        <Text center>در صورت خروج از این صفحه اطلاعات این فرم ها پاک خواهد شد</Text>
        <WhiteSpace />
        <ButtonRow>
          <Button onPress={handleExit}>خارج شدن</Button>
          <Button onPress={handleClose}>{tr("Stay")}</Button>
        </ButtonRow>
      </Container>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  rejectIcon: {
    margin: "auto",
    width: 56,
    height: 56,
  },
});

export default HostTransactionExitBottomSheet;
