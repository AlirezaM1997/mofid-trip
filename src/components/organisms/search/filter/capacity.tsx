import Input from "@atoms/input";
import { Text } from "@rneui/themed";
import debounce from "lodash/debounce";
import { RootState } from "@src/store";
import Container from "@atoms/container";
import { StyleSheet, View } from "react-native";
import React, { useMemo, useState } from "react";
import parseText from "@src/helper/number-input";
import { setFilter } from "@src/slice/filter-slice";
import useTranslation from "@src/hooks/translation";
import { Entypo, Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

const FilterCapacity = () => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();

  const { filter } = useSelector((state: RootState) => state.filterSlice);

  const [capacity, setCapacity] = useState({
    male: filter?.capacity?.male?.toString() || "0",
    female: filter?.capacity?.female?.toString() || "0",
  });

  const debouncedOnChange = useMemo(
    () =>
      debounce(
        (text, gender) =>
          dispatch(
            setFilter({
              ...filter,
              capacity: { ...filter?.capacity, [gender]: +text },
            })
          ),
        100
      ),
    [filter.capacity]
  );

  const changeHandler = (t, gender) => {
    setCapacity({ ...capacity, [gender]: parseText(t) });
    debouncedOnChange(t, gender);
  };

  const plusHandler = gender => {
    console.log(capacity[gender]);

    const value = +capacity[gender] + 1;
    const parsedValue = parseText(value.toString());

    setCapacity({ ...capacity, [gender]: parsedValue });
    debouncedOnChange(value, gender);
  };

  const minusHandler = gender => {
    const value = +capacity[gender] - 1;
    const parsedValue = parseText(value.toString());

    setCapacity({ ...capacity, [gender]: parsedValue });
    debouncedOnChange(value, gender);
  };

  return (
    <Container>
      <View style={styles.inputContainer}>
        <Text type="grey3">{tr("men")}</Text>
        <Input
          maxLength={3}
          value={parseText(capacity.male)}
          containerStyle={{ width: "50%" }}
          onChangeText={t => changeHandler(t, "male")}
          inputStyle={[styles.input, { outline: "none" }]}
          rightIcon={<Entypo size={30} name="squared-plus" onPress={() => plusHandler("male")} />}
          leftIcon={
            <Feather
              size={30}
              name="minus-square"
              onPress={() => +capacity?.male > 0 && minusHandler("male")}
            />
          }
        />
      </View>

      <View style={styles.inputContainer}>
        <Text type="grey3">{tr("women")}</Text>

        <Input
          maxLength={3}
          containerStyle={{ width: "50%" }}
          value={parseText(capacity.female)}
          onChangeText={t => changeHandler(t, "female")}
          inputStyle={[styles.input, { outline: "none" }]}
          rightIcon={<Entypo size={30} name="squared-plus" onPress={() => plusHandler("female")} />}
          leftIcon={
            <Feather
              size={30}
              name="minus-square"
              onPress={() => +capacity?.female > 0 && minusHandler("female")}
            />
          }
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    border: 0,
    width: "50%",
    outline: "none",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default FilterCapacity;
