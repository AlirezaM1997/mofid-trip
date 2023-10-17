import { Drawer } from "expo-router/drawer";
import { Feather } from "@expo/vector-icons";
import { getDrawerContent } from "@src/helper/layout";

export default function Layout() {
  return (
    <Drawer drawerContent={getDrawerContent}>
      <Drawer.Screen
        name="home"
        options={{
          headerTitle: "Mofid Trip",
          title: "Mofid Trip",
          drawerIcon: () => <Feather name="home" size={24} color="black" />,
        }}
      />
      <Drawer.Screen
        name="invoice-setting"
        options={{
          title: "Invoice Setting",
          drawerIcon: () => <Feather name="settings" size={24} color="black" />,
        }}
      />
      <Drawer.Screen
        name="profile-setting"
        options={{
          title: "Profile Setting",
          drawerIcon: () => <Feather name="user" size={24} color="black" />,
        }}
      />
      <Drawer.Screen
        name="notification-setting"
        options={{
          title: "Notification Setting",
          drawerIcon: () => <Feather name="bell" size={24} color="black" />,
        }}
      />
      <Drawer.Screen
        name="receivables"
        options={{
          title: "Receivables",
          drawerIcon: () => <Feather name="inbox" size={24} color="black" />,
        }}
      />
      <Drawer.Screen
        name="reports"
        options={{
          title: "Reports",
          drawerIcon: () => <Feather name="pie-chart" size={24} color="black" />,
        }}
      />
      <Drawer.Screen
        name="help"
        options={{
          title: "Help",
          drawerIcon: () => <Feather name="help-circle" size={24} color="black" />,
        }}
      />
      <Drawer.Screen
        name="subscription"
        options={{
          title: "Subscription",
          drawerIcon: () => <Feather name="bookmark" size={24} color="black" />,
        }}
      />
      <Drawer.Screen
        name="privacy-policy"
        options={{
          title: "Privacy Policy",
          drawerIcon: () => <Feather name="shield" size={24} color="black" />,
        }}
      />

      <Drawer.Screen
        name="docs"
        options={{
          title: "Docs",
          drawerIcon: () => <Feather name="book-open" size={24} color="black" />,
        }}
      />
      <Drawer.Screen
        name="kit"
        options={{
          title: "Kit",
          drawerIcon: () => <Feather name="book-open" size={24} color="black" />,
        }}
      />
    </Drawer>
  );
}
