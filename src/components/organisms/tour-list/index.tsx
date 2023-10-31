import { router } from "expo-router";
import useTourTable from "@src/hooks/db/tour";
import { TourQueryType } from "@src/gql/generated";
import React, { useEffect, useState } from "react";
import useTranslation from "@src/hooks/translation";
import TitleWithAction from "@modules/title-with-action";
import PlaceCard from "@src/components/modules/place-card";
import { ScrollView, View, StyleSheet } from "react-native";

function TourList() {
  const [list, setList] = useState<TourQueryType[]>();
  const { search } = useTourTable();
  const { tr } = useTranslation();

  useEffect(() => {
    const res = search({ page: {} });
    setList(res);
  }, []);

  return (
    <>
      <TitleWithAction
        title={tr("Available hosts")}
        actionTitle={tr("See All")}
        onActionPress={() => router.push("/search")}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
        style={style.listContainer}>
        {list?.map((tour, index) => (
          <View key={index}>
            <PlaceCard
              key={index}
              id={tour.id}
              name={tour.title}
              price={tour.price[0].price}
              address={tour.projects.accommodation.address}
              avatarS3={tour.projects.accommodation.avatarS3}
            />
          </View>
        ))}
      </ScrollView>
    </>
  );
}

const style = StyleSheet.create({
  listContainer: {
    minHeight: 370,
    display: "flex",
    marginBottom: 30,
    flexDirection: "row",
    paddingHorizontal: 3,
  },
});

export default TourList;
