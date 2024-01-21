import React from "react";
import { router } from "expo-router";
import { RootState } from "@src/store";
import { useSelector } from "react-redux";
import WhiteSpace from "@atoms/white-space";
import { StyleSheet, View } from "react-native";
import HostSearch from "@organisms/search/host";
import TourSearch from "@organisms/search/tour";
import useTranslation from "@src/hooks/translation";
import Container from "@src/components/atoms/container";
import TitleWithAction from "@modules/title-with-action";
import SearchBar from "@src/components/modules/search-bar";
import Map from "@modules/map";
import { AccommodationQueryType, useTourListSearchQuery } from "@src/gql/generated";

const SearchScreen: React.FC = () => {
  const { tr } = useTranslation();

  const { filterSlice } = useSelector((state: RootState) => state);

  const { data: tourData, loading: tourLoading } = useTourListSearchQuery({
    notifyOnNetworkStatusChange: true,
    variables: filterSlice,
  });

  return (
    <>
      <SearchBar />
      <Map
        // lat={accommodation?.lat}
        // lng={accommodation?.lng}
        width={222}
        height={222}
        mapOptions={{
          dragging: false,
          zoomControl: false,
        }}
        mapMarkers={tourData?.tourList?.data?.map(tour => ({
          id: "string",
          position: {
            lat: (tour.destination as AccommodationQueryType)?.lat,
            lng: (tour.destination as AccommodationQueryType)?.lng,
          },
          size: [52, 60],
          icon: window.location.origin + "/assets/assets/image/marker.png",
          iconAnchor: [-26, 60],
        }))}
      />
      {filterSlice.search ? (
        <Container style={styles.container}>
          <View>
            <TitleWithAction
              size="body2"
              actionTitle={tr("See All")}
              onActionPress={() => router.push("/tour-list")}
              title={`${tr("all tours of")} ${filterSlice.search}`}
            />

            <WhiteSpace size={8} />
            <TourSearch data={tourData} loading={tourLoading} />
          </View>

          <View>
            <TitleWithAction
              size="body2"
              actionTitle={tr("See All")}
              onActionPress={() => router.push("/host-list")}
              title={`${tr("all hosts of")} ${filterSlice.search}`}
            />

            <WhiteSpace size={8} />
            <HostSearch />
          </View>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: { gap: 24 },
});

export default SearchScreen;
