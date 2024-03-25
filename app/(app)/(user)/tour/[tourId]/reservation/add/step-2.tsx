import {
  TourPackageType,
  TourQueryType,
  useTourDetailQuery,
  useTourTransactionAddMutation,
  useUserDetailProfileQuery,
} from "@src/gql/generated";
import moment from "jalali-moment";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import useIsRtl from "@src/hooks/localization";
import React, { useEffect, useState } from "react";
import { Button, Text, useTheme } from "@rneui/themed";
import Container from "@src/components/atoms/container";
import LoadingIndicator from "@modules/Loading-indicator";
import PressablePreview from "@modules/pressable-preview";
import { router, useLocalSearchParams } from "expo-router";
import WhiteSpace from "@src/components/atoms/white-space";
import BottomButtonLayout from "@components/layout/bottom-button";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

export default () => {
  const isRtl = useIsRtl();
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();
  const { tourId, guests, tourPackage } = useLocalSearchParams();
  const guestsObj = JSON.parse(guests as string);
  const tourPackageObj: TourPackageType = JSON.parse(tourPackage as string);
  const [tour, setTour] = useState<TourQueryType>();

  const [tourTransactionAdd] = useTourTransactionAddMutation();

  const { data: dataUserDetail } = useUserDetailProfileQuery();

  const { loading, data } = useTourDetailQuery({
    variables: {
      pk: tourId as string,
    },
  });

  const handleSubmit = () => {
    tourTransactionAdd({
      variables: {
        data: {
          tourPackageId: tourPackageObj.id,
          guests: guestsObj,
        },
      },
    }).then(({ data, errors }) => {
      if (!errors?.length) router.push("/reservation");
    });
  };

  useEffect(() => {
    if (!loading && data) {
      setTour(data.tourDetail as TourQueryType);
    }
  }, [loading, data]);

  if (loading || !tour || !dataUserDetail) return <LoadingIndicator />;

  return (
    <>
      <BottomButtonLayout
        buttons={[
          <Button containerStyle={style.btnItem2} size="lg" onPress={handleSubmit}>
            {tr("Send Request")}
          </Button>,
        ]}>
        <Container>
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
            title={tour.title}
            icon={<Feather name="home" size={24} color={theme.colors.black} />}
            button={
              <Button
                color="secondary"
                type="outline"
                size="sm"
                onPress={() =>
                  router.push({
                    pathname: `/tour/${tourId}`,
                    params: {
                      name: tour.title,
                    },
                  })
                }>
                {tr("View")}
                <Feather
                  name={isRtl ? "chevron-left" : "chevron-right"}
                  size={24}
                  color={theme.colors.black}
                />
              </Button>
            }
          />
          <WhiteSpace size={20} />
          <PressablePreview
            topTitle={tr("Passengers Count")}
            title={localizeNumber(guestsObj.length.toString())}
            icon={<Feather name="users" size={24} color={theme.colors.black} />}
            button={
              <Button color="secondary" type="outline" size="sm" onPress={() => router.back()}>
                {tr("Edit")}
                <Feather
                  name={isRtl ? "chevron-left" : "chevron-right"}
                  size={24}
                  color={theme.colors.black}
                />
              </Button>
            }
          />
          <WhiteSpace size={20} />
          <PressablePreview
            topTitle={tr("Group leader information")}
            title={dataUserDetail.userDetail?.fullname as string}
            icon={<Feather name="users" size={24} color={theme.colors.black} />}
            button={
              <Button color="secondary" type="outline" size="sm" onPress={() => router.back()}>
                {tr("Edit")}
                <Feather
                  name={isRtl ? "chevron-left" : "chevron-right"}
                  size={24}
                  color={theme.colors.black}
                />
              </Button>
            }
          />
        </Container>
      </BottomButtonLayout>
    </>
  );
};

const style = StyleSheet.create({
  btnItem2: {
    flex: 2,
  },
  btn: {
    width: 100,
  },
});
