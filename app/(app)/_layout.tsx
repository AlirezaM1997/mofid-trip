import { Redirect, Stack, router, useNavigation, usePathname } from "expo-router";

import { useSession } from "@src/context/auth";
import { Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import useDefaultScreenOptions from "@src/hooks/use-default-screen-options";
import { useURL } from "expo-linking";
import { useDispatch } from "react-redux";
import { setRedirectToScreenAfterLogin } from "@src/slice/navigation-slice";

export default function AppLayout() {
  const { tr } = useTranslation();
  const { session, isLoading } = useSession();
  const defaultScreenOptions = useDefaultScreenOptions();
  const routeName = usePathname();
  const dispatch = useDispatch();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    // TODO: use param solution instead redux to handling redirection route name
    dispatch(setRedirectToScreenAfterLogin(routeName));
    return <Redirect href="/user-login" />;
  } else if (session) {
    const { firstname, lastname, is_ngo, title } = JSON.parse(session).metadata;
    if (is_ngo && !title) {
      dispatch(setRedirectToScreenAfterLogin(routeName));
      return <Redirect href="/login-details-ngo" />;
    } else if (!is_ngo && !firstname && !lastname) {
      dispatch(setRedirectToScreenAfterLogin(routeName));
      return <Redirect href="/login-details" />;
    }
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
        name="tour/transaction/detail/[transactionId]"
        options={{
          title: tr("loading"),
        }}
      />
      <Stack.Screen
        name="host/[hostId]/comment/[commentId]"
        options={{
          title: tr("loading"),
        }}
      />
      <Stack.Screen
        name="host/[hostId]/comment"
        options={{
          title: tr("loading"),
        }}
      />
      <Stack.Screen
        name="tour/[tourId]/comment/[commentId]"
        options={{
          title: tr("loading"),
        }}
      />
      <Stack.Screen
        name="tour/[tourId]/comment"
        options={{
          title: tr("loading"),
        }}
      />
      <Stack.Screen
        name="tour/transaction/successReceipt"
        options={{
          title: tr("success receipt"),
        }}
      />
      <Stack.Screen
        name="tour/transaction/failedReceipt"
        options={{
          title: tr("failed receipt"),
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
        name="host/management/edit/index"
        options={{
          title: tr("edit host"),
        }}
      />
      <Stack.Screen
        name="wallet/withdraw"
        options={{
          title: tr("withdraw"),
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
        name="wallet/cards/edit/[cardId]"
        options={{
          title: tr("edit card"),
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
