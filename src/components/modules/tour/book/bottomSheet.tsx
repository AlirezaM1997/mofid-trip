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
import { TourPackageType, TourQueryType, TourStatusEnum } from "@src/gql/generated";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

const BookTourBottomSheet = ({ tour }: { tour: TourQueryType }) => {
  const isRtl = useIsRtl();
  const { tr } = useTranslation();
  const { session } = useSession();
  const { formatPrice } = useFormatPrice();
  const { tourId } = useLocalSearchParams();
  const { localizeNumber } = useLocalizedNumberFormat();
  const [isVisible, setIsVisible] = useState<boolean>();
  const isNgo = session ? JSON.parse(session)?.metadata?.is_ngo : false;

  const [isVisiblePrevent, setIsVisiblePrevent] = useState<boolean>(false);

  const handleBottomSheet = (p: any) => {
    if (isNgo) {
      setIsVisiblePrevent(true);
    } else {
      handleBuy(p);
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
  const tourPackage = tour?.packages?.[0];

  return (
    <>
      <ButtonRow>
        <View>
          <Text>{tr("price per person")}</Text>
          <View style={style.priceContainer}>
            {tour?.packages?.[0].price <= 0 ? (
              <Text bold>{tr("it is free")}</Text>
            ) : (
              <View style={style.bottomStyle}>
                <Text body2 bold>
                  {localizeNumber(
                    (
                      (tourPackage?.price as number) *
                      (1 - (tourPackage?.discount as number) / 100)
                    ).toLocaleString()
                  )}
                </Text>
                <Text
                  body2
                  bold
                  type="primary"
                  style={tourPackage?.discount ? { textDecorationLine: "line-through" } : {}}>
                  {localizeNumber(formatPrice(tourPackage?.price as number) as string)}
                </Text>
              </View>
            )}
          </View>
        </View>
        <Button
          disabled={
            [TourStatusEnum.End, TourStatusEnum.Suspension].includes(
              tour?.statusStep?.name as TourStatusEnum
            )
              ? true
              : false
          }
          onPress={handleBottomSheet}>
          {tr("Reserve")}
        </Button>
      </ButtonRow>

      <BottomSheet isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
        {tour?.packages.map((p, index) => (
          <ListItem
            key={index}
            onPress={() => handleBuy(p)}
            bottomDivider={index !== tour.packages.length - 1}>
            <ListItem.Content>
              <View style={style.priceItem(isRtl)}>
                <View>
                  <Text>{p.title}</Text>
                  <Text>{localizeNumber(formatPrice(p.price) as string)}</Text>
                </View>
                <Button size="sm" type="outline" onPress={() => handleBuy(p)}>
                  {tr("Buy")}
                </Button>
              </View>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>

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
  bottomStyle: {
    flexDirection: "row",
    display: "flex",
    gap: 8,
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
