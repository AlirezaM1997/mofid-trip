import React from "react";
import { Text } from "@rneui/themed";
import Container from "@atoms/container";
import { StyleSheet } from "react-native";
import useTranslation from "@src/hooks/translation";
import TourReservation from "@organisms/tour-reservation";
import Authentication from "@modules/authentication";
import { useSession } from "@src/context/auth";

const Page = () => {
  const { session } = useSession();
  const { tr } = useTranslation();

  if (!session) return <Authentication />;

  return (
    <>
      <Container style={styles.container}>
        <Text heading2>{tr("my requests")}</Text>
        <Text caption type="grey2">
          {tr("manage your requests for hosting and trips")}
        </Text>
      </Container>

      <TourReservation />
    </>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 24 },
  tabContainer: { width: "100%" },
});

export default Page;
