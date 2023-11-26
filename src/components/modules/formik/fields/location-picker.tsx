import { Image, Text, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { router, useLocalSearchParams } from "expo-router";
import { FieldProps, useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, ViewProps } from "react-native";
import Map from "@modules/map";
import { View } from "react-native";
import { WIDTH } from "@src/constants";

export type LocationPickerProps = FieldProps & ViewProps;

const initLocation = {
  lat: 35.7219,
  lng: 51.3347,
};

const markerHeight = 52;
const markerWidth = 60;
const mapHeight = 200;

const LocationPicker = ({ field, form, ...props }: LocationPickerProps) => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const { lat, lng } = useLocalSearchParams();
  const { setFieldValue } = useFormikContext();
  const isMapOpened = useRef<boolean>();

  const handlePress = () => {
    form.setFieldTouched(field.name, true);
    router.push({
      pathname: "/map-modal",
      params: {
        lat: initLocation.lat,
        lng: initLocation.lng,
      },
    });
    isMapOpened.current = true;
  };

  useEffect(() => {
    if (lat && lng) {
      if (
        Math.abs(parseFloat(lat as string) - initLocation.lat) > 0.001 &&
        Math.abs(parseFloat(lng as string) - initLocation.lng) > 0.001
      ) {
        setFieldValue("lat", parseFloat(lat as string));
        setFieldValue("lng", parseFloat(lng as string));
      }
    }
  }, []);

  return (
    <>
      <Pressable style={styles.container(theme)} onPress={handlePress}>
        {form.values.lat && form.values.lng ? (
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
            <Map lat={form.values.lat} lng={form.values.lng} style={styles.map} />
          </>
        ) : (
          <Text>{tr("Select On Map")}</Text>
        )}
      </Pressable>
      <Text>ERROR</Text>
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
});
export default LocationPicker;
