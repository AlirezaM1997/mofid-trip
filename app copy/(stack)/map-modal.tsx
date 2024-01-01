import Map from "@modules/map";
import { HEIGHT, WIDTH } from "@src/constants";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ViewProps } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useRef, useState } from "react";
import BottomButtonLayout from "@components/layout/bottom-button";
import { Button } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";

const initLocation = {
  lat: 35.7219,
  lng: 51.3347,
};

const MapModalScreen = (props: ViewProps) => {
  const { tr } = useTranslation();
  const { lat, lng } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();
  const [location, setLocation] = useState();
  const navigation = useNavigation();
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2]; // -2 because -1 is the current route

  const handleSubmit = () => {
    router.replace({
      pathname: prevRoute.name,
      params: location,
    });
  };

  return (
    <BottomButtonLayout buttons={[<Button onPress={handleSubmit}>{tr("Submit")}</Button>]}>
      <View style={styles.mapMarkerCentered(headerHeight)} />
      <Map
        lat={lat ?? initLocation.lat}
        lng={lng ?? initLocation.lng}
        style={styles.root(headerHeight)}
        onMoveEnd={setLocation}
      />
    </BottomButtonLayout>
  );
};

const styles = StyleSheet.create({
  root: (headerHeight: number) => ({ width: "100%", height: HEIGHT - headerHeight }),
  mapMarkerCentered: (headerHeight: number) => ({
    backgroundImage: `url("https://img.icons8.com/color/48/000000/marker--v1.png")`,
    width: 50,
    height: 50,
    position: "absolute",
    zIndex: 2,
    left: WIDTH / 2 - 25,
    top: HEIGHT / 2 - 25 - headerHeight,
    // transition: "all 0.4s ease",
  }),
});

export default MapModalScreen;
