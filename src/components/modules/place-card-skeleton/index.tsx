import React from "react";
import { StyleSheet, View } from "react-native";
import { Skeleton, useTheme } from "@rneui/themed";

function PlaceCardSkeleton({ fullWidth }) {
  const { theme } = useTheme();
  return (
    <View style={style.container}>
      <Skeleton
        animation="wave"
        width={fullWidth ? "100%" : 300}
        height={290}
        style={style.skeletonBox}
      />
      <Skeleton
        animation="wave"
        width={fullWidth ? "100%" : 300}
        height={45}
        style={style.skeletonBox}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: { gap: 2 },
  skeletonBox: {
    borderRadius: 12,
  },
});

PlaceCardSkeleton.defaultProps = {
  fullWidth: false,
};

export default PlaceCardSkeleton;
