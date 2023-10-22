import { ExpoLeaflet } from "expo-leaflet";
import { Alert, StyleSheet, View } from "react-native";

type MapPropsType = {
  lat: number;
  lng: number;
};

const Map = ({ lat, lng }: MapPropsType) => {
  return (
    <>
      <link href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" rel="StyleSheet" />
      <View style={style.container}>
        <ExpoLeaflet
          zoom={14}
          maxZoom={14}
          zoomControl={false}
          mapCenterPosition={{
            lat: lat,
            lng: lng,
          }}
          mapMarkers={[
            {
              id: "1",
              size: [32, 32],
              position: { lat: lat, lng: lng },
              icon: `<svg width="70" height="71" viewBox="0 0 70 71" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse opacity="0.2" cx="34.7964" cy="35.3016" rx="34.2046" ry="34.85" fill="#FF4332"/><g filter="url(#filter0_f_862_33002)"><circle cx="35.0555" cy="34.9154" r="10.2117" fill="#FF4332"/></g><path d="M51.6491 34.9168C51.6491 44.0815 44.2197 51.5109 35.055 51.5109C25.8904 51.5109 18.4609 44.0815 18.4609 34.9168C18.4609 25.7522 25.8904 18.3228 35.055 18.3228C44.2197 18.3228 51.6491 25.7522 51.6491 34.9168Z" fill="white"/><circle cx="35.0388" cy="34.9155" r="14.6794" fill="#FF4332"/><path d="M40.4057 32.2446L36.4367 29.0694C35.6611 28.4513 34.4492 28.4452 33.6796 29.0633L29.7106 32.2446C29.141 32.6991 28.7956 33.608 28.9167 34.323L29.6803 38.892C29.856 39.9161 30.8073 40.722 31.8435 40.722H38.2667C39.2908 40.722 40.2603 39.8979 40.436 38.8859L41.1995 34.317C41.3086 33.608 40.9632 32.6991 40.4057 32.2446ZM35.5096 38.2981C35.5096 38.5466 35.3036 38.7526 35.0551 38.7526C34.8067 38.7526 34.6006 38.5466 34.6006 38.2981V36.4803C34.6006 36.2318 34.8067 36.0258 35.0551 36.0258C35.3036 36.0258 35.5096 36.2318 35.5096 36.4803V38.2981Z" fill="white"/><defs><filter id="filter0_f_862_33002" x="9.52534" y="9.3852" width="51.0606" height="51.0604" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="7.65921" result="effect1_foregroundBlur_862_33002"/></filter></defs></svg>`,
            },
          ]}
          mapLayers={[
            {
              layerType: "TileLayer",
              baseLayerIsChecked: true,
              baseLayerName: "OpenStreetMap",
              url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
              attribution: '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            },
            {
              baseLayer: true,
              layerType: "TileLayer",
              baseLayerName: "Mapbox",
              baseLayerIsChecked: true,
              url: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2hlcmVzbXl3YXZlcyIsImEiOiJjanJ6cGZtd24xYmU0M3lxcmVhMDR2dWlqIn0.QQSWbd-riqn1U5ppmyQjRw`,
            },
          ]}
          onMessage={(message) => {
            switch (message.tag) {
              case "onMapMarkerClicked":
                Alert.alert(`Map Marker Touched, ID: ${message.mapMarkerId || "unknown"}`);
                break;
              case "onMapClicked":
                Alert.alert(`Map Touched at:`, `${message.location.lat}, ${message.location.lng}`);
                break;
              // case "onMoveEnd":
              //   setMapCenterPosition(message.mapCenter);
              //   break;
              // case "onZoomEnd":
              //   setZoom(message.zoom);
              //   break;
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
  container: { height: 200 },
});

export default Map;
