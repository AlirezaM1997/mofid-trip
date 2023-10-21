import Text from "@src/components/atoms/text";
import { RootState } from "@src/store";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

const PriceTable = () => {
  const { tourDetail } = useSelector((state: RootState) => state.tourSlice);

  return (
    <View style={style.container}>
      {tourDetail?.price?.map((p, index) => (
        <View key={index} style={style.priceTable}>
          <Text variant="body2" style={style.title}>
            {p.title}
          </Text>
          <Text variant="heading2" style={style.price}>
            $ {p.price}
          </Text>
        </View>
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    color: "#878787",
  },
  priceTable: {
    borderWidth: 1,
    borderColor: "#DADADA",
    height: 50,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  price: {
    color: "#101010",
    fontWeight: "bold",
  },
  container: {
    gap: 7
  }
});

export default PriceTable;
