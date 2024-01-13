import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import { Button, useTheme } from "@rneui/themed";
import { Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { StyleSheet, View } from "react-native";

const NgoAuthentication = () => {
  const { tr } = useTranslation();
  const { theme } = useTheme();

  return (
    <Container size={12} style={styles.container(theme)}>
      <Text type="white" bold>
        {tr("verify your ngo!")}
      </Text>
      <WhiteSpace size={4} />
      <Text type="white" caption>
        {tr(
          "if your collection is not authenticated by the admin, it will not be approved. please authenticate as soon as possible."
        )}
      </Text>
      <WhiteSpace size={16} />
      <Button size="sm" color="secondary">
        {tr("authentication")}
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: theme.colors.warning,
  }),
});

export default NgoAuthentication;
