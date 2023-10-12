import { Button, Text } from "@rneui/themed";
import { router } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <Button color="secondary" onPress={() => router.push("drawer")}>
      opening app as logged in user
    </Button>
    <Button onPress={() => router.push("login")}>simulate login page</Button>
  </SafeAreaView>
);
export default Index;
