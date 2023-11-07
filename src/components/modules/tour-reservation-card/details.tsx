import { router } from "expo-router";
import { Text } from "@rneui/themed";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setData } from "@src/slice/transaction-slice";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { AccommodationQueryType, TourTransactionQueryType } from "@src/gql/generated";

type TransactionDetailPropsType = {
  transaction: TourTransactionQueryType;
};

const TransactionDetail = ({ transaction }: TransactionDetailPropsType) => {
  const dispatch = useDispatch();

  const handleNavigate = () => {
    router.push({
      pathname: "ProjectScreen",
      params: {
        id: transaction?.id,
        name: transaction?.tourPackage.title,
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
          uri: transaction?.tourPackage.tour.avatarS3[0].small || "",
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
