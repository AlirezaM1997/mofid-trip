import React, { useState } from "react";
import { Button, Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import ShareBottomsheet from "./share-bottomsheet";

const ShareButton = () => {
  const { tr } = useTranslation();

  const [isVisible, setIsVisible] = useState(false);

  const handleOpen = () => {
    setIsVisible(true);
  };
  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      <Button onPress={handleOpen}>{tr("share")}</Button>

      <ShareBottomsheet isVisible={isVisible} handleClose={handleClose} />
    </>
  );
};

export default ShareButton;
