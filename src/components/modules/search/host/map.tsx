import Map from "@modules/map";
import { router } from "expo-router";
import { RootState } from "@src/store";
import { HEIGHT } from "@src/constants";
import { useTheme } from "@rneui/themed";
import { useSelector } from "react-redux";
import React, { ReactNode, useEffect, useState } from "react";
import { MapPropsType } from "@modules/map/index.web";
import HostSearchCard from "@modules/host/card/search-card";
import { useProjectListSearchLazyQuery } from "@src/gql/generated";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";

const SearchHostMap = ({ button, ...props }: { button?: ReactNode; props?: MapPropsType }) => {
  const { theme } = useTheme();
  const [selectedItem, setItem] = useState(null);

  const { filterSlice } = useSelector((state: RootState) => state);

  const [search, { data, loading }] = useProjectListSearchLazyQuery();

  useEffect(() => {
    search({
      variables: filterSlice,
    });
  }, []);

  const onMarkerClick = id => {
    setItem(
      <Pressable key={id} onPress={() => router.push(`host/${id}`)}>
        <HostSearchCard chevron={true} project={data.projectList.data.find(obj => obj.id === id)} />
      </Pressable>
    );
  };

  const onMoveHandler = bounds => {
    const { latHigh, latLow, lngHigh, lngLow } = bounds;
    console.log(latHigh, latLow, lngHigh, lngLow);
    setItem(null);
    search({
      variables: {
        ...filterSlice,
        filter: { ...filterSlice.filter, geoLimit: { latHigh, latLow, lngHigh, lngLow } },
      },
    });
  };

  return (
    <Map
      {...props}
      onMarkerClick={onMarkerClick}
      style={{ height: HEIGHT, borderRadius: 0 }}
      centerContent={loading && <ActivityIndicator size="large" color={theme.colors.primary} />}
      bottomCenterContent={
        <View style={styles.bottomContainer}>
          {button}
          {selectedItem}
        </View>
      }
      onMoveEnd={onMoveHandler}
      mapMarkers={
        (!loading &&
          data && [
            ...data.projectList.data.map(project => ({
              id: project.id,
              size: [80, 80],
              iconAnchor: [-26, 60],
              position: {
                lat: project?.accommodation.lat || 33,
                lng: project?.accommodation.lng || 33,
              },
              icon: window.location.origin + "/assets/assets/image/location-marker.png",
            })),
          ]) ||
        []
      }
      lat={data?.projectList?.data?.[0]?.accommodation?.lat || 30}
      lng={data?.projectList?.data?.[data?.projectList?.data?.length - 1]?.accommodation?.lng || 54}
    />
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    width: 350,
    marginBottom: 24,
  },
});

export default SearchHostMap;
