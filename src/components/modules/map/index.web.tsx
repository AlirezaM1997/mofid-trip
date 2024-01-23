import { Button, useTheme } from "@rneui/themed";
import * as Location from "expo-location";
import { ExpoLeaflet } from "expo-leaflet";
import { ReactNode, useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { ExpoLeafletProps } from "expo-leaflet/web/src/ExpoLeaflet.types";
import { Feather } from "@expo/vector-icons";

export type MapPropsType = ExpoLeafletProps & {
  lat?: number;
  lng?: number;
  onMoveEnd?: () => { lat: number; lng: number };
  onMarkerClick?: FunctionConstructor;
  centerContent?: ReactNode;
  topLeftContent?: ReactNode;
  topCenterContent?: ReactNode;
  topRightContent?: ReactNode;
  bottomLeftContent?: ReactNode;
  bottomCenterContent?: ReactNode;
  bottomRightContent?: ReactNode;
};

const Map = ({
  lat,
  lng,
  mapMarkers,
  onMoveEnd,
  mapOptions = {},
  zoom = 5,
  topLeftContent = <View></View>,
  topCenterContent = <View></View>,
  centerContent = <View></View>,
  topRightContent = <View></View>,
  bottomLeftContent = <View></View>,
  bottomCenterContent = <View></View>,
  bottomRightContent = <View></View>,
  ...props
}: MapPropsType) => {
  if (!lat && !lng) return;

  const { theme } = useTheme();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [location, setLocation] = useState({ lat: 30, lng: 54 });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        lat: location?.coords?.latitude,
        lng: location?.coords?.latitude,
      });
    })();
  }, []);

  useEffect(() => {
    setLocation({ lat, lng });
    console.log("currentLocation", lat, lng);
  }, [lat, lng]);

  return (
    <>
      <link href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" rel="StyleSheet" />

      <View style={[style.row, style.topRow]}>
        <View>{topLeftContent}</View>
        <View>{topCenterContent}</View>
        <View>{topRightContent}</View>
      </View>
      <View style={[style.center]}>{centerContent}</View>
      <View style={[style.row, style.bottomRow]}>
        <View>
          {bottomLeftContent}
          <Button
            onPress={() =>
              setLocation({
                lat: currentLocation.lat,
                lng: currentLocation.lng,
              })
            }
            buttonStyle={{
              backgroundColor: theme.colors.white,
            }}
            icon={<Feather name="crosshair" size={18} color={theme.colors.black} />}></Button>
        </View>
        <View>{bottomCenterContent}</View>
        <View>{bottomRightContent}</View>
      </View>

      <View style={[style.container, props.style]}>
        <ExpoLeaflet
          zoom={zoom}
          mapCenterPosition={{
            lat: location.lat,
            lng: location.lng,
          }}
          mapMarkers={mapMarkers || []}
          mapLayers={[
            {
              layerType: "TileLayer",
              baseLayerIsChecked: true,
              baseLayerName: "OpenStreetMap",
              url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            },
          ]}
          mapOptions={mapOptions}
          onMessage={message => {
            switch (message.tag) {
              case "onMapMarkerClicked":
                props.onMarkerClick?.(message.mapMarkerId);
                break;
              case "onMapClicked":
                Alert.alert(`Map Touched at:`, `${message.location.lat}, ${message.location.lng}`);
                break;
              case "onMoveEnd":
                onMoveEnd?.(message.mapCenter);

                break;
              default:
                if (["onMove"].includes(message.tag)) {
                  return;
                }
            }
          }}
        />
      </View>
    </>
  );
};
const style = StyleSheet.create({
  container: {
    height: 158,
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  map: {
    zIndex: 1,
    height: 158,
    width: "100%",
  },
  center: {
    zIndex: 1,
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
  },
  row: {
    left: 0,
    zIndex: 1,
    width: "100%",
    display: "flex",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topRow: {
    top: 0,
  },
  bottomRow: {
    bottom: 0,
  },
});

export default Map;
