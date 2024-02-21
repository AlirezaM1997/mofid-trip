import Map from "@modules/map";
import { MapPropsType } from "@modules/map/index.web";
import TourSearchCard from "@modules/tour/card/search-card";
import { useTheme } from "@rneui/themed";
import { HEIGHT, WIDTH } from "@src/constants";
import {
  AccommodationQueryType,
  BBoxRangeType,
  TourListSearchQueryVariables,
  useTourListSearchLazyQuery,
} from "@src/gql/generated";
import { setFilter } from "@src/slice/filter-slice";
import { RootState } from "@src/store";
import { MapMarker } from "expo-leaflet";
import { router } from "expo-router";
import React, {
  ReactElement,
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const MemoizedMap = memo(Map);

const SearchTourMap = ({ button, ...props }: { button?: ReactNode; props?: MapPropsType }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [zoom, setZoom] = useState(9);
  const [bounds, setBounds] = useState<BBoxRangeType>();
  const [markers, setMarkers] = useState<MapMarker[]>();
  const [selectedItem, setItem] = useState<ReactElement | null>(null);

  const { filterSlice } = useSelector((state: RootState) => state);

  const [search, { data, loading }] = useTourListSearchLazyQuery();
  const { category, ...searchVariables } = filterSlice;

  useEffect(() => {
    search({
      variables: searchVariables as TourListSearchQueryVariables,
    });
  }, [filterSlice]);

  useEffect(() => {
    setZoom(10);
  }, []);

  const onMarkerClick = useMemo(
    () => (id: string) => {
      setItem(
        <Pressable key={id} onPress={() => router.push(`tour/${id}`)} style={styles.itemCard}>
          <TourSearchCard chevron={true} tour={data?.tourList?.data?.find(obj => obj?.id === id)} />
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
          data?.tourList?.data?.map(tour => ({
            id: tour?.id,
            size: [60, 60],
            iconAnchor: [-17, 30],
            position: {
              lat: (tour?.destination as AccommodationQueryType)?.lat || 33,
              lng: (tour?.destination as AccommodationQueryType)?.lng || 33,
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

export default SearchTourMap;
