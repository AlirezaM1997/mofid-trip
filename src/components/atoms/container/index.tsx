import React, { ReactElement, ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

type PropsType = {
  children?: ReactElement | ReactNode;
  size?: number;
  style?: ViewStyle;
};

const Container = ({ children, size, style, ...props }: PropsType) => {
  return (
    <View {...props} style={[styles.container, { paddingHorizontal: size }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});

Container.defaultProps = {
  size: 24,
};
export default Container;
