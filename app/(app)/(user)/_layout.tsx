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

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/user-login" />;
  }

  const isNgo = JSON.parse(session).metadata.is_ngo;

  if (isNgo) return <AccessDenied />;

  return (
    <Stack screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="tour/[tourId]/reservation/add/step-1"
        options={{
          title: tr("tour reservation"),
        }}
      />
      <Stack.Screen
        name="tour/[tourId]/reservation/add/step-2"
        options={{
          title: tr("tour reservation"),
        }}
      />
      <Stack.Screen
        name="tour/[tourId]/reservation/edit/step-1"
        options={{
          title: tr("tour reservation"),
        }}
      />
      <Stack.Screen
        name="tour/[tourId]/reservation/edit/step-2"
        options={{
          title: tr("tour reservation"),
        }}
      />
      <Stack.Screen
        name="tour/transaction/detail/[transactionId]"
        options={{
          title: tr("loading"),
        }}
      />
    </Stack>
  );
}
