import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { WebView as ReactNativeWebview } from "react-native-webview";

interface WebViewProps {
  uri: string;
  onMessage?: () => void;
  onLoad?: () => void;
}

const WebView: React.FC = ({ uri, onMessage, onLoad }: WebViewProps) => {
  if (Platform.OS !== "web") {
    return (
      <View style={style.container}>
        <ReactNativeWebview
          onLoad={onLoad}
          onMessage={onMessage}
          source={{ uri: uri }}
        />
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <iframe style={{ height: "100%" }} src={uri} />
      </View>
    );
  }
};

WebView.defaultProps = {
  onMessage: () => {},
  onLoad: () => {},
};

const style = StyleSheet.create({
  container: { flex: 1 },
});

export default WebView;
