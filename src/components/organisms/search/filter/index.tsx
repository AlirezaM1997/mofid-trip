import FilterList from "./list";
import FilterPrice from "./price";
import FilterHeader from "./header";
import FilterCategory from "./category";
import React, { useState } from "react";
import { HEIGHT } from "@src/constants";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import { Feather } from "@expo/vector-icons";
import useIsRtl from "@src/hooks/localization";
import useTranslation from "@src/hooks/translation";
import { Pressable, StyleSheet } from "react-native";
import { BottomSheet, Button, Divider, Text } from "@rneui/themed";
import BottomButtonLayout from "@components/layout/bottom-button";

const Filter = () => {
  const isRtl = useIsRtl();
  const { tr } = useTranslation();
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const showComponent = () => {
    const obj = {
      0: <FilterList setIndex={setIndex} />,
      1: <FilterCategory />,
      2: <FilterPrice />,
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
        <Text caption>{tr("filter")}</Text>
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
