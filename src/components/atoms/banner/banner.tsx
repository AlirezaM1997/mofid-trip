import React from "react";
import { Skeleton } from "@rneui/themed";
import { Image, StyleSheet, Pressable, Platform } from "react-native";
import { useBannerListQuery } from "@src/gql/generated";
import { useRouter } from "expo-router/src/hooks";
import { WIDTH } from "@src/constants";

const Banner = ({ name }) => {
  const router = useRouter();
  const { loading, data } = useBannerListQuery({
    variables: {
      search: name,
      page: {
        pageNumber: 1,
        pageSize: 100,
      },
    },
  });

  const handlePress = (url: string) => {
    if (url) {
      if (Platform.OS === "web") {
        router.push(url);
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
    return <Skeleton animation="wave" width={"100%"} height={130} style={style.skeletonBox} />;
  }

  const banner = data?.bannerList?.data?.[0];

  return (
    <Pressable style={style.bannerStyle} onPress={() => handlePress(banner?.url as string)}>
      {banner?.avatarS3 ? (
        <Image
          source={{ uri: banner?.avatarS3?.large as string }}
          resizeMode="stretch"
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
    // TODO: refactor the size of image
    width: WIDTH - 48,
    height: ((WIDTH - 48) * 144) / 290,
    overflow: "hidden",
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
