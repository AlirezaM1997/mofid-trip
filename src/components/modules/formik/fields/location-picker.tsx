import { BottomSheet, Button, Image, Text, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { FieldProps, useFormikContext } from "formik";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, ViewProps } from "react-native";
import Map from "@modules/map";
import { View } from "react-native";
import { HEIGHT, WIDTH } from "@src/constants";
import { useIsFocused } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import Container from "@atoms/container";

export type LocationPickerProps = FieldProps & ViewProps;

const MemoizedMap = memo(({ lat, lng, style, onMoveEnd }) => {
  return (
    <Map
      lat={lat ?? initLocation?.lat}
      lng={lng ?? initLocation?.lng}
      style={style}
      onMoveEnd={onMoveEnd}
    />
  );
});

const markerHeight = 52;
const markerWidth = 60;
const mapHeight = 200;

const LocationPicker = ({ field, form, ...props }: LocationPickerProps) => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const { setFieldValue } = useFormikContext();
  const isMapOpened = useRef<boolean>();
  const [location, setLocation] = useState();
  const [isVisible, setIsVisible] = useState();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

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
    setFieldTouched("origin.lat", true);
    setFieldTouched("origin.lng", true);
    handleOpen();
    isMapOpened.current = true;
  };

  useEffect(() => {
    if (location?.lat) {
      setLat(location.lat);
      setLng(location.lng);
    }
  }, [location]);

  const handleSubmit = () => {
    setFieldValue("origin.lat", lat);
    setFieldValue("origin.lng", lng);
    handleClose();
  };

  return (
    <>
      <Pressable style={styles.container(theme)} onPress={handlePress}>
        {form?.values?.origin?.lat && form?.values?.origin?.lng ? (
          <>
            <Image
              containerStyle={{
                width: 52,
                height: 60,
                position: "absolute",
                zIndex: 1,
                top: mapHeight / 2 - markerWidth / 2 - 40,
                left: WIDTH / 2 - markerHeight / 2 - 26,
              }}
              source={require("@assets/image/marker.png")}
            />
            <MemoizedMap
              lat={form.values.origin.lat}
              lng={form.values.origin.lng}
              style={styles.map}
            />
          </>
        ) : (
          <Text>{tr("Select On Map")}</Text>
        )}
      </Pressable>
      <Text type="error">{form.touched[field.name] && form.errors[field.name]}</Text>

      <BottomSheet
        isVisible={isVisible}
        onBackdropPress={handleClose}
        containerStyle={{
          height: HEIGHT,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          backgroundColor: "red",
          display: "flex",
          justifyContent: "center",
        }}>
        <View
          style={{
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
          }}>
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
          lat={initLocation.lat}
          lng={initLocation.lng}
          style={styles.root}
          onMoveEnd={setLocation}
        />
        <Container
          style={{
            position: "absolute",
            bottom: 0,
            backgroundColor: "#fff",
            width: "100%",
            paddingVertical: 12,
          }}>
          <Button onPress={handleSubmit}>انتخاب</Button>
        </Container>
      </BottomSheet>
    </>
  );
};
const styles = StyleSheet.create({
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
  root: { width: "100%", height: HEIGHT },
  mapMarkerCentered: {
    backgroundImage: `url("https://img.icons8.com/color/48/000000/marker--v1.png")`,
    width: 50,
    height: 50,
    position: "absolute",
    zIndex: 2,
    left: WIDTH / 2 - 25,
    top: HEIGHT / 2 - 25,
    // transition: "all 0.4s ease",
  },
});
export default LocationPicker;
