import Container from "@atoms/container";
import { Feather } from "@expo/vector-icons";
import Map, { MapPropsType } from "@modules/map/index.web";
import { BottomSheet, Button, Text, useTheme } from "@rneui/themed";
import { HEIGHT, WIDTH } from "@src/constants";
import useTranslation from "@src/hooks/translation";
import { FieldProps, useFormikContext } from "formik";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, View, ViewProps } from "react-native";
import * as Location from "expo-location";

export type LocationPickerProps = FieldProps & ViewProps;

const MemoizedMapWithoutDragging = memo(
  ({ style, onMoveEnd, lat = 35.7429943, lng = 51.3505697 }: MapPropsType) => {
    const la = lat ?? initLocation?.lat;
    const ln = lng ?? initLocation?.lng;
    return (
      <Map
        lat={la}
        lng={ln}
        style={style}
        onMoveEnd={onMoveEnd}
        mapOptions={{ dragging: false, zoomControl: false }}
        mapMarkers={
          lat !== 35.7429943 && lng !== 51.3505697
            ? [
                {
                  id: "string",
                  position: { lat: la, lng: ln },
                  size: [52, 60],
                  icon: window.location.origin + "/assets/image/marker.png",
                  iconAnchor: [-26, 60],
                },
              ]
            : []
        }
      />
    );
  }
);

const MemoizedMap = memo(
  ({ style, onMoveEnd, bottomRightContent, lat = 35.7429943, lng = 51.3505697 }: MapPropsType) => {
    const la = lat ?? initLocation?.lat;
    const ln = lng ?? initLocation?.lng;
    return (
      <Map
        lat={la}
        lng={ln}
        style={style}
        onMoveEnd={onMoveEnd}
        mapOptions={{ zoomControl: false }}
        bottomRightContent={bottomRightContent}
      />
    );
  }
);

const mapHeight = 200;

const LocationPicker = ({ latName, lngName, field, form, ...props }: LocationPickerProps) => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const { setFieldValue, touched, errors, getFieldProps } = useFormikContext();
  const isMapOpened = useRef<boolean>();
  const [location, setLocation] = useState();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isVisible, setIsVisible] = useState();

  const latFieldProps = getFieldProps(latName);
  const lngFieldProps = getFieldProps(lngName);

  const { setFieldTouched } = useFormikContext();

  const handleOpen = () => setIsVisible(true);
  const handleClose = () => setIsVisible(false);

  const initLocation = useMemo(
    () => ({
      lat: 35.7219,
      lng: 51.3347,
    }),
    []
  );

  const handlePress = () => {
    setFieldTouched(latName, true);
    setFieldTouched(lngName, true);
    handleOpen();
    isMapOpened.current = true;
  };

  const handleSubmit = () => {
    setFieldValue(latName, location?.lat);
    setFieldValue(lngName, location?.lng);
    handleClose();
  };

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

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const MemoizedCurrentLocation = useMemo(
    () => (
      <Button
        onPress={() => {
          setLocation({
            lat: currentLocation?.coords?.latitude,
            lng: currentLocation?.coords?.longitude,
          });
        }}
        buttonStyle={{
          backgroundColor: theme.colors.white,
        }}
        icon={<Feather name="crosshair" size={24} color={theme.colors.black} />}
        style={{ marginBottom: 70, padding: 10 }}></Button>
    ),
    []
  );

  return (
    <>
      <Pressable style={styles.container(theme)} onPress={handlePress}>
        {latFieldProps.value && lngFieldProps.value ? (
          <MemoizedMapWithoutDragging
            lat={latFieldProps.value}
            lng={lngFieldProps.value}
            style={styles.map}
          />
        ) : (
          <View style={styles.nullMap}>
            <Text center style={styles.selectText}>
              {tr("Select On Map")}
            </Text>
            <View style={styles.mapMask(theme)}></View>
            <MemoizedMapWithoutDragging style={styles.map} />
          </View>
        )}
      </Pressable>
      <Text type="error">{touched[latName] && errors[latName]}</Text>

      <BottomSheet
        isVisible={isVisible}
        onBackdropPress={handleClose}
        containerStyle={styles.bottomSheetContainerStyle}>
        <View style={styles.header}>
          <View style={{ opacity: 0 }}>
            <Feather name="x-circle" size={24} color="black" />
          </View>
          <Text heading1>انتخاب از روی نقشه</Text>
          <Pressable onPress={handleClose}>
            <Feather name="x-circle" size={24} color="black" />
          </Pressable>
        </View>
        <View style={styles.mapMarkerCentered} />
        <MemoizedMap
          lat={location?.lat ? location.lat : initLocation.lat}
          lng={location?.lng ? location.lng : initLocation.lng}
          style={styles.root}
          onMoveEnd={setLocation}
          bottomRightContent={MemoizedCurrentLocation}
        />
        <Container style={styles.mapContainer}>
          <Button onPress={handleSubmit}>انتخاب</Button>
        </Container>
      </BottomSheet>
    </>
  );
};
const styles = StyleSheet.create({
  root: { width: "100%", height: HEIGHT },
  header: {
    position: "absolute",
    top: 0,
    zIndex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: 55,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 12,
  },
  container: theme => ({
    width: "100%",
    height: mapHeight,
    borderColor: theme.colors.black,
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  map: {
    width: "100%",
    height: "100%",
  },
  mapMask: theme => ({
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.white,
    opacity: 0.5,
    zIndex: 1,
    position: "absolute",
  }),
  mapMarkerCentered: {
    backgroundImage: `url(${window.location.origin + "/assets/image/marker.png"})`,
    width: 52,
    height: 60,
    position: "absolute",
    zIndex: 2,
    left: WIDTH / 2 - 26,
    top: HEIGHT / 2 - 30,
  },
  selectText: {
    opacity: 1,
    zIndex: 2,
    position: "absolute",
    top: "45%",
    right: WIDTH / 2 - 90,
  },
  mapContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    width: "100%",
    paddingVertical: 12,
    zIndex: 3,
  },
  bottomSheetContainerStyle: {
    height: HEIGHT,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    display: "flex",
    justifyContent: "center",
  },
  nullMap: { width: "100%", height: "100%" },
});
export default LocationPicker;
