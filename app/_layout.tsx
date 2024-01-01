import { ThemeProvider } from "@rneui/themed";
import { SessionProvider } from "@src/context/auth";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import { persistor, store } from "@src/store";
import { toastConfig } from "@src/toast-config";
import { theme } from "@src/theme";
import { View, Platform, StyleSheet, Appearance, I18nManager } from "react-native";
import Toast from "react-native-toast-message";
import React, { useCallback, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { PersistGate } from "redux-persist/integration/react";
import useIsRtl from "@src/hooks/localization";
import { ApolloProvider } from "@apollo/client";
import { LtrSpecificStyles, RtlSpecificStyles } from "@src/global-style";
import customUseApolloClient from "@src/hooks/apollo/client";
import { Stack } from "expo-router/stack";
import useTranslation from "@src/hooks/translation";
import HeaderBackButton from "@atoms/header-back-button";
import useDefaultScreenOptions from "@src/hooks/use-default-screen-options";

SplashScreen.preventAutoHideAsync();

export function PatchedApolloProvider({ children }) {
  const isRtl = useIsRtl();
  const client = customUseApolloClient();

  useEffect(() => {
    if (Platform.OS === "web") {
      document.body.insertAdjacentHTML("beforeend", isRtl ? RtlSpecificStyles : LtrSpecificStyles);
    }
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

const MainContentWithTheme = () => {
  const isRtl = useIsRtl();
  const Theme = theme(isRtl);

  return (
    <View style={styles.container} dir={isRtl ? "rtl" : "ltr"}>
      <ThemeProvider theme={Theme}>
        <MainContent />
      </ThemeProvider>
    </View>
  );
};

const MainContent = () => {
  const { tr } = useTranslation();
  const defaultScreenOptions = useDefaultScreenOptions();

  I18nManager.allowRTL(I18nManager.isRTL);

  return (
    <>
      <Stack
        screenOptions={({ route }) => ({
          headerShown: !["(home)", "(app)"].includes(route.name),
          ...defaultScreenOptions,
        })}>
        <Stack.Screen
          name="user-login"
          options={{
            title: tr("User Login"),
          }}
        />
        <Stack.Screen
          name="ngo-login"
          options={{
            title: tr("NGO Login"),
          }}
        />
        <Stack.Screen
          name="coming-soon"
          options={{
            title: tr("coming soon"),
          }}
        />
        <Stack.Screen
          name="tour/[tourId]"
          options={{
            title: tr("loading"),
          }}
        />
        <Stack.Screen
          name="SMSVerification"
          options={{
            title: tr("SMS Verification"),
          }}
        />
        <Stack.Screen
          name="search"
          options={{
            title: tr("Search"),
          }}
        />
        <Stack.Screen
          name="host-owner"
          options={{
            title: tr("Loading"),
          }}
        />
        <Stack.Screen
          name="tour-search"
          options={{
            title: tr("search for tours"),
          }}
        />
        <Stack.Screen
          name="ngoLogin"
          options={{
            title: tr("log in, sign up"),
          }}
        />
      </Stack>
      <Toast config={toastConfig} />
    </>
  );
};

export default function Root() {
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
    <SessionProvider>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <PatchedApolloProvider>
            <StatusBar
              style={isDarkMode ? "light" : "dark"}
              translucent={false}
              backgroundColor={isDarkMode ? "black" : "white"}
            />
            <View style={styles.container} onLayout={onLayoutRootView}>
              <MainContentWithTheme />
            </View>
          </PatchedApolloProvider>
        </Provider>
      </PersistGate>
    </SessionProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
