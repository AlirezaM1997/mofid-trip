import { Redirect, Stack } from "expo-router";

import { useSession } from "@src/context/auth";
import { Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import useDefaultScreenOptions from "@src/hooks/use-default-screen-options";

export default function AppLayout() {
  const { tr } = useTranslation();
  const { session, isLoading } = useSession();
  const defaultScreenOptions = useDefaultScreenOptions();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/reservation" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack
      screenOptions={({ route }) => ({
        headerShown: !["(ngo)", "(user)"].includes(route.name),
        ...defaultScreenOptions,
      })}>
      <Stack.Screen
        name="host/create"
        options={{
          title: tr("Create Host"),
        }}
      />
      <Stack.Screen
        name="host/transaction/add"
        options={{
          title: tr("Host Reservation"),
        }}
      />
      <Stack.Screen
        name="host/transaction/edit"
        options={{
          title: tr("Loading"),
        }}
      />
      <Stack.Screen
        name="host/transaction/index"
        options={{
          title: tr("requests"),
        }}
      />
      <Stack.Screen
        name="host/transaction/[transactionId]"
        options={{
          title: tr("Loading"),
        }}
      />
      <Stack.Screen
        name="host/management/index"
        options={{
          title: tr("Host Management"),
        }}
      />
      <Stack.Screen
        name="host/management/[hostId]"
        options={{
          title: tr("Loading"),
        }}
      />
      <Stack.Screen
        name="host/management/request/index"
        options={{
          title: tr("Loading"),
        }}
      />
      <Stack.Screen
        name="host/management/request/[hostId]"
        options={{
          title: tr("Loading"),
        }}
      />
      <Stack.Screen
        name="edit-profile"
        options={{
          title: tr("Edit Profile"),
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
        name="wallet/deposit"
        options={{
          title: tr("increase balance"),
        }}
      />
      <Stack.Screen
        name="wallet/receipt/paymentStatus"
        options={{
          title: tr("payment status"),
          headerBackButtonMenuEnabled: false,
        }}
      />
      <Stack.Screen
        name="wallet/cards/index"
        options={{
          title: tr("my cards"),
          headerBackButtonMenuEnabled: false,
        }}
      />
      <Stack.Screen
        name="wallet/cards/add/index"
        options={{
          title: tr("add card"),
          headerBackButtonMenuEnabled: false,
        }}
      />
      <Stack.Screen
        name="transactionPaymentStatus"
        options={{
          title: tr("payment status"),
          headerBackButtonMenuEnabled: false,
        }}
      />
      <Stack.Screen
        name="host/transaction/failedReceipt"
        options={{
          title: tr("Unsuccessful Payment"),
        }}
      />
      <Stack.Screen
        name="host/transaction/successReceipt"
        options={{
          title: tr("Success Receipt"),
        }}
      />
    </Stack>
  );
}
