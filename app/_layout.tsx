import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { theme } from "@src/theme";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@rneui/themed";
import useIsRtl from "@src/hooks/localization";
import Toast from "react-native-toast-message";
import { toastConfig } from "@src/toast-config";
import { ApolloProvider } from "@apollo/client";
import * as SplashScreen from "expo-splash-screen";
import { Provider, useSelector } from "react-redux";
import React, { useCallback, useEffect } from "react";
import { RootState, persistor, store } from "@src/store";
import { useSettingDetailQuery } from "@src/gql/generated";
import useApolloClient from "@src/hooks/apollo/client/index";
import { PersistGate } from "redux-persist/integration/react";
import useSettingDetail from "@src/hooks/db/setting-detail";
// import NetworkState from "@src/components/atoms/network-state";
import { LtrSpecificStyles, RtlSpecificStyles } from "@src/global-style";
import { View, Platform, StyleSheet, Appearance, I18nManager } from "react-native";
import { Slot } from "expo-router";

SplashScreen.preventAutoHideAsync();

export function PatchedApolloProvider({ children }) {
  const isRtl = useIsRtl();
  const client = useApolloClient();
  useEffect(() => {
    if (Platform.OS === "web") {
      document.body.insertAdjacentHTML("beforeend", isRtl ? RtlSpecificStyles : LtrSpecificStyles);
    }
  }, []);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

const MainContent = () => {
  const isRtl = useIsRtl();
  const Theme = theme(isRtl);

  const { data } = useSettingDetailQuery();
  const { syncTable } = useSettingDetail();
  const userId = useSelector((state: RootState) => state.userSlice?.loginData?.metadata?.id);
  const { language } = useSelector((state: RootState) => state.settingDetailSlice.settingDetail);

  useEffect(() => {
    if (data) if (language !== data.settingDetail.language) syncTable({ userId });
  }, [data]);

  I18nManager.allowRTL(I18nManager.isRTL);

  return (
    <View style={styles.container} dir={isRtl ? "rtl" : "ltr"}>
      <ThemeProvider theme={Theme}>
        <Slot />
        <Toast config={toastConfig} />
      </ThemeProvider>
    </View>
  );
};

export default function App() {

  const colorScheme = Appearance.getColorScheme();
  const isDarkMode = colorScheme === "dark";
  const [fontsLoaded] = useFonts({
    DanaNoEn: require("../assets/fonts/dana/DanaNoEn-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync().then(console.log);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <PatchedApolloProvider>
          <StatusBar
            style={isDarkMode ? "light" : "dark"}
            translucent={false}
            backgroundColor={isDarkMode ? "black" : "white"}
          />
          <View style={styles.container} onLayout={onLayoutRootView}>
            <MainContent />
          </View>
        </PatchedApolloProvider>
      </Provider>
    </PersistGate>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
