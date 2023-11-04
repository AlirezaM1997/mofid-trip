import Container from "@atoms/container";
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
    <Container style={style.container}>
      <Text variant="heading1">{title}</Text>
      <Pressable onPress={onActionPress}>
        <Text color={theme.colors.primary} variant="caption">
          {actionTitle}
        </Text>
      </Pressable>
    </Container>
  );
};

const style = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
});

export default TitleWithAction;
