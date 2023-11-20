import { ExpoLeaflet } from "expo-leaflet";
import { Alert, StyleSheet, View, ViewProps } from "react-native";

type MapPropsType = ViewProps & {
  lat: number;
  lng: number;
  mapMarkers?: {
    id: string;
    size: [number, number];
    position: { lat: number; lng: number };
    icon: string;
  }[];
  onMoveEnd?: () => { lat: number; lng: number };
};

const Map = ({ lat, lng, mapMarkers, onMoveEnd, ...props }: MapPropsType) => {
  if (!lat && !lng) return;
  return (
    <>
      <link href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" rel="StyleSheet" />
      <View style={[style.container, props.style]}>
        <ExpoLeaflet
          zoom={14}
          maxZoom={14}
          zoomControl={false}
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
              attribution:
                '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            },
            {
              baseLayer: true,
              layerType: "TileLayer",
              baseLayerName: "Mapbox",
              baseLayerIsChecked: true,
              url: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2hlcmVzbXl3YXZlcyIsImEiOiJjanJ6cGZtd24xYmU0M3lxcmVhMDR2dWlqIn0.QQSWbd-riqn1U5ppmyQjRw`,
            },
          ]}
          // mapOptions={{
          //   dragging: false,
          // }}
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
    position: "relative",
  },
  map: {
    height: 280,
    zIndex: 1,
  },
});

export default Map;
