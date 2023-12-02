import { useEffect } from "react";
import { Redirect } from "expo-router";
import { RootState } from "@src/store";
import { Tabs } from "expo-router/tabs";
import { useSelector } from "react-redux";
import { Feather, Ionicons } from "@expo/vector-icons";
import useIsRtl from "@src/hooks/localization";
import { Button, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import useProjectTable from "@src/hooks/db/project";
import { Platform, StyleSheet } from "react-native";

export default function AppLayout() {
  const isRtl = useIsRtl();
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { syncTable } = useProjectTable();
  const { loginData, isAuthenticated } = useSelector((state: RootState) => state?.authSlice);

  if (isAuthenticated && loginData.metadata.isNgo) {
    return <Redirect href="/dashboard" />;
  }

  useEffect(() => {
    syncTable({
      page: {
        pageNumber: 1,
        pageSize: 99999998,
      },
    });
  }, []);

  return (
    <Tabs
      initialRouteName="index"
      sceneContainerStyle={{ backgroundColor: theme.colors.white }}
      screenOptions={({ navigation }) => ({
        tabBarStyle: style.tabBarStyle,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarLabelStyle: style.tabBarLabelStyle(isRtl),
        headerTitleStyle: style.headerTitleStyle(isRtl),
        headerTitleAlign: "center",
        headerShown: false,
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
      <Tabs.Screen
        name="index"
        options={{
          title: tr("Home"),
          tabBarLabel: tr("Home"),
          tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: tr("chat"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox-ellipses-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reservation"
        options={{
          title: tr("My requests"),
          tabBarIcon: ({ color, size }) => <Feather name="bookmark" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
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
  tabBarLabelStyle: isRtl => ({
    fontWeight: "400",
    fontFamily: isRtl
      ? "DanaNoEn"
      : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  }),
  headerTitleStyle: isRtl => ({
    fontWeight: "400",
    fontFamily: isRtl
      ? "DanaNoEn"
      : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  }),
});
