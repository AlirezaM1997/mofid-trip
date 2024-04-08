import React, { useState } from "react";
import Container from "@atoms/container";
import useTranslation from "@src/hooks/translation";
import { StyleSheet, ViewStyle } from "react-native";
import HostTransaction from "@modules/host/transaction";
import TourReservation from "@organisms/tour-reservation";
import { Colors, Tab, Text, useTheme } from "@rneui/themed";

const HostTransactionScreen = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const [index, setIndex] = useState(0);

  return (
    <>
      <Container style={styles.container}>
        <Text heading2>{tr("my requests")}</Text>
        <Text caption type="grey2">
          {tr("manage your requests for hosting and trips")}
        </Text>
      </Container>
      <Tab value={index} onChange={setIndex} dense indicatorStyle={{ display: "none" }}>
        <Tab.Item
          style={index === 0 ? styles.tabItem(theme) : styles.deactiveTabItem(theme)}
          title={tr("host")}
        />
        <Tab.Item
          style={index === 1 ? styles.tabItem(theme) : styles.deactiveTabItem(theme)}
          title={tr("tour")}
        />
      </Tab>

      {index === 0 && <HostTransaction />}
      {index === 1 && <TourReservation />}
    </>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 16, gap: 4 },
  tabItem: ((theme: { colors: { primary: keyof Colors } }) => ({
    borderBottomWidth: 3,
    borderColor: theme.colors.primary,
  })) as ViewStyle,
  deactiveTabItem: ((theme: { colors: { grey2: keyof Colors } }) => ({
    borderBottomWidth: 3,
    borderColor: theme.colors.grey2,
  })) as ViewStyle,
});

export default HostTransactionScreen;
