import React from "react";
import Stepper from "@modules/stepper";
import Container from "@atoms/container";
import { Image, Text } from "@rneui/themed";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import useTranslation from "@src/hooks/translation";
import { useLocalSearchParams } from "expo-router";
import LoadingIndicator from "@modules/Loading-indicator";
import { ScrollView } from "react-native-gesture-handler";
import { Pressable, StyleSheet, View } from "react-native";
import { AccommodationQueryType, useTourTransactionDetailQuery } from "@src/gql/generated";
import moment from "jalali-moment";

const TourTransactionDetail = () => {
  const { tr } = useTranslation();
  const steps = [tr("pending"), tr("accepting"), tr("payment"), tr("finish the trip")];
  const { transactionId } = useLocalSearchParams();

  const { data, loading } = useTourTransactionDetailQuery({
    variables: { pk: transactionId as string },
  });

  if (!data || loading) {
    return <LoadingIndicator />;
  }

  const { status, tourPackage } = data.tourTransactionDetail;

  const activeStep = () => {
    const lookup: Record<string, number> = {
      REQUEST: 1,
      ACCEPT: 2,
      PAYMENT: 3,
      SUCCESSFUL: 4,
    };
    return lookup[status.step || 0];
  };

  const formattedDate = (date: Date) => moment(date, "YYYY/MM/DD").locale("fa").format("D MMMM");

  return (
    <ScrollView>
      <Container style={styles.container}>
        <View style={styles.header}>
          <Text subtitle2>{tr("at what stage is your application?")}</Text>
          <Pressable>
            <Text subtitle2 type="error" style={styles.headerButton}>
              {tr("cancel request")}
            </Text>
          </Pressable>
        </View>

        <Stepper activeStep={activeStep()} isActive={status.isActive as boolean} steps={steps} />

        <View style={styles.tourDetailContainer}>
          <Image
            style={styles.tourAvatar}
            source={{
              uri: (tourPackage.tour.destination as AccommodationQueryType)?.avatarS3[0].small,
            }}
          />

          <View style={styles.tourDetail}>
            <Text subtitle1>{tourPackage.title}</Text>

            <Text numberOfLines={1} caption type="grey2">
              {(tourPackage.tour.destination as AccommodationQueryType)?.address}
            </Text>

            <View style={styles.date}>
              <Text caption type="grey2">
                {tr("beginning")} .
              </Text>
              <Text caption>{formattedDate(tourPackage.tour.startTime)}</Text>
            </View>

            <View style={styles.date}>
              <Text caption type="grey2">
                {tr("end")} .
              </Text>
              <Text caption>{formattedDate(tourPackage.tour.endTime)}</Text>
            </View>
          </View>
        </View>

        <Pressable style={styles.showTourPageContainer}>
          <View style={styles.showTourPage}>
            <Feather name="circle" size={13} color="black" />
            <Text>{tr("view tour details")}</Text>
          </View>

          <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
        </Pressable>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 24,
    marginTop: 24,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerButton: {
    textDecorationLine: "underline",
  },
  tourDetailContainer: {
    gap: 12,
    flexDirection: "row",
  },
  tourDetail: { width: 164, gap: 8, justifyContent: "center" },
  tourAvatar: {
    width: 154,
    height: 104,
    borderRadius: 12,
  },
  date: {
    flexDirection: "row",
    alignItems: "center",
  },
  showTourPage: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  showTourPageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default TourTransactionDetail;
