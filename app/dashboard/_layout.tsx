import { Tabs } from "expo-router/tabs";
import { BottomSheet, Button, Text, useTheme } from "@rneui/themed";
import { Platform, StyleSheet } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import useIsRtl from "@src/hooks/localization";
import useTranslation from "@src/hooks/translation";
import { useEffect, useState } from "react";
import useProjectTable from "@src/hooks/db/project";
import { Redirect, router } from "expo-router";
import ButtonRow from "@modules/button-rows";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import { useSelector } from "react-redux";
import { RootState } from "@src/store";

export default function AppLayout() {
  const [isVisible, setIsVisible] = useState(false);
  const isRtl = useIsRtl();
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { syncTable } = useProjectTable();
  const { loginData, isAuthenticated } = useSelector((state: RootState) => state?.authSlice);

  const handleClose = () => setIsVisible(false);
  const handleOpen = () => setIsVisible(true);

  if (!isAuthenticated || !loginData.metadata.is_ngo) {
    return <Redirect href="/" />;
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
    <>
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
          name="create"
          options={{
            title: tr("Create"),
            tabBarLabel: tr("Create"),
            tabBarIcon: ({ color, size }) => <Feather name="plus" size={size} color={color} />,
          }}
          listeners={() => ({
            tabPress: e => {
              e.preventDefault();
              handleOpen();
            },
          })}
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
          name="profile"
          options={{
            title: tr("Profile"),
            tabBarIcon: ({ color, size }) => <Feather name="user" size={size} color={color} />,
          }}
        />
      </Tabs>
      <BottomSheet isVisible={isVisible} onBackdropPress={handleClose}>
        <Container>
          <Text heading2 bold center>
            {tr("What do you want to create?")}
          </Text>
          <Text center>
            {tr(
              "You can create tours and hosts for your collection. Choose one of the options as needed"
            )}
          </Text>
          <WhiteSpace />
          <ButtonRow>
            <Button onPress={() => router.push("/host/create/details")} type="outline">
              {tr("Create Host")}
            </Button>
            <Button onPress={() => router.push("/tour/create")}>{tr("Create Tour")}</Button>
          </ButtonRow>
        </Container>
      </BottomSheet>
    </>
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
