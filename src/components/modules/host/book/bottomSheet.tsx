import { Text } from "@rneui/themed";
import { RootState } from "@src/store";
import React, { useState } from "react";
import Container from "@atoms/container";
import { useSelector } from "react-redux";
import WhiteSpace from "@atoms/white-space";
import ButtonRow from "@modules/button-rows";
import { getCapacity } from "@src/helper/tour";
import Toast from "react-native-toast-message";
import { BottomSheet, Button } from "@rneui/themed";
import { ProjectQueryType } from "@src/gql/generated";
import { useFormatPrice } from "@src/hooks/localization";
import { router, useLocalSearchParams } from "expo-router";
import { ImageBackground, StyleSheet, View } from "react-native";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { useSession } from "@src/context/auth";

const BookHostBottomSheet = ({ project }: { project: ProjectQueryType }) => {
  const { tr } = useTranslation();
  const handleClose = () => setIsVisible(false);
  const { projectId, name } = useLocalSearchParams();
  const { localizeNumber } = useLocalizedNumberFormat();
  const [isVisible, setIsVisible] = useState<boolean>();
  const { session } = useSession();
  const isNgo = session ? JSON.parse(session)?.metadata?.is_ngo : false;
  const { formatPrice } = useFormatPrice();

  const handlePress = () => {
    // if (!isNgo) {
    //   setIsVisible(true);
    //   return;
    // }

    if (!session) return router.push("/authentication");

    if (getCapacity(project.capacity) === 0) {
      Toast.show({
        type: "error",
        text1: "Warning",
        text2: "There is no free capacity",
      });
      return;
    }

    router.push({
      pathname: "host/transaction/add",
      params: { projectId: projectId, name: name },
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
        <Button size="lg" onPress={handlePress}>
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
