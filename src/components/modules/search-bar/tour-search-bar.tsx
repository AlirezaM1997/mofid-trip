import React, { useRef } from "react";
import { SearchBar as ReactNativeElementsSearchBar } from "@rneui/themed";
import { Feather } from "@expo/vector-icons";
import useTranslation from "@src/hooks/translation";
import useIsRtl from "@src/hooks/localization";
import { Platform } from "react-native";

const TourSearchBar = ({ onFocus, onChange, onChangeText, value }) => {
  const { tr } = useTranslation();
  const isRtl = useIsRtl();
  const inputRef = useRef(null);

  const right = { right: 35 };
  const left = Platform.select({
    web: {
      left: 35,
    },
    android: {
      right: 35,
    },
    ios: {
      right: 35,
    },
  });

  return (
    <ReactNativeElementsSearchBar
      ref={inputRef}
      placeholder={tr("search for tours")}
      searchIcon={<Feather name="search" size={24} color="#ADAFAE" />}
      clearIcon={<></>}
      showCancel={false}
      containerStyle={{ borderTopWidth: 0 }}
      inputStyle={{ direction: isRtl ? "rtl" : "ltr" }}
      onChange={onChange}
      onFocus={onFocus}
      onChangeText={onChangeText}
      value={value}
    />
  );
};

TourSearchBar.defaultProps = {
  showCancel: false,
  onFocus: () => {},
  onChange: () => {},
  onChangeText: () => {},
};

export default TourSearchBar;
