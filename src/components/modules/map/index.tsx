import React from "react"
import { StyleSheet } from "react-native"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"

const Map = (props) => {
  const INITIAL_POSITION = {
    latitude: props.lat || 32.61963390148454, // به صورت پیش فرض طول و عرض جغرافیای کربلا  ست میشود
    longitude: props.lng || 44.03384346940395,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  return (
    <MapView
      style={styles.map}
      zoomEnabled={false}
      scrollEnabled={false}
      zoomTapEnabled={false}
      zoomControlEnabled={false}
      provider={PROVIDER_GOOGLE}
      initialRegion={INITIAL_POSITION}
      camera={{
        zoom: 13,
        pitch: 13,
        heading: 13,
        center: INITIAL_POSITION,
      }}
    >
      <Marker coordinate={INITIAL_POSITION} />
    </MapView>
  )
}
const styles = StyleSheet.create({
  map: {
    height: 200,
    width: "100%",
  },
})
export default Map
