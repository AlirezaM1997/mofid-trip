import Map from "@modules/map";
import { router } from "expo-router";
import { RootState } from "@src/store";
import { HEIGHT } from "@src/constants";
import { useTheme } from "@rneui/themed";
import { useSelector } from "react-redux";
import { MapPropsType } from "@modules/map/index.web";
import HostSearchCard from "@modules/host/card/search-card";
import React, { ReactNode, useEffect, useState } from "react";
import { useProjectListSearchLazyQuery } from "@src/gql/generated";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";

const SearchHostMap = ({ button, ...props }: { button?: ReactNode; props?: MapPropsType }) => {
  const { theme } = useTheme();
  const [selectedItem, setItem] = useState(null);
  const [location, setLocation] = useState({ lat: 30, lng: 54 });

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

  const onMoveHandler = async bounds => {
    const { latHigh, latLow, lngHigh, lngLow } = bounds;

    setItem(null);

    const { data } = await search({
      variables: {
        ...filterSlice,
        filter: { ...filterSlice.filter, geoLimit: { latHigh, latLow, lngHigh, lngLow } },
      },
    });

    if (data.projectList.data.length) {
      setLocation({
        lat: data?.projectList?.data?.[0]?.accommodation?.lat,
        lng: data?.projectList?.data?.[data?.projectList?.data?.length - 1]?.accommodation?.lng,
      });
    }
  };

  return (
    <Map
      lat={location.lat}
      lng={location.lng}
      onMoveEnd={onMoveHandler}
      onMarkerClick={onMarkerClick}
      style={{ height: HEIGHT, borderRadius: 0 }}
      centerContent={loading && <ActivityIndicator size="large" color={theme.colors.primary} />}
      bottomCenterContent={
        <View style={styles.bottomContainer}>
          {button}
          {selectedItem}
        </View>
      }
      mapMarkers={
        (!loading &&
          data && [
            ...data.projectList.data.map(project => ({
              id: project.id,
              size: [60, 60],
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
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    gap: 16,
    width: 350,
    marginBottom: 24,
  },
});

export default SearchHostMap;
