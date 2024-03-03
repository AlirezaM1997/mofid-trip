import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { ListItem, Text } from "@rneui/themed";
import ShareBottomsheet from "./share-bottomsheet";
import useTranslation from "@src/hooks/translation";

const ShareDropdown = ({ closeMoreDetails }:{ closeMoreDetails: ()=> void }) => {
  const { tr } = useTranslation();

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleOpen = () => {
    setIsVisible(true);
    closeMoreDetails();
  };
  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      <ListItem
        onPress={handleOpen}
        containerStyle={{ direction: "rtl", paddingVertical: 10, borderTopRightRadius: 8 }}>
        <Feather name="share-2" size={16} />
        <Text numberOfLines={1} body2>
          {tr("share")}
        </Text>
      </ListItem>

      <ShareBottomsheet isVisible={isVisible as boolean} handleClose={handleClose as ()=> void} />
    </>
  );
};

export default ShareDropdown;
