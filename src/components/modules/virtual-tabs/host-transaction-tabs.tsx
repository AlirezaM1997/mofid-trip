import { RootState } from "@src/store";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Tab, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const HostTransactionTab = ({ activeStep }) => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const scrollRef = useRef(null);
  const x = useRef(0);

  useEffect(() => {
    if (activeStep) {
      scrollRef.current.scrollTo({ x: -(activeStep - 1) * 95, animated: true });
    }
  }, [activeStep]);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      onScroll={event => {
        const { contentOffset } = event.nativeEvent;
        x.current = contentOffset.x;
      }}
      style={styles.scrollViewStyle}
      contentContainerStyle={styles.container}>
      <Tab
        value={activeStep}
        // onChange={handleChange}
        variant="default"
        style={styles.container}
        indicatorStyle={styles.indicatorStyle}>
        <Tab.Item
          style={activeStep >= 1 ? styles.tabItem(theme) : styles.deactiveTabItem(theme)}
          title={tr("Date")}
          />
        <Tab.Item
          style={activeStep >= 2 ? styles.tabItem(theme) : styles.deactiveTabItem(theme)}
          title={tr("Capacity")}
        />
        <Tab.Item
          titleStyle={styles.titleStyle}
          style={activeStep >= 3 ? styles.tabItem(theme) : styles.deactiveTabItem(theme)}
          title={tr("final details")}
        />
      </Tab>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  indicatorStyle: {
    display: "none",
  },
  scrollViewStyle: {
    overflow: "hidden",
  },
  container: {
    width: "100%",
  },
  titleStyle: {
    textWrap: "nowrap",
  } as TextStyle,
  tabItem: (theme => ({
    borderBottomWidth: 3,
    borderColor: theme.colors.primary,
  })) as ViewStyle,
  deactiveTabItem: (theme => ({
    borderBottomWidth: 3,
    borderColor: theme.colors.grey2,
  })) as ViewStyle,
});

export default HostTransactionTab;
