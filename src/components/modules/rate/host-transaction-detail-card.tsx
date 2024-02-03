import React from "react";
import moment from "jalali-moment";
import { router } from "expo-router";
import { Image, Text } from "@rneui/themed";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { Pressable, StyleSheet, View } from "react-native";
import { ProjectTransactionQueryType } from "@src/gql/generated";

const HostTransactionDetailCard = ({
  transactionDetail,
  handleClose,
}: {
  transactionDetail: ProjectTransactionQueryType;
  handleClose: () => void;
}) => {
  const { tr } = useTranslation();
  const formattedDate = (date: Date) => moment(date, "YYYY/MM/DD").locale("fa").format("D MMMM");
  const { localizeNumber } = useLocalizedNumberFormat();

  const handlePress = () => {
    handleClose();
    router.push({
      pathname: `host/${transactionDetail.project.id}`,
      params: { projectId: transactionDetail.project.id, name: transactionDetail.project.name },
    });
  };

  return (
    <Pressable style={{ paddingVertical: 24, direction: "rtl" }} onPress={handlePress}>
      <View style={styles.hostDetailContainer}>
        <Image
          style={styles.hostAvatar}
          source={
            transactionDetail?.project?.accommodation?.avatarS3.length > 0
              ? {
                  uri: transactionDetail?.project?.accommodation?.avatarS3?.[0]?.small,
                }
              : require("@assets/image/defaultHost.svg")
          }
          resizeMode="cover"
        />

        <View style={styles.hostDetail}>
          <Text numberOfLines={1} subtitle1>
            {transactionDetail.project.name}
          </Text>

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
            <Text caption>{localizeNumber(formattedDate(transactionDetail.dateStart))}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  routeToHostPageContainer: { paddingVertical: 24, direction: "rtl" },
  hostDetailContainer: {
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
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

export default HostTransactionDetailCard;
