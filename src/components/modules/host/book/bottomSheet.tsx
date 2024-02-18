import { Text } from "@rneui/themed";
import React, { useState } from "react";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import ButtonRow from "@modules/button-rows";
import Toast from "react-native-toast-message";
import { BottomSheet, Button } from "@rneui/themed";
import { ProjectQueryType } from "@src/gql/generated";
import { useFormatPrice } from "@src/hooks/localization";
import { router, useLocalSearchParams } from "expo-router";
import { ImageBackground, StyleSheet, View } from "react-native";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { useSession } from "@src/context/auth";
import { useDispatch } from "react-redux";
import { setRedirectToScreenAfterLogin } from "@src/slice/navigation-slice";

const BookHostBottomSheet = ({ project }: { project: ProjectQueryType }) => {
  const { tr } = useTranslation();
  const dispatch = useDispatch();
  const handleClose = () => setIsVisible(false);
  const { projectId, name } = useLocalSearchParams();
  const { localizeNumber } = useLocalizedNumberFormat();
  const [isVisible, setIsVisible] = useState<boolean>();
  const { session } = useSession();
  const isNgo = session ? JSON.parse(session)?.metadata?.is_ngo : false;
  const { formatPrice } = useFormatPrice();

  const handlePress = () => {
    if (!session) {
      dispatch(
        setRedirectToScreenAfterLogin({
          pathname: "host/transaction/add",
          params: {
            name: name,
            projectId: projectId,
            dateEnd: project.dateEnd,
            dateStart: project.dateStart,
          },
        })
      );
      return router.push("/user-login");
    }
    if (project?.capacity?.guestNumber === 0) {
      Toast.show({
        type: "error",
        text1: "Warning",
        text2: "There is no free capacity",
      });
      return;
    }

    router.push({
      pathname: "host/transaction/add",
      params: {
        name: name,
        projectId: projectId,
        dateEnd: project.dateEnd,
        dateStart: project.dateStart,
      },
    });
  };

  return (
    <>
      <ButtonRow>
        <View>
          <Text>{tr("Price")}</Text>
          <View style={style.priceContainer}>
            {project.price <= 0 ? (
              <Text bold>{tr("it is free")}</Text>
            ) : (
              <>
                <Text body1 style={style.priceNumber}>
                  {localizeNumber(formatPrice((project.price * (100 - project.discount)) / 100))}
                </Text>
                <Text bold> / {tr("Night")}</Text>
              </>
            )}
          </View>
        </View>
        <Button
          disabled={project.statusStep?.name === "SUSPENSION" ? true : false}
          size="lg"
          onPress={handlePress}>
          {tr("Book Now")}
        </Button>
      </ButtonRow>

      <BottomSheet isVisible={isVisible} onBackdropPress={handleClose}>
        <Container>
          <ImageBackground
            style={style.rejectIcon}
            imageStyle={{ resizeMode: "contain" }}
            source={require("@assets/image/rejectIcon.svg")}
          />
          <Text heading1 center>
            محدودیت دسترسی
          </Text>
          <Text center>رزرو هاست تنها برای تشکل ها امکان پذیر است</Text>
          <WhiteSpace />
          <Button onPress={handleClose}>{tr("Ok")}</Button>
        </Container>
      </BottomSheet>
    </>
  );
};

const style = StyleSheet.create({
  priceContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  priceNumber: { fontWeight: "bold", fontSize: 16 },
  left: {
    flex: 1,
  },
  right: {
    flex: 2,
  },
  rejectIcon: {
    margin: "auto",
    width: 56,
    height: 56,
  },
});

export default BookHostBottomSheet;
