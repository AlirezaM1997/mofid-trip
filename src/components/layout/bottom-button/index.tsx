import React, { ReactNode } from "react";
import { ScrollViewProps, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { useTheme } from "@rneui/themed";
import { Divider } from "@rneui/base";

const { height } = Dimensions.get("screen");

type BottomButtonLayoutProps = {
  children: ReactNode;
  buttons: ReactNode[];
  layoutStyle?: { [key: string]: string };
};

const BottomButtonLayout = ({
  children,
  buttons,
  contentContainerStyle,
}: BottomButtonLayoutProps & ScrollViewProps) => {
  const { theme } = useTheme();

  return (
    <>
      <ScrollView contentContainerStyle={contentContainerStyle} style={styles.contentContainer}>
        {children}
      </ScrollView>
      <Divider />
      {buttons.length ? (
        <View style={styles.buttonContainer}>
          {buttons.map((b, i) => (
            <View key={i}>{b}</View>
          ))}
        </View>
      ) : (
        ""
      )}
    </>
  );
};

const styles = {
  contentContainer: {
    flex: 1,
    height: height - 195,
  },
  buttonContainer: {
    flex: 1,
  },
};

export default BottomButtonLayout;
