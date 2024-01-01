import HeaderBackButton from "@atoms/header-back-button";
import { useTheme } from "@rneui/themed";

const useDefaultScreenOptions = () => {
  const { theme } = useTheme();

  return {
    headerLeft: HeaderBackButton,
    headerTitleStyle: {
      fontFamily:
        'DanaNoEn, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },
    contentStyle: {
      backgroundColor: theme.colors.white,
    },
  };
};
export default useDefaultScreenOptions;
