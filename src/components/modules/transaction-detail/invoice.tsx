import React from "react";
import { View } from "react-native";
import { Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { TourPackageType } from "@src/gql/generated";
import { StyleSheet } from "react-native";

const Invoice = ({ tourPackage }: { tourPackage: TourPackageType }) => {
  const { tr } = useTranslation();

  return (
    <View style={styles.container}>
      <Text body2>{tr("final invoice")}</Text>
      <Text caption type="grey2">
        {tr(
          "your final and recorded details for the initial tour request. the price is calculated per person."
        )}
      </Text>

      <View style={styles.priceContainer}>
        <Text caption>{tr("base price")}</Text>
        <Text caption>{tourPackage.price}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text caption>
          {tourPackage.price} x {tr("person")}
        </Text>
        <Text caption>{tourPackage.price}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text caption>{tr("total")}</Text>
        <Text caption>{tourPackage.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Invoice;
