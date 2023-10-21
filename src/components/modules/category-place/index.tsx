import React from "react";
import { Skeleton, useTheme } from "@rneui/themed";
import { View, StyleSheet, ScrollView } from "react-native";

function CategoryPlaceSkeleton() {
  const { theme } = useTheme();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={style.container}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <View key={i} style={style.categories}>
          <View style={style.categoriesImgSkeleton}>
            <Skeleton
              animation="wave"
              width={100}
              height={87}
              style={style.skeletonBox}
            />
          </View>
          <Skeleton
            animation="wave"
            width={100}
            height={18}
            style={style.skeletonBox}
          />
        </View>
      ))}
    </ScrollView>
  );
}
const style = StyleSheet.create({
  container: {
    marginLeft: 8,
    display: "flex",
    flexDirection: "row",
  },
  categories: {
    display: "flex",
    alignItems: "center",
    marginBottom: 8,
    marginLeft: 8,
  },
  categoriesImgSkeleton: { marginBottom: 8 },
  skeletonBox: {
    borderRadius: 8,
  },
});
export default CategoryPlaceSkeleton;
