import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import TourCreateTab from "@modules/virtual-tabs";
import { Divider } from "@rneui/base";
import { Badge, Input, Text } from "@rneui/themed";
import { WIDTH } from "@src/constants";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const Screen = () => {
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);
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

  const handlePress = value => {
    setValue(value);
  };

  const handlePress2 = value => {
    setValue2(value);
  };

  return (
    <>
      <TourCreateTab index={5} />
      <WhiteSpace />
      <Container>
        <Text heading2 bold>
          {tr("Tour Price")}
        </Text>
        <Text>
          {tr(
            "Choose or write the cost of your tour, you can give a discount to the original price."
          )}
        </Text>

        <WhiteSpace />

        <Input value={value} label={tr("Price") + " (" + tr("Tooman") + ")"} />
        <View style={styles.badgeRow}>
          {recommendedPrices.map(recom => (
            <Badge
              value={recom.title}
              color="grey2"
              type="solid"
              containerStyle={styles.badgeContainerStyle}
              badgeStyle={styles.badgeStyle}
              onPress={() => handlePress(recom.value)}
            />
          ))}
        </View>
      </Container>

      <WhiteSpace />
      <Divider />
      <WhiteSpace />

      <Container>
        <Input value={value2} label={tr("Discount") + " (%)"} />
        <View style={styles.badgeRow}>
          {recommendedDiscounts.map(recom => (
            <Badge
              value={recom.title}
              color="grey2"
              type="solid"
              containerStyle={styles.badgeContainerStyle}
              badgeStyle={styles.badgeStyle}
              onPress={() => handlePress2(recom.value)}
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
  },
  badgeStyle: {
    width: WIDTH / 2 - 50,
  },
});

export default Screen;
