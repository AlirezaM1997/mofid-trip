import React from "react";
import { View } from "react-native";
import { Text } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { useFormatPrice } from "@src/hooks/localization";
import { ProjectTransactionQueryType } from "@src/gql/generated";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { totalPrice } from "@src/helper/totalPrice";

const Invoice = ({ transactionDetail }: { transactionDetail: ProjectTransactionQueryType }) => {
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();
  const { formatPrice } = useFormatPrice();

  return (
    <View style={styles.container}>
      <Text body2>{tr("final invoice")}</Text>
      <Text caption type="grey2">
        {tr(
          "your final and recorded details for the initial host request. the price is calculated per person."
        )}
      </Text>

      <View style={styles.priceContainer}>
        <Text caption>{tr("base price")}</Text>
        <Text caption>{localizeNumber(formatPrice(+transactionDetail.project.price))}</Text>
      </View>
      <View style={styles.priceContainer}>
        <View style={styles.rowTextContainer}>
          <Text caption>{localizeNumber(transactionDetail.project.price)} x </Text>
          <Text caption>
            {localizeNumber(`${transactionDetail.guest.guestNumber} ${tr("person")}`)}
          </Text>
        </View>

        <Text caption>
          {localizeNumber(
            formatPrice(
              +totalPrice({
                price: +transactionDetail?.project?.price,
                capacity: +transactionDetail?.guest?.guestNumber,
                startDate: transactionDetail?.dateStart,
                endDate: transactionDetail?.dateEnd,
              }) as number
            ) as string
          )}
        </Text>
      </View>
      <View style={styles.priceContainer}>
        <Text caption>{tr("total")}</Text>
        <Text caption>
          {localizeNumber(
            formatPrice(
              +totalPrice({
                price: +transactionDetail.project.price,
                capacity: +transactionDetail.guest.guestNumber,
                startDate: transactionDetail.dateStart,
                endDate: transactionDetail.dateEnd,
              })
            )
          )}
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
