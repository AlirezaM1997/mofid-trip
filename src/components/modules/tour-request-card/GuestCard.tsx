import { StyleSheet, View } from "react-native";
import React from "react";
import { Avatar, Divider, Text } from "@rneui/themed";
import { TourGuestQueryType, TourTransactionQueryType } from "@src/gql/generated";

 const GuestCard = ({
  transaction,
  guest,
  index,
}: {
  transaction: TourTransactionQueryType;
  guest: TourGuestQueryType;
  index: number;
}) => {
  return (
    <>
      <View style={style.guestCard}>
        <Avatar rounded size={48} source={{uri: guest.avatarS3?.[0]?.small}} />
        <View style={style.nameBox}>
          <Text subtitle2>
            {guest.firstname} {guest.lastname}
          </Text>
          <Text caption type="grey3">
            {guest.phoneNumber}
          </Text>
        </View>
      </View>
      {transaction.tourGuests.length < index + 1 && <Divider />}
    </>
  );
};

const style = StyleSheet.create({
  nameBox: {
    gap: 4,
    marginVertical: "auto",
  },
  guestCard: {
    flexDirection: "row-reverse",
    gap: 12,
  },
})

export default GuestCard;