import Input from "@atoms/input";
import { Button } from "@rneui/themed";
import { WIDTH } from "@src/constants";
import { useFormikContext } from "formik";
import { Badge, Text } from "@rneui/themed";
import WhiteSpace from "@atoms/white-space";
import { StyleSheet, View } from "react-native";
import parseText from "@src/helper/number-input";
import { TourAddInputType } from "@src/gql/generated";
import { useFormatPrice } from "@src/hooks/localization";
import * as persianTools from "@persian-tools/persian-tools";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

const PriceTab = () => {
  const { tr } = useTranslation();
  const { formatPrice } = useFormatPrice();
  const { localizeNumber } = useLocalizedNumberFormat();
  const { values, errors, touched, handleBlur, setFieldValue } =
    useFormikContext<TourAddInputType>();

  const recommendedPrices = [
    { title: localizeNumber(tr("Free")), value: 0 },
    { title: localizeNumber(tr("100,000 Tooman")), value: 100000 },
    { title: localizeNumber(tr("500,000 Tooman")), value: 500000 },
    { title: localizeNumber(tr("1,000,000 Tooman")), value: 1000000 },
    { title: localizeNumber(tr("2,000,000 Tooman")), value: 2000000 },
    { title: localizeNumber(tr("5,000,000 Tooman")), value: 5000000 },
  ];

  const recommendedDiscounts = [
    { title: localizeNumber("10%"), value: 10 },
    { title: localizeNumber("20%"), value: 20 },
    { title: localizeNumber("30%"), value: 30 },
    { title: localizeNumber("50%"), value: 50 },
  ];

  return (
    <>
      <View style={styles.headerTitle}>
        <Text heading2 bold>
          {tr("Tour Price")}
        </Text>
        <Text>
          {tr(
            "Choose or write the cost of your tour, you can give a discount to the original price."
          )}
        </Text>
      </View>

      <Input
        maxLength={7}
        keyboardType="numeric"
        onBlur={handleBlur("price")}
        label={tr("Price") + " (" + tr("Tooman") + ")"}
        value={parseText(values.price?.toString().replace(/^0+/, ""))}
        errorMessage={(touched.price && errors.price) as string}
        onChangeText={price => setFieldValue("price", parseText(price))}
      />
      {values?.price ? (
        <Text caption style={{ marginBottom: 12 }}>
          {persianTools.numberToWords(values.price as number) as string} {tr("Tooman")}
        </Text>
      ) : (
        ""
      )}
      <View style={styles.badgeRow}>
        {recommendedPrices.map(recom => (
          <Badge
            value={recom.title}
            color="grey2"
            type="solid"
            containerStyle={styles.badgeContainerStyle}
            onPress={() => setFieldValue("price", recom.value)}
            badgeStyle={[styles.badgeStyle, values.price === recom.value && styles.selectedBadge]}
          />
        ))}
      </View>

      <WhiteSpace size={20} />

      <Input
        maxLength={3}
        keyboardType="numeric"
        onBlur={handleBlur("discount")}
        label={tr("Discount") + " (%)"}
        value={parseText(values.discount?.toString().replace(/^0+/, ""))}
        errorMessage={(touched.discount && errors.discount) as string}
        onChangeText={text => setFieldValue("discount", parseText(text))}
      />
      <View style={styles.badgeRow}>
        {recommendedDiscounts.map(recom => (
          <Badge
            value={recom.title}
            color="grey2"
            type="solid"
            containerStyle={styles.badgeContainerStyle}
            badgeStyle={[
              styles.badgeStyle2,
              values.discount === recom.value && styles.selectedBadge,
            ]}
            onPress={() => setFieldValue("discount", recom.value)}
          />
        ))}
      </View>
      <WhiteSpace size={40} />
      <View style={styles.row}>
        {(values.discount as number) > 0 && (
          <>
            {" "}
            <View style={styles.discount}>
              <Text style={{ textDecorationLine: "line-through" }}>
                {localizeNumber(formatPrice(values.price as number) as string)}
              </Text>
              <Button color="secondary" size="sm">
                {`% ${localizeNumber(values.discount as number)}`}
              </Button>
            </View>
            <Text>=</Text>
          </>
        )}
        <Text>
          {localizeNumber(
            formatPrice(
              (values.price as number) * (1 - (values.discount as number) / 100)
            ) as string
          )}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  badgeRow: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  badgeContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    flexGrow: 1,
  },
  badgeStyle: {
    minWidth: WIDTH / 2 - 85,
    paddingHorizontal: 0,
    alignSelf: "center",
    flexGrow: 1,
    width: "100%",
  },
  selectedBadge: {
    border: "1px solid #000",
  },
  badgeStyle2: {
    minWidth: WIDTH / 4 - 100,
    paddingHorizontal: 0,
    alignSelf: "center",
    flexGrow: 1,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  headerTitle: { gap: 5, marginBottom: 20 },
  discount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default PriceTab;
