import Input from "@atoms/input";
import { Text } from "@rneui/themed";
import debounce from "lodash/debounce";
import { RootState } from "@src/store";
import Container from "@atoms/container";
import parseText from "@src/helper/number-input";
import React, { useMemo, useState } from "react";
import { setFilter } from "@src/slice/filter-slice";
import useTranslation from "@src/hooks/translation";
import { useDispatch, useSelector } from "react-redux";

// TODO: range picker
const FilterPrice = () => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();

  const { filter } = useSelector((state: RootState) => state.filterSlice);

  const [range, setRange] = useState({
    low: filter?.price?.low?.toString() || "0",
    high: filter?.price?.high?.toString() || "50000000",
  });

  const debouncedOnChange = useMemo(
    () =>
      debounce(
        (rangeInput: typeof range) =>
          dispatch(
            setFilter({ ...filter, price: { low: +rangeInput.low, high: +rangeInput.high } })
          ),
        800
      ),
    [filter?.price]
  );

  const changeHandler = (t: string, item: string) => {
    setRange({ ...range, [item]: t });
    debouncedOnChange({ ...range, [item]: t });
  };

  return (
    <Container style={{ direction: "ltr" }}>
      <Input
        value={parseText(range.low)}
        rightIcon={<Text>{tr("from")}</Text>}
        onChangeText={t => changeHandler(parseText(t), "low")}
      />
      <Input
        value={parseText(range.high)}
        rightIcon={<Text>{tr("to")}</Text>}
        onChangeText={t => changeHandler(parseText(t), "high")}
      />
    </Container>
  );
};

export default FilterPrice;
