import { Feather } from "@expo/vector-icons";
import { useTheme } from "@rneui/themed";
import useIsRtl from "@src/hooks/localization";
import { router } from "expo-router";
import { Platform, StyleSheet } from "react-native";

const HeaderBackButton = ({ canGoBack, ...props }) => {
  const { theme } = useTheme();
  const isRtl = useIsRtl();

  return (
    <Feather
      style={style.icon}
      name={isRtl ? "arrow-right" : "arrow-left"}
      size={24}
      color={theme.colors.black}
      onPress={() => (canGoBack ? router.back() : Platform.OS === "web" ? history.go(-1) : "")}
    />
  );
};

const style = StyleSheet.create({
  icon: {
    marginRight: 24,
  },
});

export default HeaderBackButton;
// if (isWeb) { // if user can't go back and in web side, call history API to let user back
//   history.go(-1);
