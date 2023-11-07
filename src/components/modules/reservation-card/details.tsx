import { router } from "expo-router";
import { Text } from "@rneui/themed";
import React, { useEffect } from "react";
import { useTheme } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { dateConverter } from "@src/helper/date";
import useTranslation from "@src/hooks/translation";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { setData } from "@src/slice/transaction-slice";
import { ProjectTransactionQueryType } from "@src/gql/generated";
import { View, Image, StyleSheet, Pressable } from "react-native";

type TransactionDetailPropsType = {
  transaction: ProjectTransactionQueryType;
};

const TransactionDetail = ({ transaction }: TransactionDetailPropsType) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { tr } = useTranslation();

  const handleNavigate = () => {
    router.push({
      pathname: "ProjectScreen",
      params: {
        id: transaction?.project.id,
        name: transaction?.project.name,
      },
    });
  };

  useEffect(() => {
    dispatch(setData({ id: transaction.id }));
  }, []);

  return (
    <Pressable style={styles.container} onPress={handleNavigate}>
      <Image
        style={styles.image}
        source={{
          uri: transaction?.project?.accommodation?.avatarS3[0].small || "",
        }}
        resizeMode="cover"
      />

      <View style={styles.infoContainer}>
        <Text subtitle1>{transaction?.project?.name}</Text>

        <View style={styles.content}>
          <View style={styles.infoRow}>
            <Entypo name="location-pin" color={theme.theme.colors.secondary} size={14} />
            <Text caption>{transaction?.project?.accommodation?.address}</Text>
          </View>

          <View style={styles.infoRow}>
            <AntDesign name="calendar" color={theme.theme.colors.secondary} size={14} />
            <Text caption>
              {dateConverter(transaction?.dateStart)} To {dateConverter(transaction?.dateEnd)}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <AntDesign name="user" color={theme.theme.colors.secondary} size={14} />
            <Text caption>
              {transaction?.guestSet?.length} {tr("Person")}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    width: 144,
    height: 88,
    borderRadius: 8,
  },
  infoContainer: {
    gap: 8,
  },
  content: {
    gap: 4,
  },
  infoRow: {
    gap: 8,
    color: "grey",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default TransactionDetail;
