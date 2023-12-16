import { Tab, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { RootState } from "@src/store";
import { useEffect, useRef } from "react";
import { StyleSheet, TextStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const HostTransactionTab = () => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const scrollRef = useRef(null);
  const x = useRef(0);

  const { activeStep } = useSelector((state: RootState) => state.hostTransactionSlice);

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
      style={{ overflow: "hidden" }}>
      <Tab
        value={activeStep}
        // onChange={handleChange}
        variant="default"
        indicatorStyle={styles.indicatorStyle}>
        <Tab.Item
          style={activeStep >= 1 ? styles.tabItem(theme) : styles.deactiveTabItem(theme)}
          title={tr("Capacity")}
        />
        <Tab.Item
          style={activeStep >= 2 ? styles.tabItem(theme) : styles.deactiveTabItem(theme)}
          title={tr("Date")}
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
  titleStyle: {
    textWrap: "nowrap",
  } as TextStyle,
  tabItem: theme => ({
    borderBottomWidth: 3,
    borderColor: theme.colors.primary,
  }),
  deactiveTabItem: theme => ({
    borderBottomWidth: 3,
    borderColor: theme.colors.grey2,
  }),
});

export default HostTransactionTab;
