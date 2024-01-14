import { ExpoLeaflet } from "expo-leaflet";
import { ExpoLeafletProps } from "expo-leaflet/web/src/ExpoLeaflet.types";
import { ReactNode } from "react";
import { Alert, StyleSheet, View } from "react-native";

export type MapPropsType = ExpoLeafletProps & {
  lat: number;
  lng: number;
  onMoveEnd?: () => { lat: number; lng: number };
  topLeftContent: ReactNode;
  topCenterContent: ReactNode;
  topRightContent: ReactNode;
  bottomLeftContent: ReactNode;
  bottomCenterContent: ReactNode;
  bottomRightContent: ReactNode;
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
  topRightContent = <View></View>,
  bottomLeftContent = <View></View>,
  bottomCenterContent = <View></View>,
  bottomRightContent = <View></View>,
  ...props
}: MapPropsType) => {
  if (!lat && !lng) return;

  return (
    <>
      <link href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" rel="StyleSheet" />

      <View style={[style.row, style.topRow]}>
        <View>{topLeftContent}</View>
        <View>{topCenterContent}</View>
        <View>{topRightContent}</View>
      </View>
      <View style={[style.row, style.bottomRow]}>
        <View>{bottomLeftContent}</View>
        <View>{bottomCenterContent}</View>
        <View>{bottomRightContent}</View>
      </View>

      <View style={[style.container, props.style]}>
        <ExpoLeaflet
          zoom={zoom}
          mapCenterPosition={{
            lat: lat,
            lng: lng,
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
                Alert.alert(`Map Marker Touched, ID: ${message.mapMarkerId || "unknown"}`);
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
    height: 158,
    width: "100%",
    zIndex: 1,
  },
  row: {
    position: "absolute",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    zIndex: 1,
    left: 0,
    width: "100%",
  },
  topRow: {
    top: 0,
  },
  bottomRow: {
    bottom: 0,
  },
});

export default Map;
