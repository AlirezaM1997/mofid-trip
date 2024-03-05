import React, { useState } from "react";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import ButtonRow from "@modules/button-rows";
import { useSession } from "@src/context/auth";
import { ListItem, Text } from "@rneui/themed";
import { BottomSheet, Button } from "@rneui/themed";
import { router, useLocalSearchParams } from "expo-router";
import { ImageBackground, StyleSheet, View } from "react-native";
import useIsRtl, { useFormatPrice } from "@src/hooks/localization";
import { TourPackageType, TourQueryType } from "@src/gql/generated";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

const BookTourBottomSheet = ({ tour }: { tour: TourQueryType }) => {
  const isRtl = useIsRtl();
  const { tr } = useTranslation();
  const { tourId } = useLocalSearchParams();
  const { localizeNumber } = useLocalizedNumberFormat();
  const [isVisible, setIsVisible] = useState<boolean>();
  const { session } = useSession();
  const isNgo = session ? JSON.parse(session)?.metadata?.is_ngo : false;
  const { formatPrice } = useFormatPrice();

  const [isVisiblePrevent, setIsVisiblePrevent] = useState<boolean>(false);

  const handleBottomSheet = (p: any) => {
    if (isNgo) {
      setIsVisiblePrevent(true);
    } else {
      handleBuy(p)
    }
  };

  const handleBuy = (p: TourPackageType) => {
    if (session) {
      handleNavigateToReserve(p);
    } else {
      setIsVisiblePrevent(true);
    }
  };

  const handleNavigateToReserve = (tourPackage: TourPackageType) => {
    setIsVisible(false);
    router.push({
      pathname: `/tour/${tourId}/reservation/add/step-1`,
      params: {
        tourId: tourId,
        tourPackage: JSON.stringify(tourPackage),
      },
    });
  };

  return (
    <>
      <ButtonRow>
        <View>
          <Text>{tr("price per person")}</Text>
          <View style={style.priceContainer}>
            {tour?.packages?.[0].price <= 0 ? (
              <Text bold>{tr("it is free")}</Text>
            ) : (
              <Text body1 style={style.priceNumber}>
                {localizeNumber(
                  formatPrice(
                    (+tour?.packages?.[0]?.price as number) *
                      (1 - (tour?.packages?.[0]?.discount as number) / 100)
                  ) as string
                )}
              </Text>
            )}
          </View>
        </View>
        <Button
          disabled={tour?.statusStep?.name === "SUSPENSION" ? true : false}
          onPress={() => handleBottomSheet(tour?.packages[0])}>
          {tr("Reserve")}
        </Button>
      </ButtonRow>

      <BottomSheet isVisible={isVisiblePrevent} onBackdropPress={() => setIsVisiblePrevent(false)}>
        <Container>
          <ImageBackground
            style={style.rejectIcon}
            imageStyle={{ resizeMode: "contain" }}
            source={require("@assets/image/rejectIcon.svg")}
          />
          <Text heading1 center>
            محدودیت دسترسی
          </Text>
          <Text center>رزرو تور برای تشکل ها امکان پذیر نیست</Text>
          <WhiteSpace />
          <Button onPress={() => setIsVisiblePrevent(false)}>{tr("Ok")}</Button>
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
  priceNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  left: {
    flex: 1,
  },
  priceItem: (isRtl: boolean) => ({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: isRtl ? "row-reverse" : "row",
  }),
  rejectIcon: {
    width: 56,
    height: 56,
    margin: "auto",
  },
});

export default BookTourBottomSheet;
