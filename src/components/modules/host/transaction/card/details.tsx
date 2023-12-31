import React from "react";
import { router } from "expo-router";
import { Text } from "@rneui/themed";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { AccommodationQueryType, ProjectTransactionQueryType } from "@src/gql/generated";

type TransactionDetailPropsType = {
  transaction: ProjectTransactionQueryType;
};

const TransactionDetail = ({ transaction }: TransactionDetailPropsType) => {
  const handleNavigate = () => {
    router.push({
      pathname: `/host/transaction/detail/${transaction.id}`,
      params: {
        name: transaction?.project.name,
      },
    });
  };

  return (
    <Pressable style={styles.container} onPress={handleNavigate}>
      <Image
        style={styles.image}
        source={
          transaction?.project?.accommodation?.avatarS3.length > 0
            ? {
                uri: transaction?.project?.accommodation?.avatarS3?.[0]?.small,
              }
            : require("@assets/image/defaultHost.png")
        }
        resizeMode="cover"
      />

      <View style={styles.infoContainer}>
        <Text>{transaction?.project.name}</Text>

        <Text caption type="grey2">
          {transaction?.project.accommodation?.address}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  image: {
    width: "100%",
    height: 170,
    borderRadius: 8,
  },
  infoContainer: {
    gap: 8,
  },
});

export default TransactionDetail;
