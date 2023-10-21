import React, { useEffect, useRef, useState } from "react"
import { Button, SearchBar as ReactNativeElementsSearchBar } from "@rneui/themed"
import { Feather } from "@expo/vector-icons"
import { Pressable, StyleSheet, View } from "react-native"
import FilterBottomDrawer from "../filter-bottom-drawer"
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native"
import useTranslation from "@src/hooks/translation"
import useIsRtl from "@src/hooks/localization"
import { Platform } from "react-native"

const SearchBar = ({ showCancel, onFocus, onChange, onChangeText, value }) => {
  const route = useRoute()
  const { tr } = useTranslation()
  const isRtl = useIsRtl()
  const [isVisible, setIsVisible] = useState(false)
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const inputRef = useRef()

  useEffect(() => {
    if (route.name === "SearchScreen") {
      inputRef.current.focus()
    }
  }, [isFocused])

  const right = { right: 35 }
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
  })

  return (
    <View>
      {route.name !== "SearchScreen" && <Pressable onPress={() => navigation.navigate("SearchScreen")} style={styles.pressHandler}></Pressable>}
      <Button
        type="clear"
        containerStyle={[styles.filterContainerStyle, isRtl ? left : right]}
        buttonStyle={styles.filterButtonStyle}
        onPress={() => setIsVisible(true)}
      >
        <Feather name="filter" size={19} color="#ADAFAE" />
      </Button>
      <ReactNativeElementsSearchBar
        ref={inputRef}
        placeholder={tr("Anywhere You Want")}
        searchIcon={<Feather name="search" size={24} color="#ADAFAE" />}
        clearIcon={<></>}
        showCancel={false}
        inputStyle={{ direction: isRtl ? "rtl" : "ltr" }}
        onChange={onChange}
        onFocus={onFocus}
        onChangeText={onChangeText}
        value={value}
      />
      <FilterBottomDrawer isVisible={route.name === "SearchScreen" && isVisible} setIsVisible={setIsVisible} />
    </View>
  )
}

SearchBar.defaultProps = {
  showCancel: false,
  onFocus: () => {},
  onChange: () => {},
  onChangeText: () => {},
}

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
  filterButtonStyle: {
    backgroundColor: "transparent",
    borderWidth: 0,
    elevation: 0,
    width: 37,
    height: 37,
  },
  filterContainerStyle: {
    position: "absolute",
    top: 35,
    zIndex: 1,
    width: 37,
    height: 37,
    borderWidth: 0,
    elevation: 0,
    borderRadius: 50,
  },
})

export default SearchBar
