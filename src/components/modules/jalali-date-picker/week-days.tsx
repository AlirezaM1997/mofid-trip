import { Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native";

const WeekDays = () => {
  const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

  return (
    <FlatList
      contentContainerStyle={styles.contentContainerStyle}
      horizontal={false}
      numColumns={7}
      data={weekDays}
      columnWrapperStyle={styles.columnWrapperStyle}
      renderItem={({ item }) => (
        <View key={item} style={styles.cell}>
          <Text caption type="grey3" center>
            {item}
          </Text>
        </View>
      )}
      keyExtractor={item => item}
    />
  );
};

export default WeekDays;

const styles = StyleSheet.create({
  cell: {
    width: 26,
  },
  contentContainerStyle: { margin: 7 },
  columnWrapperStyle: { gap: 20 },
});
