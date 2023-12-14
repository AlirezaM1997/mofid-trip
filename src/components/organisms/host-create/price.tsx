import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import { Badge, Divider, Input, Text } from "@rneui/themed";
import { WIDTH } from "@src/constants";
import { ProjectAddInputType } from "@src/gql/generated";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { useFormikContext } from "formik";
import { StyleSheet, View } from "react-native";

const TabPrice = () => {
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();
  const { values, errors, touched, setFieldValue, handleChange, handleBlur } =
    useFormikContext<ProjectAddInputType>();

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
      <Container>
        <Text heading2 bold>
          {tr("Host Price")}
        </Text>
        <Text>
          {tr(
            "Choose or write the cost of your host, you can give a discount to the original price."
          )}
        </Text>

        <WhiteSpace />

        <Input
          value={values.price?.toString()}
          label={tr("Price") + " (" + tr("Tooman") + ")"}
          onChangeText={text => setFieldValue("price", parseInt(text))}
          onBlur={handleBlur("price")}
          errorMessage={touched.price && (errors.price as string)}
        />
        <View style={styles.badgeRow}>
          {recommendedPrices.map(recom => (
            <Badge
              value={recom.title}
              color="grey2"
              type="solid"
              containerStyle={styles.badgeContainerStyle}
              badgeStyle={styles.badgeStyle}
              onPress={() => setFieldValue("price", parseInt(recom.value))}
            />
          ))}
        </View>
      </Container>

      <WhiteSpace />
      <Divider />
      <WhiteSpace />

      <Container>
        <Input
          value={values.discount}
          onChangeText={text => setFieldValue("discount", parseInt(text))}
          onBlur={handleBlur("discount")}
          errorMessage={touched.discount && (errors.discount as string)}
          label={tr("Discount") + " (%)"}
        />
        <View style={styles.badgeRow}>
          {recommendedDiscounts.map(recom => (
            <Badge
              value={recom.title}
              color="grey2"
              type="solid"
              containerStyle={styles.badgeContainerStyle}
              badgeStyle={styles.badgeStyle2}
              onPress={() => setFieldValue("discount", parseInt(recom.value))}
            />
          ))}
        </View>
      </Container>
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
  badgeStyle2: {
    minWidth: WIDTH / 4 - 100,
    paddingHorizontal: 0,
    alignSelf: "center",
    flexGrow: 1,
    width: "100%",
  },
});

export default TabPrice;
