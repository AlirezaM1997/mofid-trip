import { Text, useTheme } from "@rneui/themed";
import { AccommodationQueryType, ProjectQueryType, TourQueryType } from "@src/gql/generated";
import { useFormatPrice } from "@src/hooks/localization";
import { router } from "expo-router";
import React from "react";
import { ImageBackground, Platform, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import useTranslation from "@src/hooks/translation";
import WhiteSpace from "@atoms/white-space";

type PropsType = {
  tours: TourQueryType[];
  currentTourId: string;
};

type ItemPropsType = {
  tour: TourQueryType;
};

const Item = ({ tour }: ItemPropsType) => {
  const { formatPrice } = useFormatPrice();
  const { theme } = useTheme();
  const { tr } = useTranslation();

  return (
    <View style={style.card}>
      <ImageBackground
        style={style.imageContainerStyle}
        imageStyle={style.imageStyle}
        source={
          (tour?.destination as AccommodationQueryType)?.avatarS3.length > 0
            ? {
                uri: (tour?.destination as AccommodationQueryType)?.avatarS3?.[0]?.small,
              }
            : require("@assets/image/defaultHost.svg")
        }
      />
      <View style={style.cardTextContainer}>
        <Text numberOfLines={1} body2 bold>
          {tour.title}
        </Text>
        <View style={style.address}>
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
          <Text body2 bold>
            {formatPrice(tour.packages[0].price)} / هر‌شب
          </Text>
        )}
      </View>
    </View>
  );
};

const SimilarTours = ({ tours, currentTourId }: PropsType) => {
  const handlePress = (tourId: ProjectQueryType["id"]) => router.push(`/tour/${tourId}`);

  return (
    <>
      <ScrollView horizontal contentContainerStyle={style.contentContainerStyle}>
        <View style={style.dummyContent} />
        {tours
          ?.filter(p => p.id !== currentTourId)
          .map((tour, index) => (
            <Pressable key={index} onPress={() => handlePress(tour.id)}>
              <Item tour={tour} />
            </Pressable>
          ))}
        <View style={style.dummyContent} />
      </ScrollView>
      <WhiteSpace size={16} />
    </>
  );
};

const style = StyleSheet.create({
  contentContainerStyle: { gap: 15, paddingVertical: 5 },
  dummyContent: { width: 10 },
  card: {
    height: 100,
    width: 300,
    borderRadius: 10,
    elevation: 1,
    padding: 8,
    gap: 10,
    flexDirection: "row",
    ...Platform.select({
      web: { boxShadow: "0 0 3px #12121233" },
    }),
  },
  imageContainerStyle: { width: 84, height: 84 },
  imageStyle: {
    width: 84,
    height: 84,
    borderRadius: 12,
  },
  cardTextContainer: {
    paddingVertical: 5,
    justifyContent: "space-between",
    width:180
  },
  price: {
    fontWeight: "bold",
  },
  address: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
});

export default SimilarTours;
