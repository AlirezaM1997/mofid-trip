import React from "react";
import { useLocalSearchParams } from "expo-router";
import { WebView as ReactNAtiveWebView } from "react-native-webview";

const WebView = () => {
  const params = useLocalSearchParams();

  return <ReactNAtiveWebView source={{ uri: params.url }} />;
};

export default WebView