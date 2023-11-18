import "react-native-gesture-handler";
import useIsRtl from "@src/hooks/localization";
import Toast from "react-native-toast-message";
import useApolloClient from "@src/hooks/apollo/client/index";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect } from "react";
import { useFonts } from "expo-font";
import { theme } from "@src/theme";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@rneui/themed";
import { toastConfig } from "@src/toast-config";
import { ApolloProvider } from "@apollo/client";
import { Provider, useSelector } from "react-redux";
import { RootState, persistor, store } from "@src/store";
import { PersistGate } from "redux-persist/integration/react";
import { LtrSpecificStyles, RtlSpecificStyles } from "@src/global-style";
import { View, Platform, StyleSheet, Appearance, I18nManager } from "react-native";
import { Slot } from "expo-router";
import useTourTable from "@src/hooks/db/tour";
import useUserDetailTable from "@src/hooks/db/user-detail";
import useSettingDetailTable from "@src/hooks/db/setting-detail";
import useProjectTable from "@src/hooks/db/project";
import { useIsAuthenticated } from "@src/hooks/user";
import useMyNGOTable from "@src/hooks/db/ngo";

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
  const isAuthenticated = useIsAuthenticated();
  const isNgo = useSelector((state: RootState) => state.userSlice?.userDetail?.isNgo || false);

  const { syncTable: syncTableSettingDetail } = useSettingDetailTable();
  const { syncTable: syncTableUserDetail } = useUserDetailTable();
  const { syncTable: syncTableTour } = useTourTable();
  const { syncTable: syncTableProject } = useProjectTable();
  const { syncTable: syncTableMyNGOTable } = useMyNGOTable();

  const { token } = useSelector((state: RootState) => state.userSlice.loginData);

  useEffect(() => {
    syncTableTour({
      page: {
        pageNumber: 1,
        pageSize: 99999,
      },
    });
    syncTableProject({
      page: {
        pageNumber: 1,
        pageSize: 99999,
      },
    });
  }, []);

  useEffect(() => {
    console.log("OOO", isAuthenticated, token);
    if (isAuthenticated && token) {
      syncTableUserDetail();
      syncTableSettingDetail();
      if (isNgo) {
        syncTableMyNGOTable();
      }
    }
  }, [isAuthenticated, isNgo]);

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
    DanaNoEnDemiBold: require("../assets/fonts/dana/DanaNoEn-DemiBold.ttf"),
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
