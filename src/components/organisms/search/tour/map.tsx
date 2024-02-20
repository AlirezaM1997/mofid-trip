import Map from "@modules/map";
import { router } from "expo-router";
import { RootState } from "@src/store";
import debounce from "lodash/debounce";
import { useTheme } from "@rneui/themed";
import { HEIGHT, WIDTH } from "@src/constants";
import { setFilter } from "@src/slice/filter-slice";
import { MapPropsType } from "@modules/map/index.web";
import { useDispatch, useSelector } from "react-redux";
import TourSearchCard from "@modules/tour/card/search-card";
import { useTourListSearchLazyQuery } from "@src/gql/generated";
import React, { ReactElement, ReactNode, memo, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";

const MemoizedMap = memo(Map);

const SearchTourMap = ({ button, ...props }: { button?: ReactNode; props?: MapPropsType }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [bounds, setBounds] = useState();
  const [selectedItem, setItem] = useState<ReactElement | null>(null);

  const { filterSlice } = useSelector((state: RootState) => state);

  const [search, { data, loading }] = useTourListSearchLazyQuery();
  const { category, ...searchVariables } = filterSlice;

  useEffect(() => {
    search({
      variables: filterSlice,
    });
  }, [filterSlice]);

  const onMarkerClick = useMemo(
    () => id => {
      setItem(
        <Pressable key={id} onPress={() => router.push(`tour/${id}`)} style={styles.itemCard}>
          <TourSearchCard chevron={true} tour={data.tourList.data.find(obj => obj.id === id)} />
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

  useEffect(() => {
    dispatch(
      setFilter({
        ...filterSlice.filter,
        destinationGeoLimit: bounds,
      })
    );
  }, [bounds]);

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

  const memoMapMarkers = useMemo(() => {
    return !loading && data
      ? data.tourList.data.map(tour => ({
          id: tour.id,
          size: [60, 60],
          iconAnchor: [-17, 30],
          position: {
            lat: tour?.destination?.lat || 33,
            lng: tour?.destination?.lng || 33,
          },
          icon: window.location.origin + "/assets/assets/image/location-marker.png",
        }))
      : [];
  }, [filterSlice]);

  return (
    <MemoizedMap
      style={styles.map}
      onMoveEnd={onMoveHandler}
      mapMarkers={memoMapMarkers}
      onMarkerClick={onMarkerClick}
      currentLocationVisible={true}
      centerContent={loading && memoLoading}
      bottomCenterContent={memoBottomCenterContent}
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
