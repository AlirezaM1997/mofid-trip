import { StyleSheet, View, ViewProps } from "react-native";
import { ButtonProps } from "@rneui/themed";
import { ReactNode } from "react";

export type ButtonRowProps = ViewProps & {
  children: ReactNode[];
};

const ButtonRow = ({ children, ...props }: ButtonRowProps) => {
  return (
    <View style={[styles.row, props.style]}>
      {children.map((button: ReactNode, i) => (
        <View key={i} style={styles.child}>
          {button}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    gap: 10,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  child: {
    flex: 1,
  },
});

export default ButtonRow;
