import React, { useState } from "react";
import Container from "@atoms/container";
import { Feather } from "@expo/vector-icons";
import useIsRtl from "@src/hooks/localization";
import useTranslation from "@src/hooks/translation";
import { Pressable, StyleSheet, View } from "react-native";
import { BottomSheet, Text, useTheme } from "@rneui/themed";

const Header = () => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  return (
    <View style={styles.filterHeader}>
      <View style={styles.filterHeaderTitle}>
        <Feather name="arrow-right" size={22} />
        <Text>{tr("filters")}</Text>
      </View>

      <Text caption type="error">
        {tr("clear filters")}
      </Text>
    </View>
  );
};

const Filter = () => {
  const rtl = useIsRtl();
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Container style={styles.container}>
      <Pressable style={styles.openFilterButton} onPress={() => setIsVisible(true)}>
        <Feather name="sliders" size={16} style={styles.filterIcon} />
        <Text caption>{tr("filter")}</Text>
      </Pressable>

      <BottomSheet isVisible={isVisible} containerStyle={styles.bottomSheet}>
        <Container style={styles.bottomSheetContainer(rtl)}>
          <Header />
        </Container>
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
  bottomSheet: {
    height: "100%",
    borderRadius: 0,
    overflow: "hidden",
    flexDirection: "column",
    direction: "rtl",
  },
  filterIcon: { transform: "rotate(90deg)" },
  bottomSheetContainer: rtl => ({
    direction: rtl ? "rtl" : "ltr",
  }),
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterHeaderTitle: {
    gap: 16,
    flexDirection: "row",
  },
});

export default Filter;
