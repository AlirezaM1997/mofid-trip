import { Redirect, Stack } from "expo-router";

import { useSession } from "@src/context/auth";
import { Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import useDefaultScreenOptions from "@src/hooks/use-default-screen-options";
import AccessDenied from "@modules/access-denied";

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
    return <Redirect href="/user-login" />;
  }

  const isNgo = JSON.parse(session).metadata.is_ngo;

  if (!isNgo) return <AccessDenied />;

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="tour/create"
        options={{
          title: tr("Create Tour"),
        }}
      />
      <Stack.Screen
        name="tour/management/index"
        options={{
          title: tr("Tour Management"),
        }}
      />
      <Stack.Screen
        name="tour/management/[tourId]"
        options={{
          title: tr("Loading"),
        }}
      />
      <Stack.Screen
        name="tour/management/request/index"
        options={{
          title: tr("My Tours Requests"),
        }}
      />
      <Stack.Screen
        name="tour/management/request/[tourId]"
        options={{
          title: tr("Loading"),
        }}
      />
    </Stack>
  );
}
