import { RootState } from "@src/store";
import debounce from "lodash/debounce";
import { Feather, AntDesign } from "@expo/vector-icons";
import useIsRtl from "@src/hooks/localization";
import { router, usePathname } from "expo-router";
import { setSearch } from "@src/slice/filter-slice";
import useTranslation from "@src/hooks/translation";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import {
  SearchBar as ReactNativeElementsSearchBar,
  SearchBarProps,
  Text,
  useTheme,
} from "@rneui/themed";

const SearchBar = ({ onFocus, showSearchText = true }) => {
  const isRtl = useIsRtl();
  const { theme } = useTheme();
  const pathName = usePathname();
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const searchRef = useRef<TextInput & SearchBarProps>();
  const { search } = useSelector((state: RootState) => state.filterSlice);

  useEffect(() => {
    if (pathName === "/search") searchRef.current.focus();
  }, [pathName]);

  const [value, setValue] = useState(showSearchText ? search : "");

  const debouncedOnChange = useMemo(() => debounce(t => dispatch(setSearch(t)), 1500), [search]);

  const handleChange = t => {
    setValue(t);
    debouncedOnChange(t);
  };

  const handleClear = () => {
    handleChange("");
    searchRef.current.focus();
  };

  return (
    <View>
      {pathName !== "/search" && (
        <Pressable onPress={() => router.push("/search")} style={styles.pressHandler}></Pressable>
      )}
      <ReactNativeElementsSearchBar
        value={value}
        ref={searchRef}
        onFocus={onFocus}
        clearIcon={
          <AntDesign
            size={18}
            name="closecircle"
            onPress={handleClear}
            style={styles.clearIcon}
            color={theme.colors.secondary}
          />
        }
        showCancel={false}
        placeholder={tr("search")}
        onChangeText={handleChange}
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
  clearIcon: {
    marginLeft: 6,
  },
  pressHandler: {
    top: 0,
    left: 0,
    zIndex: 2,
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "transparent",
  },
});

export default SearchBar;
