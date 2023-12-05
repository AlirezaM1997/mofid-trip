import React from "react";
import useIsRtl from "@src/hooks/localization";
import useTranslation from "@src/hooks/translation";
import { Stack } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Button, useTheme } from "@rneui/themed";
import { Platform } from "react-native";
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
        name="wallet/index"
        options={{
          title: tr("Wallet"),
        }}
      />
      <Stack.Screen
        name="wallet/history"
        options={{
          title: tr("Transaction History"),
        }}
      />
      <Stack.Screen
        name="/host/[projectId]"
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
        name="tour/requests/toMyTours"
        options={{
          title: tr("apply to my tours"),
        }}
      />
      <Stack.Screen
        name="ngoLogin"
        options={{
          title: tr("log in, sign up"),
        }}
      />
      <Stack.Screen
        name="wallet/deposit"
        options={{
          title: tr("increase balance"),
        }}
      />
      <Stack.Screen
        name="SMSVerification"
        options={{
          title: tr("Verification"),
        }}
      />
      <Stack.Screen
        name="host/create/details"
        options={{
          title: tr("Host Details"),
        }}
      />
      <Stack.Screen
        name="host/create/host-type"
        options={{
          title: tr("Host Type"),
        }}
      />
      <Stack.Screen
        name="host/create/address"
        options={{
          title: tr("Host Address"),
        }}
      />
      <Stack.Screen
        name="host/create/capacity"
        options={{
          title: tr("Host Capacity"),
        }}
      />
      <Stack.Screen
        name="host/create/date"
        options={{
          title: tr("Host Date"),
        }}
      />
      <Stack.Screen
        name="host/create/price"
        options={{
          title: tr("Host Price"),
        }}
      />
      <Stack.Screen
        name="host/create/images"
        options={{
          title: tr("Host Images"),
        }}
      />
      <Stack.Screen
        name="host/create/facilities"
        options={{
          title: tr("Host Facilities"),
        }}
      />
      <Stack.Screen
        name="host/transaction/index"
        options={{
          title: tr("my requests"),
        }}
      />
      <Stack.Screen
        name="host/transaction/add/capacity"
        options={{
          title: tr("Host Reservation"),
        }}
      />
      <Stack.Screen
        name="host/transaction/add/date"
        options={{
          title: tr("Host Reservation"),
        }}
      />
      <Stack.Screen
        name="host/transaction/add/confirm-data"
        options={{
          title: tr("Final Details"),
        }}
      />
      <Stack.Screen
        name="host/management"
        options={{
          title: tr("Host Management"),
        }}
      />
      <Stack.Screen
        name="tour/create/details"
        options={{
          title: tr("Tour Details"),
        }}
      />
      <Stack.Screen
        name="tour/create/capacity"
        options={{
          title: tr("Tour Capacity"),
        }}
      />
      <Stack.Screen
        name="tour/create/origin"
        options={{
          title: tr("Tour Origin"),
        }}
      />
      <Stack.Screen
        name="tour/create/destination"
        options={{
          title: tr("Tour Destination"),
        }}
      />
      <Stack.Screen
        name="tour/create/date"
        options={{
          title: tr("Tour Date"),
        }}
      />
      <Stack.Screen
        name="tour/create/price"
        options={{
          title: tr("Tour Price"),
        }}
      />
      <Stack.Screen
        name="tour/create/images"
        options={{
          title: tr("Tour Images"),
        }}
      />
      <Stack.Screen
        name="tour/create/facilities"
        options={{
          title: tr("Tour Facilities"),
        }}
      />
      <Stack.Screen
        name="/tour/[tourId]"
        options={{
          title: tr("Tour"),
        }}
      />
      <Stack.Screen
        name="tour/management/index"
        options={{
          title: tr("Tour Management"),
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
        name="host/transaction/detail/[transactionId]"
        options={{
          title: tr("Payment Detail"),
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
        name="tour/transaction/detail/[transactionId]"
        options={{
          title: tr("Tour Transaction Detail"),
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
        name="comingSoon"
        options={{
          title: tr("Coming Soon"),
        }}
      />
      <Stack.Screen
        name="transactionPaymentStatus"
        options={{
          headerLeft: () => null,
          title: tr("payment status"),
          headerBackButtonMenuEnabled: false,
        }}
      />
      <Stack.Screen
        name="wallet/receipt/paymentStatus"
        options={{
          headerLeft: () => null,
          title: tr("payment status"),
          headerBackButtonMenuEnabled: false,
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
      <Stack.Screen
        name="tour/transaction/failedReceipt"
        options={{
          title: tr("Unsuccessful Payment"),
        }}
      />
      <Stack.Screen
        name="host/transaction/failedReceipt"
        options={{
          title: tr("Unsuccessful Payment"),
        }}
      />
      <Stack.Screen
        name="tour/transaction/successReceipt"
        options={{
          title: tr("Success Receipt"),
        }}
      />
      <Stack.Screen
        name="host/transaction/successReceipt"
        options={{
          title: tr("Success Receipt"),
        }}
      />
      <Stack.Screen
        name="map-modal"
        options={{
          title: tr("Select On Map"),
          presentation: "modal",
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
