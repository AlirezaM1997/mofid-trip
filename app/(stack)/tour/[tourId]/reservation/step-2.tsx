import React from "react";
import { Feather } from "@expo/vector-icons";
import Container from "@src/components/atoms/container";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import WhiteSpace from "@src/components/atoms/white-space";
import { View, StyleSheet } from "react-native";
import { Button, Divider, Text, useTheme } from "@rneui/themed";
import { useSelector } from "react-redux";
import { RootState } from "@src/store";
import { Formik } from "formik";
import { router, useLocalSearchParams } from "expo-router";
import { Platform } from "react-native";
import PressablePreview from "@modules/pressable-preview";
import { getCapacity } from "@src/helper/tour";
import useTourTable from "@src/hooks/db/tour";
import BottomButtonLayout from "@components/layout/bottom-button";
import { TourPackageType, useTourTransactionAddMutation } from "@src/gql/generated";
import useIsRtl from "@src/hooks/localization";

export default () => {
  const isRtl = useIsRtl()
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();
  const { userDetail } = useSelector((state: RootState) => state.userSlice);
  const { tourId, guests, tourPackage } = useLocalSearchParams();
  const { findById } = useTourTable();
  const tour = findById(tourId as string);
  const guestsObj = JSON.parse(guests as string);
  const tourPackageObj: TourPackageType = JSON.parse(tourPackage as string);

  const [tourTransactionAdd, { loading }] = useTourTransactionAddMutation();

  const handleSubmit = () => {
    tourTransactionAdd({
      variables: {
        data: {
          tourPackageId: tourPackageObj.id,
          guests: guestsObj,
        },
      },
    }).then(({data, errors}) => {
      console.log('data', data)
      console.log('errors', errors)
    })
  };

  return (
    <>
      <BottomButtonLayout
        buttons={[
          <Button containerStyle={style.btnItem2} size="lg" onPress={handleSubmit}>
            {tr("Send Request")}
          </Button>,
        ]}>
        <Container style={style.root}>
          <WhiteSpace size={10} />
          <Text heading2 bold>
            {tr("Final Information")}
          </Text>
          <Text type="grey3">
            {tr("Your registered details for the initial request and booking of the tour")}
          </Text>
          <WhiteSpace size={20} />
          <PressablePreview
            topTitle={tr("Tour")}
            title={`${tour.title} / ${tour.startTime}-${tour.endTime}`}
            icon={<Feather name="home" size={24} color={theme.colors.black} />}
            button={
              <Button
                color="secondary"
                type="outline"
                size="sm"
                onPress={() => router.push(`/book-accommodation/${tourId}/step-1`)}
                style={style.btn}>
                {tr("View")}
                <Feather name={isRtl ? "chevron-left" : "chevron-right"} size={24} color={theme.colors.black} />
              </Button>
            }
          />
          <WhiteSpace size={20} />
          <PressablePreview
            topTitle={tr("Passengers Count")}
            title={localizeNumber(guestsObj.length.toString())}
            icon={<Feather name="users" size={24} color={theme.colors.black} />}
            button={
              <Button
                color="secondary"
                type="outline"
                size="sm"
                onPress={() => router.push(`/book-accommodation/${tourId}/step-1`)}
                style={style.btn}>
                {tr("Edit")}
                <Feather name={isRtl ? "chevron-left" : "chevron-right"} size={24} color={theme.colors.black} />
              </Button>
            }
          />
          <WhiteSpace size={20} />
          <PressablePreview
            topTitle={tr("Group leader information")}
            title={userDetail.fullname}
            icon={<Feather name="users" size={24} color={theme.colors.black} />}
            button={
              <Button
                color="secondary"
                type="outline"
                size="sm"
                onPress={() => router.push(`/book-accommodation/${tourId}/step-1`)}
                style={style.btn}>
                {tr("Edit")}
                <Feather name={isRtl ? "chevron-left" : "chevron-right"} size={24} color={theme.colors.black} />
              </Button>
            }
          />
        </Container>
      </BottomButtonLayout>
    </>
  );
};

const style = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 12,
  },
  btnItem: {
    flex: 1,
  },
  btnItem2: {
    flex: 2,
  },
  btn: {
    width: 100,
  },
});
