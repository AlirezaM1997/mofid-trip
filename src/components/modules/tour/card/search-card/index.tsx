import React from "react";
import { EvilIcons } from "@expo/vector-icons";
import useTranslation from "@src/hooks/translation";
import { Image, Text, useTheme } from "@rneui/themed";
import { useFormatPrice } from "@src/hooks/localization";
import { Platform, StyleSheet, View } from "react-native";
import { AccommodationQueryType, TourQueryType } from "@src/gql/generated";

const TourSearchCard = ({ tour }: { tour: TourQueryType }) => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { formatPrice } = useFormatPrice();

  return (
    <View style={styles.card}>
      <Image
        style={styles.imageStyle}
        source={
          tour?.avatarS3.length > 0
            ? {
                uri: tour?.avatarS3[0]?.small,
              }
            : require("@assets/image/defaultHost.svg")
        }
      />
      <View style={styles.cardTextContainer}>
        <Text numberOfLines={1} body2 bold>
          {tour.title}
        </Text>

        <View style={styles.address}>
          <EvilIcons name="location" size={16} color={theme.colors.grey3} />
          <Text numberOfLines={1} type="grey3" caption>
            {(tour.destination as AccommodationQueryType)?.address}
          </Text>
        </View>

        {tour.packages[0].price <= 0 ? (
          <Text body2 bold>
            {tr("it is free")}
          </Text>
        ) : (
          <Text body2 bold numberOfLines={1}>
            {formatPrice(tour.packages[0].price)}
            <Text body2>/ هر‌شب</Text>
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    gap: 10,
    width: 226,
    height: 86,
    padding: 8,
    elevation: 1,
    borderRadius: 10,
    flexDirection: "row",
    ...Platform.select({
      web: { boxShadow: "0 0 3px #12121233" },
    }),
  },
  imageStyle: {
    width: 64,
    height: 64,
    borderRadius: 6,
  },
  cardTextContainer: {
    width: "65%",
    justifyContent: "space-between",
  },
  address: {
    gap: 2,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default TourSearchCard;
