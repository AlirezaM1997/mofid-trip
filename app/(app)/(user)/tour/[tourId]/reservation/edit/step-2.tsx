import {
  TransactionStatusEnum,
  TourTransactionQueryType,
  useTourTransactionDetailQuery,
  useTourTransactionEditMutation,
  useUserDetailProfileQuery,
} from "@src/gql/generated";
import React from "react";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import useIsRtl from "@src/hooks/localization";
import Toast from "react-native-toast-message";
import { Button, Text, useTheme } from "@rneui/themed";
import Container from "@src/components/atoms/container";
import LoadingIndicator from "@modules/Loading-indicator";
import PressablePreview from "@modules/pressable-preview";
import WhiteSpace from "@src/components/atoms/white-space";
import { router, useLocalSearchParams } from "expo-router";
import BottomButtonLayout from "@components/layout/bottom-button";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

export default () => {
  const isRtl = useIsRtl();
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();
  const { tourId, transactionId, guests } = useLocalSearchParams();

  const guestsObj = JSON.parse(guests as string);

  const [tourTransactionEdit, {}] = useTourTransactionEditMutation();

  const { data: dataUserDetail } = useUserDetailProfileQuery();

  const { loading, data } = useTourTransactionDetailQuery({
    variables: {
      pk: transactionId as string,
    },
  });

  if (loading || !data || !dataUserDetail) return <LoadingIndicator />;

  const { status: transactionStatus, tourPackage } =
    data.tourTransactionDetail as TourTransactionQueryType;

  const handleSubmit = async () => {
    const { data: submitData } = await tourTransactionEdit({
      variables: {
        data: {
          status: {
            step: transactionStatus?.step?.name as TransactionStatusEnum,
            isActive: transactionStatus?.isActive,
          },
          guests: guestsObj,
          transactionId: transactionId as string,
        },
      },
    });
    if (submitData?.tourTransactionEdit?.status === "OK") {
      Toast.show({
        type: "success",
        text1: tr("Your request has been successfully submitted"),
      });
      router.push("/reservation");
    }
  };

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
            title={tourPackage?.tour?.title as string}
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
                      name: tourPackage?.tour?.title,
                    },
                  })
                }
                style={style.btn}>
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
              <Button
                color="secondary"
                type="outline"
                size="sm"
                onPress={() => router.back()}
                style={style.btn}>
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
            title={dataUserDetail?.userDetail?.fullname as string}
            icon={<Feather name="users" size={24} color={theme.colors.black} />}
            button={
              <Button
                color="secondary"
                type="outline"
                size="sm"
                onPress={() => router.back()}
                style={style.btn}>
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
