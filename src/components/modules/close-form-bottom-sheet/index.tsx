import { RootState } from "@src/store";
import Container from "@atoms/container";
import { useSelector } from "react-redux";
import { BottomSheet } from "@rneui/themed";
import { useEffect, useState } from "react";
import WhiteSpace from "@atoms/white-space";
import { Button, Text } from "@rneui/themed";
import ButtonRow from "@modules/button-rows";
import { router, useNavigation } from "expo-router";
import useTranslation from "@src/hooks/translation";
import { ImageBackground, StyleSheet } from "react-native";

const CloseFormBottomSheet = () => {
  const { tr } = useTranslation();
  const navigation = useNavigation();
  const [isVisibleExit, setIsVisibleExit] = useState<boolean>(false);
  const { redirectToScreenAfterLogin } = useSelector((state: RootState) => state.navigationSlice);

  const handleOpen = () => setIsVisibleExit(true);
  const handleClose = () => {
    navigation.addListener("beforeRemove", beforeRemoveHandler);
    setIsVisibleExit(false);
  };

  const beforeRemoveHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigation.removeListener("beforeRemove", beforeRemoveHandler);
    handleOpen();
  };

  useEffect(() => {
    navigation.addListener("beforeRemove", beforeRemoveHandler);
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
          <Button
            type="outline"
            onPress={
              redirectToScreenAfterLogin
                ? () => {
                    router.push(redirectToScreenAfterLogin);
                    router.push(redirectToScreenAfterLogin);
                  }
                : () => {
                    router.replace("/");
                    router.replace("/");
                  }
            }>
            خارج شدن
          </Button>
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

export default CloseFormBottomSheet;
