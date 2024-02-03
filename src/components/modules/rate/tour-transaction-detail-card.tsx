import React from "react";
import moment from "jalali-moment";
import { router } from "expo-router";
import { Image, Text } from "@rneui/themed";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { Pressable, StyleSheet, View } from "react-native";
import { AccommodationQueryType } from "@src/gql/generated";

const TourTransactionDetailCard = ({ tourPackage , handleClose }) => {
  const { tr } = useTranslation();
  const formattedDate = (date: Date) => moment(date, "YYYY/MM/DD").locale("fa").format("D MMMM");
  const { localizeNumber } = useLocalizedNumberFormat();
  const handlePress = ()=>{
    handleClose();
    router.push(`tour/${tourPackage.tour.id}`)
  }
  return (
    <Pressable
      style={styles.routeToTourPageContainer}
      onPress={handlePress}>
      <View style={styles.tourDetailContainer}>
        <Image
          style={styles.tourAvatar}
          source={{
            uri: tourPackage.tour?.avatarS3[0]?.small,
          }}
        />

        <View style={styles.tourDetail}>
          <Text subtitle1 numberOfLines={1}>
            {tourPackage.tour.title}
          </Text>

          <Text numberOfLines={1} caption type="grey2">
            {(tourPackage.tour.destination as AccommodationQueryType)?.address}
          </Text>

          <View style={styles.date}>
            <Text caption type="grey2">
              {tr("beginning")} .
            </Text>
            <Text caption>{localizeNumber(formattedDate(tourPackage.tour.startTime))}</Text>
          </View>

          <View style={styles.date}>
            <Text caption type="grey2">
              {tr("end")} .
            </Text>
            <Text caption>{localizeNumber(formattedDate(tourPackage.tour.endTime))}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  routeToTourPageContainer: { gap: 24 },
  tourDetailContainer: {
    gap: 12,
    flexDirection: "row",
  },
  tourDetail: { width: 164, gap: 8, justifyContent: "center" },
  tourAvatar: {
    width: 154,
    height: 104,
    borderRadius: 12,
  },
  date: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default TourTransactionDetailCard;
