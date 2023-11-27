import { Tab, Text, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { RootState } from "@src/store";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

type TourCreateTabProps = {
  index: number;
};

const TourCreateTab = ({ index }: TourCreateTabProps) => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const scrollRef = useRef(null);
  const { x: initialX } = useLocalSearchParams();
  const x = useRef(0);

  const data = useSelector((state: RootState) => state.tourCreateSlice.data)
  console.log('dd', data)

  useEffect(() => {
    if (scrollRef.current && initialX) {
      scrollRef.current.scrollTo({ x: parseInt(initialX as string), animated: false });
    }
  }, []);

  const handleChange = newIndex => {
    switch (newIndex) {
      case 0:
        router.push({
          pathname: "/tour/create/details",
          params: {
            x: x.current,
          },
        });
        break;
      case 1:
        router.push({
          pathname: "/tour/create/capacity",
          params: {
            x: x.current,
          },
        });
        break;
      case 2:
        router.push({
          pathname: "/tour/create/origin",
          params: {
            x: x.current,
          },
        });
        break;
      case 3:
        router.push({
          pathname: "/tour/create/destination",
          params: {
            x: x.current,
          },
        });
        break;
      case 4:
        router.push({
          pathname: "/tour/create/date",
          params: {
            x: x.current,
          },
        });
        break;
      case 5:
        router.push({
          pathname: "/tour/create/price",
          params: {
            x: x.current,
          },
        });
        break;
      case 6:
        router.push({
          pathname: "/tour/create/images",
          params: {
            x: x.current,
          },
        });
        break;
      case 7:
        router.push({
          pathname: "/tour/create/facilities",
          params: {
            x: x.current,
          },
        });
        break;
    }
  };

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      onScroll={event => {
        const { contentOffset } = event.nativeEvent;
        x.current = contentOffset.x;
      }}>
      <Tab
        value={index}
        onChange={handleChange}
        variant="default"
        indicatorStyle={styles.indicatorStyle}>
        <Tab.Item style={index === 0 ? styles.tabItem(theme) : {}} title={tr("Details")} />
        <Tab.Item style={index === 1 ? styles.tabItem(theme) : {}} title={tr("Capacity")} />
        <Tab.Item style={index === 2 ? styles.tabItem(theme) : {}} title={tr("Origin")} />
        <Tab.Item style={index === 3 ? styles.tabItem(theme) : {}} title={tr("Destination")} />
        <Tab.Item style={index === 4 ? styles.tabItem(theme) : {}} title={tr("Date")} />
        <Tab.Item style={index === 5 ? styles.tabItem(theme) : {}} title={tr("Price")} />
        <Tab.Item style={index === 6 ? styles.tabItem(theme) : {}} title={tr("Images")} />
        <Tab.Item style={index === 7 ? styles.tabItem(theme) : {}} title={tr("Facilities")} />
      </Tab>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  indicatorStyle: {
    display: "none",
  },
  tabItem: theme => ({
    borderBottomWidth: 3,
    borderColor: theme.colors.primary,
  }),
});

export default TourCreateTab;
