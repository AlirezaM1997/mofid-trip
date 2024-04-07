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
    router.push(`/tour/transaction/detail/${transaction.id}`);
  };
  const tour = transaction.tourPackage?.tour;

  return (
    <Pressable style={styles.container} onPress={handleNavigate}>
      <Image
        style={styles.image}
        source={{
          uri: tour?.avatarS3?.[0]?.large || "",
        }}
        resizeMode="cover"
      />

      <View style={styles.infoContainer}>
        <Text>{tour?.title}</Text>

        <Text caption type="grey2">
          {(tour?.destination as AccommodationQueryType)?.address}
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
