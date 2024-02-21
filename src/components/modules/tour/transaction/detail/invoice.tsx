import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Divider, Text } from "@rneui/themed";
import { useFormatPrice } from "@src/hooks/localization";
import { TourTransactionQueryType } from "@src/gql/generated";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

const Invoice = ({ transactionDetail }: { transactionDetail: TourTransactionQueryType }) => {
  const { tr } = useTranslation();
  const { formatPrice } = useFormatPrice();
  const { localizeNumber } = useLocalizedNumberFormat();

  const tourPackage = transactionDetail?.tourPackage;

  return (
    <View style={styles.container}>
      <Text bold body2>{tr("final invoice")}</Text>
      <Text caption type="grey2">
        {tr(
          "your final and recorded details for the initial tour request. the price is calculated per person."
        )}
      </Text>

      <View style={styles.priceContainer}>
        <Text type="grey2" caption>
          {tr("original price")}
        </Text>
        <Text caption>{localizeNumber(formatPrice(tourPackage?.price as number) as string)}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text type="grey2" caption>{`${tr("discount")} (${localizeNumber(
          tourPackage?.discount as number
        )} ${tr("percent")})`}</Text>
        <Text caption>
          {localizeNumber(
            formatPrice(
              (tourPackage?.price as number) * (1 - (tourPackage?.discount as number) / 100)
            ) as string
          )}
        </Text>
      </View>
      <View style={styles.priceContainer}>
        <View style={styles.rowTextContainer}>
          <Text type="grey2" caption>
            {localizeNumber(
              (tourPackage?.price as number) * (1 - (tourPackage?.discount as number) / 100)
            )}{" "}
            x{" "}
          </Text>
          <Text type="grey2" caption>
            {localizeNumber(`${transactionDetail?.tourGuests?.length} ${tr("person")}`)}
          </Text>
        </View>
        <Text caption>
          {localizeNumber(
            formatPrice(
              (transactionDetail?.tourGuests?.length as number) *
                (tourPackage?.price as number) *
                (1 - (tourPackage?.discount as number) / 100)
            ) as string
          )}
        </Text>
      </View>
      <Divider />
      <View style={styles.priceContainer}>
        <Text bold caption>
          {tr("total")}
        </Text>
        <Text bold caption>
          {localizeNumber(
            formatPrice(
              (transactionDetail?.tourGuests?.length as number) *
                (tourPackage?.price as number) *
                (1 - (tourPackage?.discount as number) / 100)
            ) as string
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
