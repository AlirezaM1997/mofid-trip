import { router } from "expo-router";
import TourCard from "@modules/tour-card";
import useTourTable from "@src/hooks/db/tour";
import React, { useEffect, useState } from "react";
import useTranslation from "@src/hooks/translation";
import TitleWithAction from "@modules/title-with-action";
import { ScrollView, View, StyleSheet } from "react-native";
import { AccommodationQueryType, TourQueryType } from "@src/gql/generated";

function TourList() {
  const [list, setList] = useState<TourQueryType[]>();
  const { syncTable, search } = useTourTable();
  const { tr } = useTranslation();

  useEffect(() => {
    syncTable({
      page: {
        pageNumber: 1,
        pageSize: 10,
      },
    });
    const res = search({
      page: {
        pageNumber: 1,
        pageSize: 10,
      },
    });
    setList(res);
  }, []);

  return (
    <>
      <TitleWithAction
        title={tr("available tours")}
        actionTitle={tr("See All")}
        onActionPress={() => router.push("/search")}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.gap}
        style={style.listContainer}>
        <View style={style.spacer}></View>
        {list?.map((tour, index) => (
          <View key={index}>
            <TourCard
              key={index}
              id={tour.id}
              name={tour.title}
              avatarS3={tour.avatarS3}
              price={tour.packages?.[0].price}
              address={(tour?.destination as AccommodationQueryType)?.address || ""}
            />
          </View>
        ))}
        <View style={style.spacer}></View>
      </ScrollView>
    </>
  );
}

const style = StyleSheet.create({
  listContainer: {
    minHeight: 370,
    display: "flex",
    flexDirection: "row",
  },
  gap: { gap: 10 },
  spacer: { width: 15 },
});

export default TourList;
