import { StyleSheet, View } from "react-native";
import React, { ReactElement, useState } from "react";
import { Avatar, BottomSheet, Button, Colors, Divider, ListItem, Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import {
  TourGuestQueryType,
  TourTransactionQueryType,
  TransactionStatusEnum,
} from "@src/gql/generated";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import ButtonRow from "@modules/button-rows";
import { ScrollView } from "react-native-gesture-handler";
import { HEIGHT } from "@src/constants";

type PropsType = {
  transaction: TourTransactionQueryType;
  allRequest: boolean;
};

type LookupType = Record<
  string,
  { title: string; color: keyof Colors; bottomSheetTitle: string; bottomBox: ReactElement }
>;

const RequestList = ({ transaction, allRequest }: PropsType) => {
  const { tr } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  const handleCloseBottmSheet = () => setIsVisible(false);
  const handleOpenBottomSheet = () => setIsVisible(true);
  const currentStep = () => {
    const lookup: LookupType = {
      [TransactionStatusEnum.Request]: {
        title: tr("awaiting review"),
        color: "grey3",
        bottomSheetTitle: tr("the request is pending review"),
        bottomBox: (
          <ButtonRow>
            <Button disabled type="outline">
              {tr("request rejection")}
            </Button>
            <Button disabled type="solid">
              {tr("confirm request")}
            </Button>
          </ButtonRow>
        ),
      },
      [TransactionStatusEnum.Accept]: transaction.status.isActive
        ? {
            title: tr("accepted"),
            color: "success",
            bottomSheetTitle: tr("the request has been approved by you"),
            bottomBox: (
              <Button containerStyle={style.button} disabled type="outline">
                {tr("request rejection")}
              </Button>
            ),
          }
        : {
            title: tr("failed"),
            color: "error",
            bottomSheetTitle: tr("the request was rejected by you"),
            bottomBox: (
              <Button containerStyle={style.button} disabled type="solid">
                {tr("confirm request")}
              </Button>
            ),
          },
      [TransactionStatusEnum.Payment]: {
        title: tr("success receipt"),
        color: "info",
        bottomSheetTitle: tr("the passenger paid and the reservation was finalized"),
        bottomBox: (
          <Button containerStyle={style.button} disabled type="outline">
            {tr("request rejection")}
          </Button>
        ),
      },
    };
    return lookup[transaction.status.step];
  };

  return (
    <>
      <ListItem containerStyle={style.ownerCard} onPress={handleOpenBottomSheet}>
        <Avatar rounded size={48} source={{ uri: transaction.owner.avatarS3.small }} />
        <ListItem.Content style={style.requestCardTextBox}>
          <Text subtitle2>{transaction.owner.fullname}</Text>
          <Text type={currentStep()?.color}>{`${transaction.tourPackage.tour.title} / ${
            currentStep()?.title
          }`}</Text>
        </ListItem.Content>
        <Text caption style={style.moreDetail}>
          {tr("more details")}
        </Text>
      </ListItem>

      <BottomSheet isVisible={isVisible} onBackdropPress={handleCloseBottmSheet}>
        <View style={style.bottomSheet}>
          <View style={style.bottomSheetHeader}>
            <WhiteSpace />
            <Avatar rounded size={56} source={{ uri: transaction.owner.avatarS3.small }} />
            <View style={style.bottomSheetHeaderTextBox}>
              <Text subtitle2>
                {transaction.owner.fullname} / {tr("team leader")}
              </Text>
              <Text caption type="grey2">
                {transaction.owner.phoneNumber}
              </Text>
              <Text caption type={currentStep()?.color}>
                {currentStep()?.bottomSheetTitle}
              </Text>
            </View>
            <View style={style.headerButtonBox}>
              <Button
                iconPosition="right"
                icon={<Ionicons name="chatbubble-ellipses" size={18} color="black" />}
                type="outline"
                color="secondary"
                size="sm">
                {tr("message")}
              </Button>
              <Button
                iconPosition="right"
                icon={<MaterialIcons name="phone-in-talk" size={18} color="black" />}
                type="outline"
                color="secondary"
                size="sm">
                {tr("contact")}
              </Button>
            </View>
            <WhiteSpace />
          </View>
          <Divider thickness={8} />

          <ScrollView contentContainerStyle={style.guestListScrollView}>
            <Container style={style.guestList}>
              <WhiteSpace size={8} />
              <Text body2 type="grey2">{`${tr("accompanying passengers")} (${
                transaction.tourGuests.length
              } ${tr("person")})`}</Text>
              {transaction.tourGuests.map((guest: TourGuestQueryType, i) => (
                <>
                  <ListItem
                    key={guest.id}
                    pad={12}
                    containerStyle={{ padding: 0, direction: "rtl" }}>
                    <Avatar size={40} rounded source={{ uri: guest.avatarS3[0]?.small }} />
                    <ListItem.Content>
                      <Text subtitle2>
                        {guest.firstname} {guest.lastname}
                      </Text>
                      <Text caption type="grey3">
                        {guest.phoneNumber}
                      </Text>
                    </ListItem.Content>
                  </ListItem>
                  {transaction.tourGuests.length > i + 1 && <Divider />}
                </>
              ))}
            </Container>
          </ScrollView>
          <WhiteSpace size={24} />
          <Container>{currentStep()?.bottomBox}</Container>
        </View>
      </BottomSheet>
    </>
  );
};

const style = StyleSheet.create({
  moreDetail: {
    marginVertical: "auto",
    textDecorationLine: "underline",
  },
  button: {
    flex: 1,
  },
  headerButtonBox: {
    flexDirection: "row",
    gap: 16,
  },
  ownerCard: {
    padding: 0,
  },
  bottomSheet: { height: HEIGHT - 100 },
  bottomSheetHeader: { alignItems: "center", gap: 16 },
  bottomSheetHeaderTextBox: { alignItems: "center", gap: 4 },
  guestListScrollView: { flex: 1 },
  guestList: { gap: 16 },
  requestCardTextBox: { gap: 4 },
});

export default RequestList;
