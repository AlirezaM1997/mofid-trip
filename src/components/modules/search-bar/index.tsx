import React from "react";
import { Feather } from "@expo/vector-icons";
import useIsRtl from "@src/hooks/localization";
import { router, usePathname } from "expo-router";
import useTranslation from "@src/hooks/translation";
import { Pressable, StyleSheet, View } from "react-native";
import { SearchBar as ReactNativeElementsSearchBar, useTheme } from "@rneui/themed";

const SearchBar = ({ onFocus, onChange, onChangeText, value }) => {
  const isRtl = useIsRtl();
  const { theme } = useTheme();
  const pathName = usePathname();
  const { tr } = useTranslation();

  return (
    <View>
      {pathName !== "/search" && (
        <Pressable onPress={() => router.push("/search")} style={styles.pressHandler}></Pressable>
      )}
      <ReactNativeElementsSearchBar
        value={value}
        onFocus={onFocus}
        clearIcon={<></>}
        showCancel={false}
        onChange={onChange}
        placeholder={tr("search")}
        onChangeText={onChangeText}
        containerStyle={{ borderTopWidth: 0 }}
        inputStyle={{ direction: isRtl ? "rtl" : "ltr" }}
        searchIcon={<Feather name="search" size={22} color={theme.colors.grey2} />}
      />
    </View>
  );
};

SearchBar.defaultProps = {
  showCancel: false,
  onFocus: () => {},
  onChange: () => {},
  onChangeText: () => {},
};

const styles = StyleSheet.create({
  pressHandler: {
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
  },
});

export default SearchBar;
