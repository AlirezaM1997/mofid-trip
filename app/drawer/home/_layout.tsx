import { Icon } from "@rneui/themed";
import { Tabs } from "expo-router/tabs";
import { Feather } from "@expo/vector-icons";

export default function AppLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="invoices"
        options={{
          tabBarLabel: "Invoices",
          tabBarIcon: () => <Feather name="file" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="receivables"
        options={{
          tabBarLabel: "Receivables",
          tabBarIcon: () => <Feather name="inbox" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: () => <Feather name="home" size={24} />,
        }}
      />
      <Tabs.Screen
        name="vendors"
        options={{
          tabBarLabel: "Vendors",
          tabBarIcon: () => <Feather name="users" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          tabBarLabel: "Inventory",
          tabBarIcon: () => <Feather name="package" size={24} color="black" />,
        }}
      />
    </Tabs>
  );
}
