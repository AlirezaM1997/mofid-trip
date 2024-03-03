import Report from "./report";
import { Entypo } from "@expo/vector-icons";
import { HEIGHT, WIDTH } from "@src/constants";
import React, { useEffect, useState } from "react";
import ShareDropdown from "@modules/share-dropdown";
import { StyleSheet, View, Platform, ViewStyle } from "react-native";

const ShareReportDropDown = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleOpen = () => setIsVisible(!isVisible);
  const handleClose = () => setIsVisible(false);

  const closeMoreDetails = () => window.addEventListener("click", handleClose);

  useEffect(() => {
    closeMoreDetails();
    return () => window.removeEventListener("click", handleClose);
  }, []);

  return (
    <>
      <Entypo style={styles.iconStyle} name="dots-three-vertical" size={20} onPress={handleOpen} />
      <View style={styles.backDrop(isVisible)}>
        <View style={styles.dropDown}>
          <ShareDropdown closeMoreDetails={handleClose as ()=> void} />
          <Report closeMoreDetails={handleClose as () => void} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backDrop: ((isVisible: boolean) => ({
    display: isVisible ? "flex" : "none",
    position: "absolute",
    width: WIDTH,
    height: HEIGHT,
    bottom: -HEIGHT,
  })) as ViewStyle,
  iconStyle: {
    paddingLeft: 10,
  },
  dropDown: {
    position: "absolute",
    left: 15,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    ...Platform.select({
      web: { boxShadow: "0 0 5px #12121227" },
    }),
  },
});

export default ShareReportDropDown;
