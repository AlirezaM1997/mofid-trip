import { Skeleton } from "@rneui/themed";
import { View, StyleSheet } from "react-native";

function SuggestionPlaceCardSkeleton() {
  const style = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      overflow: "scroll",
      paddingBottom: 10,
    },
    header1: { display: "flex", flexDirection: "row", paddingLeft: 14 },
    header2: {
      display: "flex",
      flexDirection: "row",
      paddingLeft: 8,
      paddingRight: 14,
    },
    skeletonRadius: { borderRadius: 2 },
    skeletonHolder: { gap: 6, paddingLeft: 4 },
  });

  return (
    <View style={style.container}>
      <View style={style.header1}>
        <Skeleton width={100} height={100} style={style.skeletonRadius} />
        <View style={style.skeletonHolder}>
          <Skeleton width={180} height={24} style={style.skeletonRadius} />
          <Skeleton width={180} height={24} style={style.skeletonRadius} />
          <Skeleton width={180} height={24} style={style.skeletonRadius} />
        </View>
      </View>
      <View style={style.header2}>
        <Skeleton width={100} height={100} style={style.skeletonRadius} />
        <View style={style.skeletonHolder}>
          <Skeleton width={180} height={24} style={style.skeletonRadius} />
          <Skeleton width={180} height={24} style={style.skeletonRadius} />
          <Skeleton width={180} height={24} style={style.skeletonRadius} />
        </View>
      </View>
    </View>
  );
}
export default SuggestionPlaceCardSkeleton;
