import React from "react";
import { Skeleton } from "@rneui/themed";
import { Image, StyleSheet, Pressable, Platform } from "react-native";
import { useBannerListQuery } from "@src/gql/generated";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router/src/hooks";

const Banner = ({ name }) => {
  const router = useRouter();
  const { loading, data, error } = useBannerListQuery({
    variables: {
      search: name,
      page: {
        pageNumber: 1,
        pageSize: 100
      }
    },
  });

  const handlePress = (url) => {
    if (url) {
      if (Platform.OS === "web") {
        Linking.openURL(url);
      } else {
        router.push({
          pathname: "/web-view",
          params: {
            url: url,
          },
        });
      }
    }
  };

  if (loading) {
    return (
      <Skeleton
        animation="wave"
        width={"100%"}
        height={130}
        style={style.skeletonBox}
      />
    );
  }

  const banner = data.bannerList?.data?.[0];
  
  return (
    <Pressable
      style={style.bannerStyle}
      onPress={() => handlePress(banner.url)}
    >
      {banner?.avatarS3 ? (
        <Image
          source={{ uri: banner?.avatarS3.large }}
          style={style.bannerSize}
        />
      ) : null}
    </Pressable>
  );
};

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
});

export default Banner;
