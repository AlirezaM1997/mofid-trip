import React from "react";
import { router } from "expo-router";
import { Text } from "@rneui/themed";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { AccommodationQueryType, TourTransactionQueryType } from "@src/gql/generated";

type TransactionDetailPropsType = {
  transaction: TourTransactionQueryType;
};

const TransactionDetail = ({ transaction }: TransactionDetailPropsType) => {
  const handleNavigate = () => {
    router.push({
      pathname: `/tour/${transaction.tourPackage.tour.id}`,
      params: {
        name: transaction?.tourPackage?.tour?.title,
      },
    });
  };

  console.log("0s0", transaction?.tourPackage.tour);

  return (
    <Pressable style={styles.container} onPress={handleNavigate}>
      <Image
        style={styles.image}
        source={{
          uri: transaction?.tourPackage.tour?.avatarS3?.[0]?.small || "",
        }}
        resizeMode="cover"
      />

      <View style={styles.infoContainer}>
        <Text>{transaction?.tourPackage?.tour.title}</Text>

        <Text caption type="grey2">
          {(transaction?.tourPackage.tour?.destination as AccommodationQueryType)?.address}
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
