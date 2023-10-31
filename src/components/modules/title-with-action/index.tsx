import { useTheme } from "@rneui/themed";
import Text from "@src/components/atoms/text";
import { Pressable, StyleSheet, View } from "react-native";

type TitleWithActionPropsType = {
  title: string;
  actionTitle: string;
  onActionPress?: () => void;
};

const TitleWithAction = ({ title, actionTitle, onActionPress }: TitleWithActionPropsType) => {
  const { theme } = useTheme();

  return (
    <View style={style.container}>
      <Text variant="heading1">{title}</Text>
      <Pressable onPress={onActionPress}>
        <Text color={theme.colors.primary} variant="caption">
          {actionTitle}
        </Text>
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 18,
  },
});

export default TitleWithAction;
