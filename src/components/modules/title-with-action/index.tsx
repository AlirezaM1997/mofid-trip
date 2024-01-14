import { Text } from "@rneui/themed";
import { Pressable, StyleSheet, View } from "react-native";

type TitleWithActionPropsType = {
  size?: string;
  title: string;
  actionTitle: string;
  onActionPress?: () => void;
};

const TitleWithAction = ({
  title,
  actionTitle,
  size = "heading2",
  onActionPress,
}: TitleWithActionPropsType) => {
  // TODO: remove getTextStyle and add TextProps
  const getTextStyle = size => {
    const obj = {
      heading1: { heading1: true },
      heading2: { heading2: true },
      subtitle1: { subtitle1: true },
      subtitle2: { subtitle2: true },
      caption: { caption: true },
      body2: { body2: true },
    };
    if (size in obj) return obj[size];
  };

  return (
    <View style={style.container}>
      <Text {...getTextStyle(size)} bold>
        {title}
      </Text>

      <Pressable onPress={onActionPress}>
        <Text type="primary" caption>
          {actionTitle}
        </Text>
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
});

export default TitleWithAction;
