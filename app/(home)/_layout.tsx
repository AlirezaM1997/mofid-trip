import { Tabs } from "expo-router/tabs";
import { useTheme } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import useIsRtl from "@src/hooks/localization";
import useTranslation from "@src/hooks/translation";

export default function AppLayout() {
  const isRtl = useIsRtl();
  const { theme } = useTheme();
  const { tr } = useTranslation();

  return (
    <Tabs
      initialRouteName="index"
      sceneContainerStyle={{ backgroundColor: "#fff" }}
      screenOptions={{
        tabBarStyle: style.tabBarStyle,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarLabelStyle: style.tabBarLabelStyle(isRtl),
        headerTitleStyle: style.headerTitleStyle(isRtl),
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: tr("Home"),
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: tr("Search"),
          tabBarIcon: ({ color, size }) => <Feather name="search" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="reservation"
        getId={() => Date.now().toString()}
        options={{
          title: tr("Reservation"),
          tabBarIcon: ({ color, size }) => <Feather name="bookmark" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        getId={() => Date.now().toString()}
        options={{
          title: tr("Profile"),
          tabBarIcon: ({ color, size }) => <Feather name="user" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const style = StyleSheet.create({
  tabBarStyle: {
    paddingBottom: 5,
    height: 55,
  },
  tabBarLabelStyle: (isRtl) => ({
    fontWeight: "400",
    fontFamily: isRtl ? "DanaNoEn" : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  }),
  headerTitleStyle: (isRtl) => ({
    fontWeight: "400",
    fontFamily: isRtl ? "DanaNoEn" : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  }),
});
