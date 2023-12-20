import React from "react";
import { View } from "react-native";
import { Text } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { TourTransactionQueryType } from "@src/gql/generated";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { useFormatPrice } from "@src/hooks/localization";

const Invoice = ({ transactionDetail }: { transactionDetail: TourTransactionQueryType }) => {
  const { tr } = useTranslation();
  const { formatPrice } = useFormatPrice();
  const { localizeNumber } = useLocalizedNumberFormat();

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
        <Text caption>
          {localizeNumber(formatPrice(transactionDetail.tourPackage.price))}&nbsp;{tr("tooman")}
        </Text>
      </View>
      <View style={styles.priceContainer}>
        <View style={styles.rowTextContainer}>
          <Text caption>{localizeNumber(transactionDetail.tourPackage.price)} x </Text>
          <Text caption>
            {localizeNumber(`${transactionDetail.tourGuests.length} ${tr("person")}`)}
          </Text>
        </View>
        <Text caption>
          {localizeNumber(
            formatPrice(
              +transactionDetail.tourPackage.price * +transactionDetail.tourguestSet.length
            )
          )}
          &nbsp;{tr("tooman")}
        </Text>
      </View>
      <View style={styles.priceContainer}>
        <Text caption>{tr("total")}</Text>
        <Text caption>
          {localizeNumber(
            formatPrice(
              +transactionDetail.tourPackage.price * +transactionDetail.tourguestSet.length
            )
          )}
          &nbsp;{tr("tooman")}
        </Text>
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
  rowTextContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
});

export default Invoice;
