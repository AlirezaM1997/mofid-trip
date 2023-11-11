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
        contentStyle: { backgroundColor: theme.colors.white },
        headerTitleStyle: Platform.select({
          web: {
            fontFamily:
              'DanaNoEn, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          },
          android: {
            fontFamily: "DanaNoEn",
          },
          ios: {
            fontFamily: "DanaNoEn",
          },
        }),
        headerLeft: () => (
          <Button
            type="clear"
            onPress={() => (Platform.OS === "web" ? history.back() : navigation.goBack())}
            containerStyle={[{ position: "relative" }, [isRtl ? { right: 0 } : { left: 0 }]]}
            icon={
              <Feather
                size={24}
                name={isRtl ? "arrow-right" : "arrow-left"}
                color={theme.colors.grey5}
              />
            }
          />
        ),
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
        name="userLogin"
        options={{
          title: tr("log in, sign up"),
        }}
      />
      <Stack.Screen
        name="ngoLogin"
        options={{
          title: tr("log in, sign up"),
        }}
      />
      <Stack.Screen
        name="SMSVerification"
        options={{
          title: tr("Verification"),
        }}
      />
      <Stack.Screen
        name="/tour/[tourId]"
        options={{
          title: tr("Tour"),
        }}
      />
      <Stack.Screen
        name="tour/[tourId]/reservation/step-1"
        options={{
          title: tr("Tour Reservation"),
        }}
      />
      <Stack.Screen
        name="tour/[tourId]/reservation/step-2"
        options={{
          title: tr("Tour Reservation"),
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
      <Stack.Screen
        name="successPayment"
        options={{
          title: tr("successful payment"),
        }}
      />
      <Stack.Screen
        name="receipt"
        options={{
          title: tr("receipt"),
        }}
      />
      <Stack.Screen
        name="host-owner"
        options={{
          title: tr("Host Owner"),
        }}
      />
      <Stack.Screen
        name="authentication"
        options={{
          title: tr("Authentication"),
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
