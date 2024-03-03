import React, {
  memo,
  useMemo,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  ReactElement,
} from "react";
import {
  BBoxRangeType,
  useProjectListSearchLazyQuery,
  ProjectListSearchQueryVariables,
} from "@src/gql/generated";
import Map from "@modules/map";
import { RootState } from "@src/store";
import { useTheme } from "@rneui/themed";
import { MapMarker } from "expo-leaflet";
import { HEIGHT, WIDTH } from "@src/constants";
import { router, useNavigation } from "expo-router";
import { setFilter } from "@src/slice/filter-slice";
import { useIsFocused } from "@react-navigation/core";
import { MapPropsType } from "@modules/map/index.web";
import { useDispatch, useSelector } from "react-redux";
import HostSearchCard from "@modules/host/card/search-card";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";

const MemoizedMap = memo(Map);

const SearchHostMap = ({ button, ...props }: { button?: ReactNode; props?: MapPropsType }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [zoom, setZoom] = useState(9);
  const [bounds, setBounds] = useState<BBoxRangeType>();
  const [markers, setMarkers] = useState<MapMarker[]>();
  const [selectedItem, setItem] = useState<ReactElement | null>(null);

  const { filterSlice } = useSelector((state: RootState) => state);

  const [search, { data, loading }] = useProjectListSearchLazyQuery();
  const { category, ...searchVariables } = filterSlice;

  useEffect(() => {
    search({
      variables: searchVariables as ProjectListSearchQueryVariables,
    });
  }, [filterSlice]);

  useEffect(() => {
    setZoom(10);
  }, []);

  const onMarkerClick = useMemo(
    () => (id: string) => {
      data?.projectList?.data &&
        setItem(
          <Pressable key={id} onPress={() => router.push(`host/${id}/`)} style={styles.itemCard}>
            <HostSearchCard
              chevron={true}
              project={data?.projectList?.data?.find(obj => obj?.id === id)}
            />
          </Pressable>
        );
    },
    [data]
  );

  const onMoveHandler = useCallback(
    (bounds: string[]) => {
      const latHigh = bounds[0][0];
      const latLow = bounds[1][0];
      const lngHigh = bounds[0][1];
      const lngLow = bounds[1][1];

      const mapBounds: BBoxRangeType = {
        latHigh: +latHigh,
        latLow: +latLow,
        lngHigh: +lngHigh,
        lngLow: +lngLow,
      };

      setBounds(mapBounds);

      setItem(null);
    },
    [bounds]
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
    [selectedItem]
  );

  useEffect(() => {
    !loading &&
      data && [
        setMarkers(
          data?.projectList?.data?.map(project => ({
            id: project?.id,
            size: [60, 60],
            iconAnchor: [-17, 30],
            position: {
              lat: project?.accommodation?.lat || 33,
              lng: project?.accommodation?.lng || 33,
            },
            icon: window.location.origin + "/assets/assets/image/location-marker.png",
          })) as MapMarker[]
        ),
      ];
  }, [data]);

  useEffect(() => {
    bounds &&
      dispatch(
        setFilter({
          ...filterSlice.filter,
          destinationGeoLimit: bounds,
        })
      );
  }, [bounds]);

  return (
    <MemoizedMap
      zoom={zoom}
      style={styles.map}
      mapMarkers={markers}
      onMoveEnd={onMoveHandler}
      onMarkerClick={onMarkerClick}
      currentLocationVisible={true}
      centerContent={loading && memoLoading}
      bottomCenterContent={memoBottomCenterContent}
      bottomLeftContentStyle={{ zIndex: selectedItem ? 0 : 2 }}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  map: { height: HEIGHT - 200, borderRadius: 0 },
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
