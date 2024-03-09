// import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import { theme } from "@src/theme";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@rneui/themed";
import { persistor, store } from "@src/store";
import useIsRtl from "@src/hooks/localization";
import Toast from "react-native-toast-message";
import { toastConfig } from "@src/toast-config";
import { ApolloProvider } from "@apollo/client";
import * as SplashScreen from "expo-splash-screen";
import { SessionProvider } from "@src/context/auth";
import useTranslation from "@src/hooks/translation";
import React, { useCallback, useEffect } from "react";
import customUseApolloClient from "@src/hooks/apollo/client";
import { PersistGate } from "redux-persist/integration/react";
import { LtrSpecificStyles, RtlSpecificStyles } from "@src/global-style";
import useDefaultScreenOptions from "@src/hooks/use-default-screen-options";
import { Appearance, I18nManager, Platform, StyleSheet, View } from "react-native";

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

  // *  if you had an error that you don't know where it is coming from you can turn this on to see error in console
  // if (__DEV__) {
  //   loadDevMessages();
  //   loadErrorMessages();
  // }

  return (
    <>
      <Stack
        screenOptions={({ route }) => ({
          headerShown: !["(home)", "(app)"].includes(route.name),
          ...defaultScreenOptions,
        })}>
        <Stack.Screen
          name="login-details"
          options={{
            title: tr("Basic Info"),
          }}
        />
        <Stack.Screen
          name="terms-of-service"
          options={{
            title: tr("terms of service"),
          }}
        />
        <Stack.Screen
          name="login-details-ngo"
          options={{
            title: tr("Basic Info"),
          }}
        />
        <Stack.Screen
          name="user-login"
          options={{
            title: tr("User Login"),
          }}
        />
        <Stack.Screen
          name="all-hosts"
          options={{
            title: tr("all hosts"),
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
          name="host-list"
          options={{
            headerShown: false,
            title: tr("coming soon"),
          }}
        />
        <Stack.Screen
          name="all-tours"
          options={{
            title: tr("all tours"),
          }}
        />
        <Stack.Screen
          name="tour-list"
          options={{
            headerShown: false,
            title: tr("coming soon"),
          }}
        />
        <Stack.Screen
          name="tour/[tourId]/"
          options={{
            title: tr("loading"),
          }}
        />
        <Stack.Screen
          name="host/[projectId]/"
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
          name="search-list"
          options={{
            title: tr("loading"),
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
