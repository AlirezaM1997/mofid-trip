import Map from "@modules/map";
import { router } from "expo-router";
import { RootState } from "@src/store";
import debounce from "lodash/debounce";
import { useTheme } from "@rneui/themed";
import { HEIGHT, WIDTH } from "@src/constants";
import { setFilter } from "@src/slice/filter-slice";
import { MapPropsType } from "@modules/map/index.web";
import { useDispatch, useSelector } from "react-redux";
import HostSearchCard from "@modules/host/card/search-card";
import { useProjectListSearchLazyQuery } from "@src/gql/generated";
import React, { ReactElement, ReactNode, memo, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";

const MemoizedMap = memo(Map);

const SearchHostMap = ({ button, ...props }: { button?: ReactNode; props?: MapPropsType }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [bounds, setBounds] = useState();
  const [selectedItem, setItem] = useState<ReactElement | null>(null);

  const { filterSlice } = useSelector((state: RootState) => state);

  const [search, { data, loading }] = useProjectListSearchLazyQuery();
  const { category, ...searchVariables } = filterSlice;

  useEffect(() => {
    search({
      variables: searchVariables,
    });
  }, [filterSlice]);

  const onMarkerClick = useMemo(
    () => (id: number) => {
      setItem(
        <Pressable key={id} onPress={() => router.push(`host/${id}`)} style={styles.itemCard}>
          <HostSearchCard
            chevron={true}
            project={data?.projectList?.data?.find(obj => obj?.id === id)}
          />
        </Pressable>
      );
    },
    []
  );

  const onMoveHandler = useMemo(
    () =>
      debounce(bounds => {
        const latHigh = bounds[0][0];
        const latLow = bounds[1][0];
        const lngHigh = bounds[0][1];
        const lngLow = bounds[1][1];

        const mapBounds = {
          latHigh,
          latLow,
          lngHigh,
          lngLow,
        };

        setBounds(mapBounds);

        setItem(null);
      }, 800),
    []
  );

  const memoLoading = useMemo(
    () => <ActivityIndicator size="large" color={theme.colors.primary} />,
    []
  );

  const memoBottomCenterContent = useMemo(
    () => (
      <View style={styles.bottomContainer}>
        {button}
        {selectedItem}
      </View>
    ),
    []
  );

  const memoMapMarkers = useMemo(
    () =>
      (!loading &&
        data && [
          ...data.projectList.data.map(project => ({
            id: project?.id,
            size: [60, 60],
            iconAnchor: [-26, 60],
            position: {
              lat: project?.accommodation?.lat || 33,
              lng: project?.accommodation?.lng || 33,
            },
            icon: window.location.origin + "/assets/assets/image/location-marker.png",
          })),
        ]) ||
      [],
    [filterSlice]
  );

  useEffect(() => {
    dispatch(
      setFilter({
        ...filterSlice.filter,
        destinationGeoLimit: bounds,
      })
    );
  }, [bounds]);

  return (
    <MemoizedMap
      style={styles.map}
      onMoveEnd={onMoveHandler}
      onMarkerClick={onMarkerClick}
      currentLocationVisible={true}
      centerContent={loading && memoLoading}
      bottomCenterContent={memoBottomCenterContent}
      mapMarkers={memoMapMarkers}
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
