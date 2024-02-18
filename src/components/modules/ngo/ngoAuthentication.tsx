import { Text } from "@rneui/themed";
import { router } from "expo-router";
import Container from "@atoms/container";
import { StyleSheet } from "react-native";
import WhiteSpace from "@atoms/white-space";
import { Button, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { NgoDetailQuery } from "@src/gql/generated";

type PropsType = {
  isVerify: NgoDetailQuery["NGODetail"]["isVerify"];
  description: string;
};
const NgoAuthentication = ({ isVerify, description }: PropsType) => {
  const { theme } = useTheme();
  const { tr } = useTranslation();

  return (
    <Container size={12} style={styles.container(theme, isVerify)}>
      <Text type="white" bold>
        {tr("verify your ngo!")}
      </Text>
      <WhiteSpace size={4} />
      <Text type="white" caption>
        {isVerify === false
          ? description
          : tr(
              "if your collection is not authenticated by the admin, it will not be approved. please authenticate as soon as possible."
            )}
      </Text>
      <WhiteSpace size={16} />
      <Button size="sm" color="secondary" onPress={() => router.push("ngo-authentication")}>
        {isVerify === false ? tr("request again") : tr("authentication")}
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: (theme, isVerify) => ({
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: isVerify === false ? theme.colors.error : theme.colors.warning,
  }),
});

export default NgoAuthentication;
