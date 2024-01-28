import * as Location from "expo-location";
import { ExpoLeaflet } from "expo-leaflet";
import { Button, useTheme } from "@rneui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import { ReactNode, useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { ExpoLeafletProps } from "expo-leaflet/web/src/ExpoLeaflet.types";

export type MapPropsType = ExpoLeafletProps & {
  lat?: number;
  lng?: number;
  centerContent?: ReactNode;
  topLeftContent?: ReactNode;
  topRightContent?: ReactNode;
  topCenterContent?: ReactNode;
  bottomLeftContent?: ReactNode;
  bottomRightContent?: ReactNode;
  bottomCenterContent?: ReactNode;
  onMarkerClick?: FunctionConstructor;
  onMoveEnd?: () => { lat: number; lng: number };
};

const Map = ({
  lat = 30,
  lng = 54,
  zoom = 5,
  onMoveEnd,
  mapMarkers,
  mapOptions = {},
  centerContent = <View></View>,
  topLeftContent = <View></View>,
  topRightContent = <View></View>,
  topCenterContent = <View></View>,
  bottomLeftContent = <View></View>,
  bottomRightContent = <View></View>,
  bottomCenterContent = <View></View>,
  ...props
}: MapPropsType) => {
  if (!lat && !lng) return;

  const { theme } = useTheme();
  const [location, setLocation] = useState<{ lat: number; lng: number }>({ lat, lng });

  const handleCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status === Location.PermissionStatus.DENIED) {
      alert("Permission to access location was denied");
      return;
    }

    try {
      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        lat: loc?.coords?.latitude,
        lng: loc?.coords?.longitude,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLocation({ lat, lng });
  }, [lat, lng]);

  return (
    <>
      <link href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" rel="StyleSheet" />

      <View style={[style.row, style.topRow]}>
        <View>{topLeftContent}</View>
        <View>{topCenterContent}</View>
        <View>{topRightContent}</View>
      </View>

      <View style={style.center}>{centerContent}</View>

      <View style={[style.row, style.bottomRow]}>
        <View style={style.bottomLeftContent}>
          {bottomLeftContent}
          <Button
            onPress={handleCurrentLocation}
            buttonStyle={{
              backgroundColor: theme.colors.white,
            }}
            icon={
              <MaterialIcons name="my-location" size={18} color={theme.colors.black} />
            }></Button>
        </View>
        <View>{bottomCenterContent}</View>
        <View>{bottomRightContent}</View>
      </View>

      <View style={[style.container, props.style]}>
        <ExpoLeaflet
          zoom={zoom}
          mapCenterPosition={{
            lat: location?.lat,
            lng: location?.lng,
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
                onMoveEnd?.(message.bounds);
                setLocation(message.mapCenter);
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
    top: "50%",
    left: "50%",
    position: "absolute",
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
  bottomLeftContent: {
    right: 24,
    zIndex: 1000,
    position: "absolute",
  },
});

export default Map;
