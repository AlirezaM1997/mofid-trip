import React from "react";
import { Text } from "@rneui/themed";
import Container from "@atoms/container";
import { useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import useTranslation from "@src/hooks/translation";
import { clearFilter } from "@src/slice/filter-slice";

const FilterHeader = ({ index, setIndex, setIsVisible }) => {
  const { tr } = useTranslation();
  const dispatch = useDispatch();

  const headerTitle = () => {
    const obj = {
      0: tr("filters"),
      1: tr("category"),
      2: tr("price"),
      3: tr("price"),
      4: tr("from city"),
      5: tr("destination city"),
      6: tr("capacity"),
      7: tr("date"),
    };

    if (index in obj) return obj[index];
    return obj[0];
  };

  return (
    <Container style={styles.filterHeader}>
      <View style={styles.filterHeaderTitle}>
        <Feather
          name="arrow-right"
          size={22}
          onPress={() => (index === 0 ? setIsVisible(false) : setIndex(0))}
        />
        <Text>{headerTitle()}</Text>
      </View>

      {index === 0 && (
        <Text
          caption
          type="error"
          onPress={() => {
            dispatch(clearFilter());
          }}>
          {tr("clear filters")}
        </Text>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  filterHeader: {
    marginTop: 32,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterHeaderTitle: {
    gap: 16,
    flexDirection: "row",
  },
});

export default FilterHeader;
