import Map from "@modules/map";
import { router } from "expo-router";
import { RootState } from "@src/store";
import { HEIGHT, WIDTH } from "@src/constants";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { Button, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { MapPropsType } from "@modules/map/index.web";
import HostSearchCard from "@modules/host/card/search-card";
import React, { ReactNode, useEffect, useState } from "react";
import { useProjectListSearchLazyQuery } from "@src/gql/generated";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";

const SearchHostMap = ({ button, ...props }: { button?: ReactNode; props?: MapPropsType }) => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const [bounds, setBounds] = useState({});
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
      <Pressable key={id} onPress={() => router.push(`host/${id}`)} style={styles.itemCard}>
        <HostSearchCard chevron={true} project={data.projectList.data.find(obj => obj.id === id)} />
      </Pressable>
    );
  };

  const onMoveHandler = bounds => {
    const latHigh = bounds[0][0];
    const latLow = bounds[1][0];
    const lngHigh = bounds[0][1];
    const lngLow = bounds[1][1];

    setBounds({
      latHigh,
      latLow,
      lngHigh,
      lngLow,
    });

    setItem(null);
  };

  const handleSearchArea = async () => {
    await search({
      variables: {
        ...filterSlice,
        filter: { ...filterSlice.filter, geoLimit: bounds },
      },
    });
  };

  return (
    <Map
      onMoveEnd={onMoveHandler}
      onMarkerClick={onMarkerClick}
      style={styles.map}
      centerContent={loading && <ActivityIndicator size="large" color={theme.colors.primary} />}
      topCenterContent={
        <Button
          size="sm"
          color="secondary"
          onPress={handleSearchArea}
          containerStyle={{ top: 120 }}
          icon={<AntDesign name="search1" color={theme.colors.white} />}>
          {tr("search this area")}
        </Button>
      }
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
  map: { height: HEIGHT, borderRadius: 0 },
  bottomContainer: {
    gap: 16,
    width: WIDTH,
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  itemCard: {
    width: 350,
  },
});

export default SearchHostMap;
