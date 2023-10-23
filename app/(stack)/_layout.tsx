import React from "react";
import { Stack } from "expo-router";
import { Feather } from "@expo/vector-icons";
import useIsRtl from "@src/hooks/localization";
import { Button, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { Platform, StyleSheet } from "react-native";
import { navigationRef } from "@src/utils/root-navigation";

const HomeLayout = () => {
  const isRtl = useIsRtl();
  const { theme } = useTheme();
  const { tr } = useTranslation();

  return (
    <Stack
      ref={navigationRef}
      screenOptions={({ navigation }) => ({
        headerTitleAlign: "center",
        contentStyle: { backgroundColor: "#fff" },
        headerLeft: () => (
          <Button
            type="clear"
            onPress={() => (Platform.OS === "web" ? history.back() : navigation.goBack())}
            containerStyle={[{ position: "relative" }, [isRtl ? { right: 0 } : { left: 0 }]]}
            icon={<Feather size={24} name={isRtl ? "arrow-right" : "arrow-left"} color={theme.colors.grey5} />}
          />
        ),
        headerTitleStyle: style.headerTitleStyle(isRtl),
        headerBackTitleStyle: style.headerBackTitleStyle(isRtl),
      })}>
      <Stack.Screen
        name="tour"
        options={{
          title: tr("Tour"),
        }}
      />
      <Stack.Screen
        name="/project/[projectId]"
        options={{
          title: tr("Project"),
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: tr("Login"),
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: tr("Register"),
        }}
      />
      <Stack.Screen
        name="SMS-verification"
        options={{
          title: tr("Verification"),
        }}
      />
      <Stack.Screen
        name="book-accommodation/[projectId]"
        options={{
          title: tr("Book Accommodation"),
        }}
      />
      <Stack.Screen
        name="landing-page"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="pay-detail"
        options={{
          title: tr("Payment Detail"),
        }}
      />
      <Stack.Screen
        name="invoice/[transactionId]"
        options={{
          title: tr("Factor"),
        }}
      />
      <Stack.Screen
        name="edit-profile"
        options={{
          title: tr("Edit Profile"),
        }}
      />
      <Stack.Screen
        name="terms-of-services"
        options={{
          title: tr("Terms of Services"),
        }}
      />
      <Stack.Screen
        name="coming-soon"
        options={{
          title: tr("Coming Soon"),
        }}
      />
    </Stack>
  );
};

export default HomeLayout;

const style = StyleSheet.create({
  headerTitleStyle: (isRtl) => ({
    fontWeight: "400",
    fontFamily: isRtl ? "DanaNoEn" : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  }),
  headerBackTitleStyle: (isRtl) => ({
    fontWeight: "400",
    fontFamily: isRtl ? "DanaNoEn" : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  }),
});
