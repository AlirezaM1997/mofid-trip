import React, { ReactNode } from "react";
import { ScrollViewProps, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { useTheme } from "@rneui/themed";
import { Divider } from "@rneui/base";
import { HEIGHT } from "@src/constants";

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
      <ScrollView
        contentContainerStyle={[contentContainerStyle, styles.contentContainer]}
        style={styles.contentContainer}>
        {children}
      </ScrollView>
      <Divider />
      {buttons.length ? (
        <View style={styles.buttonContainer(theme)}>
          {buttons.map((b, i) => (
            <View style={styles.button} key={i}>
              {b}
            </View>
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
    // height: HEIGHT - 195,
  },
  buttonContainer: theme => ({
    gap: 10,
    padding: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.white,
  }),
  button: {
    flex: 1,
  },
};

export default BottomButtonLayout;
