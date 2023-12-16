import "react-native-gesture-handler";
import { theme } from "@src/theme";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@rneui/themed";
import { persistor, store } from "@src/store";
import useIsRtl from "@src/hooks/localization";
import Toast from "react-native-toast-message";
import { toastConfig } from "@src/toast-config";
import { ApolloProvider } from "@apollo/client";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect } from "react";
import { useConfirmAuthentication } from "@src/hooks/auth";
import customUseApolloClient from "@src/hooks/apollo/client";
import { PersistGate } from "redux-persist/integration/react";
import { LtrSpecificStyles, RtlSpecificStyles } from "@src/global-style";
import { View, Platform, StyleSheet, Appearance, I18nManager } from "react-native";

SplashScreen.preventAutoHideAsync();

export function PatchedApolloProvider({ children }) {
  const isRtl = useIsRtl();
  const client = customUseApolloClient();
  const { confirmAuth } = useConfirmAuthentication();

  useEffect(() => {
    confirmAuth();
  }, [client]);

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
    DanaNoEn: require("@assets/fonts/dana/DanaNoEn-Regular.ttf"),
    DanaNoEnDemiBold: require("@assets/fonts/dana/DanaNoEn-DemiBold.ttf"),
    DanaFaNum: require("@assets/fonts/dana/farsi-numerical/DanaFaNum-Regular.ttf"),
    DanaFaNumDemiBold: require("@assets/fonts/dana/farsi-numerical/DanaFaNum-DemiBold.ttf"),
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
