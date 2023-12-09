import { Tab, Text, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { RootState } from "@src/store";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

type TourCreateTabsProps = {
  index: number;
};

const TourCreateTabs = ({ index }: TourCreateTabsProps) => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const scrollRef = useRef(null);
  const { x: initialX } = useLocalSearchParams();
  const x = useRef(0);

  const data = useSelector((state: RootState) => state.tourCreateSlice.data);

  useEffect(() => {
    if (scrollRef.current && initialX) {
      scrollRef.current.scrollTo({ x: parseInt(initialX as string), animated: false });
    }
  }, []);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      onScroll={event => {
        const { contentOffset } = event.nativeEvent;
        x.current = contentOffset.x;
      }}
      style={{ overflow: "hidden" }}>
      <Tab
        value={index}
        // onChange={handleChange}
        variant="default"
        indicatorStyle={styles.indicatorStyle}>
        <Tab.Item
          style={index >= 1 ? styles.tabItem(theme) : styles.deactiveTabItem(theme)}
          title={tr("Details")}
        />
        <Tab.Item
          style={index >= 2 ? styles.tabItem(theme) : styles.deactiveTabItem(theme)}
          title={tr("Capacity")}
        />
        <Tab.Item
          style={index >= 3 ? styles.tabItem(theme) : styles.deactiveTabItem(theme)}
          title={tr("Origin")}
        />
        <Tab.Item
          style={index >= 4 ? styles.tabItem(theme) : styles.deactiveTabItem(theme)}
          title={tr("Destination")}
        />
        <Tab.Item
          style={index >= 5 ? styles.tabItem(theme) : styles.deactiveTabItem(theme)}
          title={tr("Date")}
        />
        <Tab.Item
          style={index >= 6 ? styles.tabItem(theme) : styles.deactiveTabItem(theme)}
          title={tr("Price")}
        />
        <Tab.Item
          style={index >= 7 ? styles.tabItem(theme) : styles.deactiveTabItem(theme)}
          title={tr("Images")}
        />
        <Tab.Item
          style={index >= 8 ? styles.tabItem(theme) : styles.deactiveTabItem(theme)}
          title={tr("Facilities")}
        />
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
  deactiveTabItem: theme => ({
    borderBottomWidth: 3,
    borderColor: theme.colors.grey2,
  }),
});

export default TourCreateTabs;
