import FilterList from "./list";
import FilterDate from "./date";
import FilterPrice from "./price";
import FilterHeader from "./header";
import FilterCategory from "./category";
import React, { useState } from "react";
import { HEIGHT } from "@src/constants";
import FilterCapacity from "./capacity";
import { RootState } from "@src/store";
import Container from "@atoms/container";
import { useSelector } from "react-redux";
import WhiteSpace from "@atoms/white-space";
import FilterOriginCity from "./originCity";
import FilterDestination from "./destination";
import useIsRtl from "@src/hooks/localization";
import useTranslation from "@src/hooks/translation";
import { Pressable, StyleSheet } from "react-native";
import { Feather, Octicons } from "@expo/vector-icons";
import { BottomSheet, Button, Divider, Text, useTheme } from "@rneui/themed";
import BottomButtonLayout from "@components/layout/bottom-button";

const Filter = () => {
  const isRtl = useIsRtl();
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { filter } = useSelector((state: RootState) => state.filterSlice);

  const showComponent = () => {
    const obj = {
      0: <FilterList setIndex={setIndex} />,
      1: <FilterCategory />,
      2: <FilterPrice />,
      3: <FilterOriginCity />,
      4: <FilterDestination />,
      5: <FilterCapacity />,
      6: <FilterDate />,
    };

    if (index in obj) return obj[index];
    return obj[0];
  };

  const bottomLayoutButton = [
    index === 0 ? (
      <Button onPress={() => setIsVisible(false)}>{tr("filter")}</Button>
    ) : (
      <Button onPress={() => setIndex(0)}>{tr("confirmation")}</Button>
    ),
  ];

  return (
    <Container style={styles.container}>
      <Pressable style={styles.openFilterButton} onPress={() => setIsVisible(true)}>
        <Feather name="sliders" size={16} style={styles.filterIcon} />
        <Text caption>
          {tr("filter")}&nbsp;
          {Object.keys(filter).length ? (
            <Octicons name="dot-fill" size={14} color={theme.colors.primary} />
          ) : (
            ""
          )}
        </Text>
      </Pressable>

      <BottomSheet isVisible={isVisible} containerStyle={styles.bottomSheet(isRtl)}>
        <BottomButtonLayout
          buttons={bottomLayoutButton}
          contentContainerStyle={styles.bottomLayoutContainer}>
          <FilterHeader index={index} setIndex={setIndex} setIsVisible={setIsVisible} />

          <Divider />
          <WhiteSpace size={24} />

          {showComponent()}
        </BottomButtonLayout>
      </BottomSheet>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  openFilterButton: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  bottomSheet: isRtl => ({
    height: HEIGHT,
    direction: "rtl",
    overflow: "hidden",
    flexDirection: "column",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    direction: isRtl ? "rtl" : "ltr",
  }),
  filterIcon: { transform: "rotate(90deg)" },
  bottomLayoutContainer: { height: HEIGHT - 85 },
});

export default Filter;
