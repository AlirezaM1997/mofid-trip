import { Text } from "@rneui/themed";
import { AccommodationQueryType, ProjectQueryType, TourQueryType } from "@src/gql/generated";
import { router } from "expo-router";
import React from "react";
import { ImageBackground, Platform, Pressable, ScrollView, StyleSheet, View } from "react-native";

type PropsType = {
  tours: TourQueryType[];
  currentTourId: string;
};

type ItemPropsType = {
  tour: TourQueryType;
};

const Item = ({ tour }: ItemPropsType) => {
  return (
    <View style={style.card}>
      <ImageBackground
        style={style.imageContainerStyle}
        imageStyle={style.imageStyle}
        source={{
          uri: (tour?.destination as AccommodationQueryType)?.avatarS3?.[0]?.small || "",
        }}
      />
      <View style={style.cardTextContainer}>
        <Text numberOfLines={1} style={style.projectTitle} body1>
          {tour.title}
        </Text>
        <Text numberOfLines={1} style={style.projectAddress} body2>
          {(tour.destination as AccommodationQueryType)?.address}
        </Text>
        <Text style={style.price}>${tour.packages.prices?.[0].price.toString()}</Text>
      </View>
    </View>
  );
};

const SimilarTours = ({ tours, currentTourId }: PropsType) => {
  const handlePress = (tourId: ProjectQueryType["id"]) => router.push(`/tour/${tourId}`);

  return (
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
  );
};

const style = StyleSheet.create({
  contentContainerStyle: { gap: 15, paddingVertical: 5 },
  dummyContent: { width: 10 },
  card: {
    borderRadius: 10,
    borderWidth: 0,
    elevation: 1,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    maxWidth: 300,
    ...Platform.select({
      web: { boxShadow: "0 0 3px #12121233" },
    }),
  },
  imageContainerStyle: { width: 100, height: 100 },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  cardTextContainer: {
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
  },
  projectTitle: {
    width: 180,
    height: "auto",
    overflow: "hidden",
  },
  projectAddress: {
    width: 180,
    height: "auto",
    overflow: "hidden",
  },
  price: {
    fontWeight: "bold",
  },
});

export default SimilarTours;
