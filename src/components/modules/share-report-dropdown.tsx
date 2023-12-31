import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import Report from "./report";
import { HEIGHT, WIDTH } from "@src/constants";
import ShareDropdown from "@modules/share-dropdown";

const ShareReportDropDown = () => {
  const [isVisible, setIsVisible] = useState(false);

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
          <ShareDropdown closeMoreDetails={handleClose} />
          <Report closeMoreDetails={handleClose} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backDrop: isVisible => ({
    display: isVisible ? "flex" : "none",
    position: "absolute",
    width: WIDTH,
    height: HEIGHT,
    bottom: -HEIGHT,
  }),
  iconStyle: {
    paddingLeft: 10,
  },
  dropDown: {
    position: "absolute",
    left: 15,
  },
});

export default ShareReportDropDown;
