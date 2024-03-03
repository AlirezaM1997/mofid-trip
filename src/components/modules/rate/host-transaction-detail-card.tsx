import React from "react";
import moment from "jalali-moment";
import { router } from "expo-router";
import { Image, Text } from "@rneui/themed";
import { Pressable, StyleSheet, View } from "react-native";
import { ProjectTransactionQueryType } from "@src/gql/generated";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

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

  const project = transactionDetail.project;

  const handlePress = () => {
    handleClose();
    router.push({
      pathname: `host/${project?.id}`,
      params: { projectId: project?.id, name: project?.name },
    });
  };

  return (
    <Pressable style={{ paddingVertical: 24, direction: "rtl" }} onPress={handlePress}>
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
            <Text caption>{localizeNumber(formattedDate(transactionDetail.dateStart))}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
});

export default HostTransactionDetailCard;
