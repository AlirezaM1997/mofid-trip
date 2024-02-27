import * as Location from "expo-location";
import { ExpoLeaflet } from "expo-leaflet";
import { Button, useTheme } from "@rneui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import { ReactNode, useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Alert, StyleSheet, View, ViewStyle } from "react-native";
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
  currentLocationVisible?: boolean;
  bottomLeftContentStyle?: ViewStyle;
  onMarkerClick?: FunctionConstructor;
  onMoveEnd?: () => { lat: number; lng: number };
};

// @@@@@@@@@@@@@ DON'T REMOVE THIS LINE @@@@@@@@@@@@@@@@@@
// @@@@@@ REMOVING THIS LINE MAKE MAP MARKER HIDDEN @@@@@@
import markerImage from "@assets/image/marker.png";
import locationMarkerImage from "@assets/image/location-marker.png";
import myLocation from "@assets/image/my-location.png";
const a = markerImage;
const b = locationMarkerImage;
const c = myLocation;

const Map = ({
  zoom,
  // lat = 28,
  // lng = 54,
  lat = 34.600773,
  lng = 50.867006,
  onMoveEnd,
  mapMarkers,
  mapOptions = {},
  bottomLeftContentStyle,
  centerContent = <View></View>,
  currentLocationVisible = false,
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
  const isFocused = useIsFocused();
  const [key, setKey] = useState(0);
  const [zoomLevel, setZoom] = useState(zoom || 10);
  const [location, setLocation] = useState<{ lat: number; lng: number }>({ lat, lng });
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number }>();

  const handleCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status === Location.PermissionStatus.DENIED) {
      alert("Permission to access location was denied");
      return;
    }

    try {
      let loc = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        lat: loc?.coords?.latitude,
        lng: loc?.coords?.longitude,
      });
      setLocation({
        lat: loc?.coords?.latitude,
        lng: loc?.coords?.longitude,
      });
      setZoom(18);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLocation({ lat, lng });
  }, [lat, lng]);

  useEffect(() => {
    zoom && setZoom(zoom);
  }, [zoom]);

  const currentLocationIcon = {
    id: "my-location",
    size: [40, 40],
    iconAnchor: [-26, 40],
    position: currentLocation,
    icon: window.location.origin + "/assets/assets/image/my-location.png",
  };

  // this code is because of map will not remount on routing
  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [isFocused]);

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
        <View style={[style.bottomLeftContent, bottomLeftContentStyle]}>
          {bottomLeftContent}
          {currentLocationVisible && (
            <Button
              onPress={handleCurrentLocation}
              buttonStyle={{
                zIndex: 2,
                backgroundColor: theme.colors.white,
              }}
              icon={
                <MaterialIcons name="my-location" size={18} color={theme.colors.black} />
              }></Button>
          )}
        </View>
        <View>{bottomCenterContent}</View>
        <View>{bottomRightContent}</View>
      </View>
      <View key={key} style={[style.container, props.style]}>
        <ExpoLeaflet
          zoom={zoomLevel}
          mapCenterPosition={{
            lat: location?.lat,
            lng: location?.lng,
          }}
          mapMarkers={
            currentLocation && mapMarkers ? [currentLocationIcon, ...mapMarkers] : mapMarkers || []
          }
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
                setZoom(message.zoom);
                setLocation(message.mapCenter);
                onMoveEnd?.(message.bounds, message.mapCenter, message.zoom);
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
    bottom: 24,
    position: "absolute",
  },
});

export default Map;
