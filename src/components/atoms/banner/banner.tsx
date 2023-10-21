import React from "react"
import { Skeleton } from "@rneui/themed"
import { View, Image, StyleSheet, Pressable, Platform } from "react-native"
import { useBannerListQuery } from "@src/gql/generated"
import { useNavigation } from "@react-navigation/native"
import * as Linking from "expo-linking"

const Banner = ({ name }) => {
  const navigation = useNavigation()
  const { loading, data, error } = useBannerListQuery({
    variables: {
      search: name,
    },
  })

  const handlePress = (url) => {
    if (Platform.OS === "web") {
      Linking.openURL(url)
    } else {
      navigation.navigate({
        name: "LandingPageScreen",
        params: {
          url: url,
        },
      })
    }
  }

  if (loading) {
    return <Skeleton animation="wave" width={"100%"} height={130} style={style.skeletonBox} />
  }

  const banner = data?.bannerList[0]

  return (
    <Pressable style={style.bannerStyle} onPress={() => handlePress(banner.url)}>
      {banner?.avatarS3 ? <Image source={{ uri: banner?.avatarS3.large }} style={style.bannerSize} /> : null}
    </Pressable>
  )
}

const style = StyleSheet.create({
  bannerStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 144,
    overflow: "hidden",
    marginBottom: 12,
  },
  bannerSize: {
    borderRadius: 8,
    width: "100%",
    height: "100%",
  },
  skeletonBox: {
    borderRadius: 12,
  },
})

export default Banner
