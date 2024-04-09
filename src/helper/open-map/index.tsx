import { Linking, Platform } from "react-native";

const openMapHandler = (lat, lng) => {
  const scheme = Platform?.select({ ios: "maps://0,0?q=", android: "geo:0,0?q=" });
  const latLng = ` ${lat}, ${lng}`;
  const url = Platform?.select({
    ios: `${scheme}@${latLng}`,
    android: `${scheme}${latLng}`,
  });

  const isAndroid = navigator.userAgent.toLowerCase().includes("android");
  const isIphone = navigator.userAgent.toLowerCase().includes("iphone");

  if (Platform.OS === "web" && (isAndroid || isIphone)) {
    window.open(`geo:0,0?q=${lat},${lng}`, "_blank");
    return;
  }

  if (["windows", "macos", "web"].includes(Platform.OS)) {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(googleMapsUrl, "_blank");
    return;
  }

  Linking?.openURL(url);
};

export default openMapHandler;
