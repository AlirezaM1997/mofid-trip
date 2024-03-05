import React, { useState } from "react";
import Container from "@atoms/container";
import { useDispatch } from "react-redux";
import WhiteSpace from "@atoms/white-space";
import ButtonRow from "@modules/button-rows";
import { useSession } from "@src/context/auth";
import { ListItem, Text } from "@rneui/themed";
import { BottomSheet, Button } from "@rneui/themed";
import { router, useLocalSearchParams } from "expo-router";
import useIsRtl, { useFormatPrice } from "@src/hooks/localization";
import { TourPackageType, TourQueryType } from "@src/gql/generated";
import { ImageBackground, StyleSheet, View, ViewStyle } from "react-native";
import { setRedirectToScreenAfterLogin } from "@src/slice/navigation-slice";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

const BookTourBottomSheet = ({ tour }: { tour: TourQueryType }) => {
  const isRtl = useIsRtl();
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const { session } = useSession();
  const { formatPrice } = useFormatPrice();
  const { tourId } = useLocalSearchParams();
  const { localizeNumber } = useLocalizedNumberFormat();
  const [isVisible, setIsVisible] = useState<boolean>();
  const isNgo = session ? JSON.parse(session)?.metadata?.is_ngo : false;
  const [isVisiblePrevent, setIsVisiblePrevent] = useState<boolean>(false);

  const handleBottomSheet = () => {
    if (session) {
      dispatch(
        setRedirectToScreenAfterLogin({
          pathname: `tour/${tourId}`,
          params: {
            tourId: tourId,
            name: tour.title,
          },
        })
      );
    }
    if (!session) {
      isNgo
        ? dispatch(
            setRedirectToScreenAfterLogin({
              pathname: `tour/${tourId}`,
              params: {
                tourId: tourId,
                name: tour.title,
              },
            })
          )
        : dispatch(
            setRedirectToScreenAfterLogin({
              pathname: `tour/${tourId}/reservation/add/step-1`,
              params: {
                tourId: tourId,
                tourPackage: JSON.stringify(tour.packages[0]),
              },
            })
          );
      return router.push("/user-login");
    }
    if (isNgo) {
      setIsVisiblePrevent(true);
    } else {
      setIsVisible(true);
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
          onPress={handleBottomSheet}>
          {tr("Reserve")}
        </Button>
      </ButtonRow>

      <BottomSheet isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
        {tour?.packages.map((p, index) => (
          <ListItem
            key={index}
            bottomDivider={index !== tour.packages.length - 1}
            onPress={() => handleBuy(p)}>
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
  priceNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  left: {
    flex: 1,
  },
  priceItem: ((isRtl: boolean) => ({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: isRtl ? "row-reverse" : "row",
  })) as ViewStyle,
  rejectIcon: {
    width: 56,
    height: 56,
    margin: "auto",
  },
});

export default BookTourBottomSheet;
