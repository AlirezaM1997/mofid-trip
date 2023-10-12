import { ApolloProvider } from "@apollo/client/main.cjs";
import { ThemeProvider } from "@rneui/themed";
import useApolloClient from "@src/apollo-client";
import { store } from "@src/store";
import { theme } from "@src/theme";
import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

function Content() {
  const apolloClient = useApolloClient();
  
  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <StatusBar style="auto" />
          <Stack
            screenOptions={({ route }) => ({
              headerShown: !["drawer", "index"].includes(route.name),
            })}
          />
        </ThemeProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}

export default function Layout() {

  return (
    <Provider store={store}>
      <Content />
    </Provider>
  );
}
