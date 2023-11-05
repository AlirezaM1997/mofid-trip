import { router } from "expo-router";
import useTourTable from "@src/hooks/db/tour";
import { TourQueryType } from "@src/gql/generated";
import React, { useEffect, useState } from "react";
import useTranslation from "@src/hooks/translation";
import TitleWithAction from "@modules/title-with-action";
import { ScrollView, View, StyleSheet } from "react-native";
import TourCard from "@modules/tour-card";

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
        contentContainerStyle={{ gap: 10 }}
        style={style.listContainer}>
        {list?.map((tour, index) => (
          <View key={index}>
            <TourCard
              key={index}
              id={tour.id}
              name={tour.title}
              price={tour.price[0].price}
              address={tour.projects?.[0].accommodation?.address}
              avatarS3={tour.projects?.[0].accommodation?.avatarS3}
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
    paddingHorizontal: 24,
  },
});

export default TourList;
