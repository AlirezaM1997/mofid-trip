import { Chip } from "@rneui/themed";
import { RootState } from "@src/store";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

const TourFacilities = () => {
  const { tourDetail } = useSelector((state: RootState) => state.tourSlice);

  return (
    <View style={style.container}>
      {tourDetail?.facilities?.map((facility, index) => {
        return (
          <Chip
            key={index}
            title={facility.enName}
            type="outline"
            buttonStyle={style.buttonStyle}
            titleStyle={style.titleStyle}
            containerStyle={style.containerStyle}
          />
        );
      })}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  buttonStyle: {
    borderRadius: 5,
    backgroundColor: "#F3F3F3",
    borderWidth: 0,
  },
  titleStyle: { color: "#101010" },
  containerStyle: {
    borderRadius: 0,
  },
});

export default TourFacilities;
