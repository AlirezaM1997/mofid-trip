import { View, StyleSheet } from "react-native";
import React, { ReactElement, useState } from "react";
import { Avatar, BottomSheet, Button, Colors, Divider, Text, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  useNgoDetailQuery,
  TourTransactionQueryType,
  TransactionStatusEnum,
} from "@src/gql/generated";
import LoadingIndicator from "@modules/Loading-indicator";
import { useLocalSearchParams, useNavigation } from "expo-router";

const RequestToMyToursScreen = () => {
  const { tr } = useTranslation();
  const { data, loading, error } = useNgoDetailQuery();
  const { tourName } = useLocalSearchParams();
  const navigation = useNavigation();

  navigation.setOptions({ title: tourName || tr("apply to my tours") });

  if (loading || !data) return <LoadingIndicator />;

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text heading2>
          {tourName ? tr("requests and passengers") : tr("requests received for tours")}
        </Text>
        <Text caption type="grey2">
          {tourName
            ? tr(
                "passengers who plan to travel with this tour. please check the submitted requests."
              )
            : tr("all requests received from travelers who plan to travel with your tours")}
        </Text>
      </View>
      <View style={style.cardList}>
        {(tourName
          ? data.NGODetail.tourTransactionSet.filter(
              tour => tour.tourPackage.tour.title === tourName
            )
          : data.NGODetail.tourTransactionSet
        ).map((transaction, i) => (
          <>
            <Comp transaction={transaction} tourName={tourName} />
            {tourName
              ? data.NGODetail.tourTransactionSet.filter(
                  tour => tour.tourPackage.tour.title === tourName
                ).length >
                  i + 1 && <Divider />
              : data.NGODetail.tourTransactionSet.length > i + 1 && <Divider />}
          </>
        ))}
      </View>
    </View>
  );
};

const Comp = ({
  transaction,
  tourName,
}: {
  transaction: TourTransactionQueryType;
  tourName: string;
}) => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const currentStep = () => {
    const lookup: Record<
      string,
      { title: string; color: keyof Colors; bottomSheetTitle: string; bottomBox: ReactElement }
    > = {
      [TransactionStatusEnum.Request]: {
        title: tr("awaiting review"),
        color: "grey3",
        bottomSheetTitle: tr("the request is pending review"),
        bottomBox: (
          <>
            <Button containerStyle={{ flex: 1 }} disabled type="outline">
              {tr("request rejection")}
            </Button>
            <Button containerStyle={{ flex: 1 }} disabled type="solid">
              {tr("confirm request")}
            </Button>
          </>
        ),
      },
      [TransactionStatusEnum.Accept]: transaction.status.isActive
        ? {
            title: tr("accepted"),
            color: "success",
            bottomSheetTitle: tr("the request has been approved by you"),
            bottomBox: (
              <Button containerStyle={{ flex: 1 }} disabled type="outline">
                {tr("request rejection")}
              </Button>
            ),
          }
        : {
            title: tr("failed"),
            color: "error",
            bottomSheetTitle: tr("the request was rejected by you"),
            bottomBox: (
              <Button containerStyle={{ flex: 1 }} disabled type="solid">
                {tr("confirm request")}
              </Button>
            ),
          },
      [TransactionStatusEnum.Payment]: {
        title: tr("success receipt"),
        color: "info",
        bottomSheetTitle: tr("the passenger paid and the reservation was finalized"),
        bottomBox: (
          <Button containerStyle={{ flex: 1 }} disabled type="outline">
            {tr("request rejection")}
          </Button>
        ),
      },
    };
    return lookup[transaction.status.step];
  };
  return (
    <>
      <View style={style.card}>
        <View style={style.avatarNameBox}>
          <Avatar rounded size={48} source={{ uri: transaction.owner.avatarS3.small }} />
          <View style={style.nameBox}>
            <Text subtitle2>{transaction.owner.fullname}</Text>
            <Text caption type={currentStep().color}>
              {!tourName && `${transaction.tourPackage.tour.title} /`} {currentStep().title}
            </Text>
          </View>
        </View>
        <Text caption style={style.moreDetail} onPress={() => setIsVisible(true)}>
          {tr("more details")}
        </Text>
      </View>

      <BottomSheet isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
        <View style={{ alignItems: "center", gap: 16, paddingVertical: 20 }}>
          <Avatar rounded size={48} source={{ uri: transaction.owner.avatarS3.small }} />
          <View style={{ gap: 4, alignItems: "center" }}>
            <Text subtitle2>
              {transaction.owner.fullname} / {tr("team leader")}
            </Text>
            <Text caption type="grey2">
              {transaction.owner.phoneNumber}
            </Text>
            <Text caption type="grey2">
              درخواست در انتظار بررسی می باشد
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <Button
              iconPosition="right"
              icon={<Ionicons name="chatbubble-ellipses" size={14} color="black" />}
              type="outline"
              color="secondary"
              size="sm">
              {tr("message")}
            </Button>
            <Button
              iconPosition="right"
              icon={<MaterialIcons name="phone-in-talk" size={14} color="black" />}
              type="outline"
              color="secondary"
              size="sm">
              {tr("contact")}
            </Button>
          </View>
        </View>
        {transaction.tourGuests.length > 0 && (
          <>
            <Divider thickness={8} />
            <View style={{ padding: 24, gap: 8 }}>
              <Text>{`${tr("accompanying passengers")} (${
                transaction.tourGuests.length
              } نفر)`}</Text>
              <View style={{ gap: 16 }}>
                {transaction.tourGuests.map((guest, i) => (
                  <>
                    <View style={{ direction: "rtl", flexDirection: "row", gap: 12 }}>
                      {/* backend avatar for geusts */}
                      <Avatar rounded size={48} source={require("@assets/image/Dambiz.jpg")} />
                      <View style={style.nameBox}>
                        <Text subtitle2>
                          {guest.firstname} {guest.lastname}
                        </Text>
                        <Text caption type="grey3">
                          {guest.phoneNumber}
                        </Text>
                      </View>
                    </View>
                    {transaction.tourGuests.length < i + 1 && <Divider />}
                  </>
                ))}
              </View>
            </View>
          </>
        )}
        <View style={{ gap: 10, padding: 24, flexDirection: "row" }}>
          {currentStep().bottomBox}
        </View>
      </BottomSheet>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 24,
    gap: 30,
  },
  header: {
    gap: 4,
  },
  cardList: {
    gap: 24,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatarNameBox: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
  },
  nameBox: {
    gap: 4,
    marginVertical: "auto",
  },
  moreDetail: {
    marginVertical: "auto",
    textDecorationLine: "underline",
  },
});

export default RequestToMyToursScreen;
