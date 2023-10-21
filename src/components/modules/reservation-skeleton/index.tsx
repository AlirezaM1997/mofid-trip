import React from "react";
import { StyleSheet, View } from "react-native";
import { Skeleton, useTheme } from "@rneui/themed";

function ReservationSkeleton({ fullWidth }) {
  const { theme } = useTheme();
  return (
    <View style={style.container}>
      <View style={style.headerContainer}>
        <View style={style.imageContainer}>
          <Skeleton
            animation="wave"
            width={144}
            height={88}
            style={style.skeletonBox}
          />
        </View>
        <View style={style.infoContainer}>
          <Skeleton
            animation="wave"
            width={185}
            height={16}
            style={style.skeletonBox}
          />
          <Skeleton
            animation="wave"
            width={185}
            height={16}
            style={style.skeletonBox}
          />
          <Skeleton
            animation="wave"
            width={185}
            height={16}
            style={style.skeletonBox}
          />
          <Skeleton
            animation="wave"
            width={185}
            height={16}
            style={style.skeletonBox}
          />
        </View>
      </View>

      <View style={style.stepperContainer}>
        <View style={style.stepperText}>
          <Skeleton
            circle
            animation="wave"
            width={32}
            height={32}
          />
          <Skeleton
            animation="wave"
            width={64}
            height={16}
          />
        </View>
        <View style={style.stepperText}>
          <Skeleton
            circle
            animation="wave"
            width={32}
            height={32}
          />
          <Skeleton
            animation="wave"
            width={64}
            height={16}
          />
        </View>
        <View style={style.stepperText}>
          <Skeleton
            circle
            animation="wave"
            width={32}
            height={32}
          />
          <Skeleton
            animation="wave"
            width={64}
            height={16}
          />
        </View>
        <View style={style.stepperText}>
          <Skeleton
            circle
            animation="wave"
            width={32}
            height={32}
          />
          <Skeleton
            animation="wave"
            width={64}
            height={16}
          />
        </View>
      </View>
      <View>
        <Skeleton
          animation="wave"
          width="100%"
          height={45}
          style={style.skeletonBox}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingVertical: 7,
    gap: 24,
  },
  headerContainer: { display: "flex", flexDirection: "row", gap: 12 },
  imageContainer: { display: "flex", flexDirection: "row" },
  infoContainer: { display: "flex", flexDirection: "column", gap: 8 },
  stepperContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 13,
    gap: 25,
  },
  stepperText: { gap: 5, display: "flex", alignItems: "center" },

  skeletonBox: {
    borderRadius: 8,
  },
});

ReservationSkeleton.defaultProps = {
  fullWidth: false,
};

export default ReservationSkeleton;
