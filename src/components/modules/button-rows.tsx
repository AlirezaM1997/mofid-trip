import { StyleSheet, View, ViewProps } from "react-native";
import { ButtonProps } from "@rneui/themed";

export type ButtonRowProps = ViewProps & {
  children: ButtonProps[];
};

const ButtonRow = ({ children, ...props }: ButtonRowProps) => {
  return (
    <View style={styles.row}>
      {children.map((button, i) => (
        <View  key={i} style={styles.child}>{button}</View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  child:{
    flexGrow: 1
  }
});

export default ButtonRow;
