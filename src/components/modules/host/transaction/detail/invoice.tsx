import React from "react";
import { View } from "react-native";
import { Divider, Text } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { totalPrice } from "@src/helper/totalPrice";
import { useFormatPrice } from "@src/hooks/localization";
import { ProjectTransactionQueryType } from "@src/gql/generated";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

const Invoice = ({ transactionDetail }: { transactionDetail: ProjectTransactionQueryType }) => {
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();
  const { formatPrice } = useFormatPrice();

  const project = transactionDetail?.project;

  return (
    <View style={styles.container}>
      <Text body2 bold>
        {tr("final invoice")}
      </Text>
      <Text caption type="grey2">
        {tr(
          "your final and recorded details for the initial host request. the price is calculated per person."
        )}
      </Text>

      <View style={styles.priceContainer}>
        <Text type="grey2" caption>
          {tr("original price")}
        </Text>
        <Text caption>{localizeNumber(formatPrice(project?.price as number) as string)}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text type="grey2" caption>{`${tr("discount")} (${localizeNumber(
          project?.discount as number
        )} ${tr("percent")})`}</Text>
        <Text caption>
          {localizeNumber(
            formatPrice(
              (project?.price as number) * (1 - (project?.discount as number) / 100)
            ) as string
          )}
        </Text>
      </View>
      <View style={styles.priceContainer}>
        <View style={styles.rowTextContainer}>
          <Text type="grey2" caption>
            {localizeNumber(project?.price as number)} x{" "}
          </Text>
          <Text type="grey2" caption>
            {localizeNumber(`${transactionDetail?.guest?.guestNumber} ${tr("person")}`)}
          </Text>
        </View>

        <Text caption>
          {localizeNumber(
            formatPrice(
              (transactionDetail?.guest?.guestNumber as number) *
                (project?.price as number) *
                (1 - (project?.discount as number) / 100)
            ) as string
          )}
        </Text>
      </View>
      <View style={styles.priceContainer}>
        <View style={styles.rowTextContainer}>
          <Text type="grey2" caption>
            {localizeNumber(
              (transactionDetail?.guest?.guestNumber as number) *
                (project?.price as number) *
                (1 - (project?.discount as number) / 100)
            )}{" "}
            x{" "}
          </Text>
          <Text type="grey2" caption>
            {localizeNumber(
              `${
                (+new Date(transactionDetail?.dateEnd) - +new Date(transactionDetail?.dateStart)) /
                  86400000 +
                1
              } ${tr("night")}`
            )}
          </Text>
        </View>

        <Text caption>
          {localizeNumber(
            formatPrice(
              +totalPrice({
                price: +((project?.price as number) * (1 - (project?.discount as number) / 100)),
                capacity: +(transactionDetail?.guest?.guestNumber as number),
                startDate: transactionDetail?.dateStart,
                endDate: transactionDetail?.dateEnd,
              })
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
              +totalPrice({
                price: +((project?.price as number) * (1 - (project?.discount as number) / 100)),
                capacity: +(transactionDetail?.guest?.guestNumber as number),
                startDate: transactionDetail?.dateStart,
                endDate: transactionDetail?.dateEnd,
              })
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
