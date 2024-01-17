import { ReactNode } from "react";
import { ExpoLeaflet } from "expo-leaflet";
import { Alert, StyleSheet, View } from "react-native";
import { ExpoLeafletProps } from "expo-leaflet/web/src/ExpoLeaflet.types";

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
