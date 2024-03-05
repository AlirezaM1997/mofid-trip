import { Text } from "@rneui/themed";
import React, { useState } from "react";
import Container from "@atoms/container";
import { useDispatch } from "react-redux";
import WhiteSpace from "@atoms/white-space";
import ButtonRow from "@modules/button-rows";
import { useSession } from "@src/context/auth";
import { BottomSheet, Button } from "@rneui/themed";
import { useFormatPrice } from "@src/hooks/localization";
import { router, useLocalSearchParams } from "expo-router";
import { ImageBackground, StyleSheet, View } from "react-native";
import { TourPackageType, TourQueryType } from "@src/gql/generated";
import { setRedirectToScreenAfterLogin } from "@src/slice/navigation-slice";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

const BookTourBottomSheet = ({ tour }: { tour: TourQueryType }) => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const { session } = useSession();
  const { formatPrice } = useFormatPrice();
  const { tourId } = useLocalSearchParams();
  const { localizeNumber } = useLocalizedNumberFormat();
  const isNgo = session ? JSON.parse(session)?.metadata?.is_ngo : false;
  const [isVisiblePrevent, setIsVisiblePrevent] = useState<boolean>(false);

  const handleNavigateToReserve = (tourPackage: TourPackageType) => {
    router.push({
      pathname: `/tour/${tourId}/reservation/add/step-1`,
      params: {
        tourId: tourId,
        tourPackage: JSON.stringify(tourPackage),
      },
    });
  };

  const handleBottomSheet = p => {
    if (session) {
      if (isNgo) {
        setIsVisiblePrevent(true);
      } else {
        dispatch(
          setRedirectToScreenAfterLogin({
            pathname: `tour/${tourId}`,
            params: {
              tourId: tourId,
              name: tour.title,
            },
          })
        );
        handleNavigateToReserve(p);
      }
    }
    if (!session) {
      dispatch(
        setRedirectToScreenAfterLogin({
          pathname: `tour/${tourId}`,
          params: {
            tourId: tourId,
            name: tour.title,
          },
        })
      );
      router.push("/user-login");
    }
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
              <Text heading2 bold>
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
    flexDirection: "row",
    alignItems: "center",
  },
  rejectIcon: {
    width: 56,
    height: 56,
    margin: "auto",
  },
});

export default BookTourBottomSheet;
