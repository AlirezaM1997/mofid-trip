import React from "react";
import { View } from "react-native";
import { Text } from "@rneui/themed";
import { StyleSheet } from "react-native";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { ProjectQueryType, ProjectTransactionQueryType } from "@src/gql/generated";

const Invoice = ({ transactionDetail }: { transactionDetail: ProjectTransactionQueryType }) => {
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();

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
        <Text caption>{localizeNumber(transactionDetail.project.price)}&nbsp;{tr("tooman")}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text caption>
          {transactionDetail.project.price} x {tr("person")}
        </Text>
        <Text caption>
          {localizeNumber(transactionDetail.project.price * transactionDetail.guestSet.length)}
          &nbsp;{tr("tooman")}
        </Text>
      </View>
      <View style={styles.priceContainer}>
        <Text caption>{tr("total")}</Text>
        <Text caption>
          {localizeNumber(transactionDetail.project.price * transactionDetail.guestSet.length)}
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
});

export default Invoice;
