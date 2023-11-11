import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Text, Button } from "@rneui/themed";
import { PressableProps } from "react-native";

interface PropsType extends PressableProps {
  title: string;
  topTitle: string;
  icon: React.ReactNode;
  button: React.ReactNode;
  style?: ViewStyle;
}

export default ({ title, topTitle, icon, style, button }: PropsType) => {
  return (
    <Pressable style={[styles.root, style]}>
      <View style={styles.title}>
        {icon}
        <View style={styles.titleText}>
          <Text numberOfLines={1} style={styles.text} caption type="grey2">
            {topTitle}
          </Text>
          <Text numberOfLines={1} style={styles.text}>
            {title}
          </Text>
        </View>
      </View>
      {button}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { display: "flex", flexDirection: "row", gap: 10, alignItems: "center" },
  titleText: { display: "flex", flexDirection: "column" },
  text: { width: 150 },
});
