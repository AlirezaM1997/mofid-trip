import React from "react";
import moment from "jalali-moment";
import { router } from "expo-router";
import { Image, Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { ProjectTransactionQueryType } from "@src/gql/generated";

const TransactionDetailCard = ({
  transactionDetail,
}: {
  transactionDetail: ProjectTransactionQueryType;
}) => {
  const { tr } = useTranslation();
  const formattedDate = (date: Date) => moment(date, "YYYY/MM/DD").locale("fa").format("D MMMM");

  return (
    <Pressable
      style={styles.routeToHostPageContainer}
      onPress={() =>
        router.push({
          pathname: `host/${transactionDetail.project.id}`,
          params: { projectId: transactionDetail.project.id, name: transactionDetail.project.name },
        })
      }>
      <View style={styles.hostDetailContainer}>
        <Image
          style={styles.hostAvatar}
          source={{
            uri: transactionDetail.project.accommodation.avatarS3[0].small,
          }}
        />

        <View style={styles.hostDetail}>
          <Text subtitle1>{transactionDetail.project.name}</Text>

          <Text numberOfLines={1} caption type="grey2">
            {transactionDetail.project.accommodation.address}
          </Text>

          <View style={styles.date}>
            <Text caption type="grey2">
              {tr("hosting type")} .
            </Text>
            <Text caption>{transactionDetail.project.categories[0].name}</Text>
          </View>

          <View style={styles.date}>
            <Text caption type="grey2">
              {tr("date")} .
            </Text>
            <Text caption>{formattedDate(transactionDetail.dateStart)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.showHostPageContainer}>
        <View style={styles.showHostPage}>
          <Feather name="circle" size={13} color="black" />
          <Text>{tr("view host details")}</Text>
        </View>

        <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  routeToHostPageContainer: { gap: 24 },
  hostDetailContainer: {
    gap: 12,
    flexDirection: "row",
  },
  hostDetail: { width: 164, gap: 8, justifyContent: "center" },
  hostAvatar: {
    width: 154,
    height: 104,
    borderRadius: 12,
  },
  date: {
    flexDirection: "row",
    alignItems: "center",
  },
  showHostPage: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  showHostPageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default TransactionDetailCard;
