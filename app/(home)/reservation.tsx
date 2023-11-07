import React from "react";
import { StyleSheet } from "react-native";
import { Tab, TabView, Text } from "@rneui/themed";
import HostReservation from "@organisms/host-reservation";
import TourReservation from "@organisms/tour-reservation";
import useTranslation from "@src/hooks/translation";
import Container from "@atoms/container";

const Page = () => {
  const [currentTab, setCurrentTab] = React.useState(0);
  const { tr } = useTranslation();

  return (
    <>
      <Tab value={currentTab} onChange={setCurrentTab} dense>
        <Tab.Item>{tr("tour transactions")}</Tab.Item>
        <Tab.Item>{tr("host transactions")}</Tab.Item>
      </Tab>

      <Container style={styles.container}>
        <Text heading2>{tr("my requests")}</Text>
        <Text caption type="grey2">
          {tr("manage your requests for hosting and trips")}
        </Text>
      </Container>

      <TabView value={currentTab} onChange={setCurrentTab} animationType="spring">
        <TabView.Item style={styles.tabContainer}>
          <Container>
            <TourReservation />
          </Container>
        </TabView.Item>
        <TabView.Item style={styles.tabContainer}>
          <Container>
            <HostReservation />
          </Container>
        </TabView.Item>
      </TabView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 24 },
  tabContainer: { width: "100%" },
});

export default Page;
