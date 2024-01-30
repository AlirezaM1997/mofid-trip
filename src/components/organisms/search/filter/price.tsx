import React, { useMemo, useState } from "react";
import Container from "@atoms/container";
import { StyleSheet } from "react-native";
import useTranslation from "@src/hooks/translation";
import parseText from "@src/helper/number-input";
import Input from "@atoms/input";
import { Text } from "@rneui/themed";
import debounce from "lodash/debounce";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@src/slice/filter-slice";
import { RootState } from "@src/store";

// TODO: range picker
const FilterPrice = () => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const [range, setRange] = useState({
    low: "0",
    hight: "50000000",
  });

  const { filter } = useSelector((state: RootState) => state.filterSlice);

  const debouncedOnChange = useMemo(
    () => debounce(range => dispatch(setFilter({ ...filter, price: range })), 1500),
    [range]
  );

  const changeHandler = (t, item) => {
    setRange({ ...range, [item]: t });
    debouncedOnChange(range);
  };

  return (
    <Container style={[styles.container, { direction: "ltr" }]}>
      <Input
        value={parseText(range.low)}
        rightIcon={<Text>{tr("from")}</Text>}
        onChangeText={t => changeHandler(t, "low")}
      />
      <Input
        value={parseText(range.hight)}
        rightIcon={<Text>{tr("to")}</Text>}
        onChangeText={t => changeHandler(t, "hight")}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    // flexDirection: "row",
    // justifyContent: "center",
  },
});

export default FilterPrice;
