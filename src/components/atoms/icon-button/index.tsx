import React from "react";
import Text from "../text";
import { StyleSheet, View } from "react-native";
import { Button, useTheme } from "@rneui/themed";

const IconButton = ({ onPress, text, icon }) => {
  const theme = useTheme();
  const themeStyles = {
    text: {
      color: theme.theme.colors.white,
    },
  };
  return (
    <Button color="secondary" onPress={onPress}>
      <View style={styles.container}>
        <Text variant="cta2" style={[styles.text, themeStyles.text]}>
          {text}
        </Text>
        {icon}
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  text: { marginLeft: 10 },
});

export default IconButton;
