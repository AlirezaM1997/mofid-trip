import { Feather } from "@expo/vector-icons";
import { useTheme } from "@rneui/themed";
import useIsRtl from "@src/hooks/localization";
import { router } from "expo-router";
import { StyleSheet } from "react-native";

const HeaderBackButton = ({ canGoBack, ...props }) => {
  const { theme } = useTheme();
  const isRtl = useIsRtl();

  return canGoBack ? (
    <Feather
      style={style.icon}
      name={isRtl ? "arrow-right" : "arrow-left"}
      size={24}
      color={theme.colors.black}
      onPress={() => router.back()}
    />
  ) : null;
};

const style = StyleSheet.create({
  icon: {
    marginHorizontal: 10,
  },
});

export default HeaderBackButton;
