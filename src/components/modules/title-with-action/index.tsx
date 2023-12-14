import { Text } from "@rneui/themed";
import { Pressable, StyleSheet, View } from "react-native";

type TitleWithActionPropsType = {
  title: string;
  actionTitle: string;
  onActionPress?: () => void;
};

const TitleWithAction = ({ title, actionTitle, onActionPress }: TitleWithActionPropsType) => {
  return (
    <View style={style.container}>
      <Text subtitle1 bold>
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
