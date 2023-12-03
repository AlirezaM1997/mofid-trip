import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Avatar, BottomSheet, Button, Divider, Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { TourGuestQueryType } from "@src/gql/generated";
import GuestCard from "./GuestCard";
import Container from "@atoms/container";

const RequestListBottomSheet = ({ currentStep, transaction }) => {
  const { tr } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Text caption style={style.moreDetail} onPress={() => setIsVisible(true)}>
        {tr("more details")}
      </Text>
      <BottomSheet isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
        <Container style={style.bottomSheet}>
          <Avatar rounded size={48} source={{ uri: transaction.owner.avatarS3.small }} />
          <View style={style.headerTextBox}>
            <Text subtitle2>
              {transaction.owner.fullname} / {tr("team leader")}
            </Text>
            <Text caption type="grey2">
              {transaction.owner.phoneNumber}
            </Text>
            <Text caption type="grey2">
              {tr("the request is pending review")}
            </Text>
          </View>
          <View style={style.headerButtonBox}>
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
        </Container>
        {transaction.tourGuests.length > 0 && (
          <>
            <Divider thickness={8} />
            <Container style={style.guestListInformation}>
              <Text>{`${tr("accompanying passengers")} (${transaction.tourGuests.length} ${tr(
                "person"
              )})`}</Text>
              <ScrollView contentContainerStyle={style.guestList}>
                {transaction.tourGuests.map((guest: TourGuestQueryType, i) => (
                  <GuestCard key={guest.id} guest={guest} index={i} transaction={transaction} />
                ))}
              </ScrollView>
            </Container>
          </>
        )}
        <Container style={style.footerButtonBox}>{currentStep().bottomBox}</Container>
      </BottomSheet>
    </>
  );
};

export const style = StyleSheet.create({
  moreDetail: {
    marginVertical: "auto",
    textDecorationLine: "underline",
  },
  bottomSheet: {
    alignItems: "center",
    gap: 16,
    paddingVertical: 20,
  },
  headerTextBox: {
    gap: 4,
    alignItems: "center",
  },
  headerButtonBox: {
    flexDirection: "row",
    gap: 16,
  },
  guestListInformation: {
    paddingVertical: 24,
    gap: 8,
  },
  guestList: { gap: 16 },

  footerButtonBox: {
    gap: 10,
    paddingTop: 12,
    flexDirection: "row",
  },
});

export default RequestListBottomSheet;
