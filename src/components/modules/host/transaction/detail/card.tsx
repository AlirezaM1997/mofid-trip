import React from "react";
import moment from "jalali-moment";
import { router } from "expo-router";
import { Image, Text } from "@rneui/themed";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { ProjectTransactionQueryType } from "@src/gql/generated";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

const TransactionDetailCard = ({
  transactionDetail,
}: {
  transactionDetail: ProjectTransactionQueryType;
}) => {
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();
  const formattedDate = (date: Date) => moment(date).locale("fa").format("D MMMM");

  const project = transactionDetail.project;

  return (
    <Pressable
      style={styles.routeToHostPageContainer}
      onPress={() =>
        router.push({
          pathname: `host/${project?.id}`,
          params: {
            projectId: project?.id,
            name: project?.name,
          },
        })
      }>
      <View style={styles.hostDetailContainer}>
        <Image
          style={styles.hostAvatar}
          source={
            (project?.accommodation?.avatarS3?.length as number) > 0
              ? {
                  uri: project?.accommodation?.avatarS3?.[0]?.small,
                }
              : require("@assets/image/defaultHost.svg")
          }
          resizeMode="cover"
        />

        <View style={styles.hostDetail}>
          <Text numberOfLines={1} subtitle1>
            {localizeNumber(project?.name as string)}
          </Text>

          <Text numberOfLines={1} caption type="grey2">
            {localizeNumber(project?.accommodation?.address as string)}
          </Text>

          <View style={styles.date}>
            <Text caption type="grey2">
              {tr("hosting type")} .
            </Text>
            <Text caption>{project?.categories?.[0]?.displayName}</Text>
          </View>

          <View style={styles.date}>
            <Text caption type="grey2">
              {tr("date")} .
            </Text>
            <Text caption>
              {localizeNumber(formattedDate(transactionDetail?.dateStart))} -{" "}
              {localizeNumber(formattedDate(transactionDetail?.dateEnd))}
            </Text>
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
    alignItems: "center",
  },
  hostDetail: {
    width: 164,
    gap: 8,
    justifyContent: "center",
  },
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
