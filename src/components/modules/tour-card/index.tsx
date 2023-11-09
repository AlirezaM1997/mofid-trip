import React from "react";
import { router } from "expo-router";
import { Divider } from "@rneui/themed";
import { Text } from "@rneui/themed";
import useIsRtl from "@src/hooks/localization";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import {
  AccommodationQueryType,
  TourImageType,
  TourPriceType,
  TourQueryType,
} from "@src/gql/generated";
import { EvilIcons, Feather, FontAwesome } from "@expo/vector-icons";
import { View, ImageBackground, StyleSheet, Pressable, Platform } from "react-native";
import { WIDTH } from "@src/constants";

type PropsType = {
  address: AccommodationQueryType["address"];
  price: TourPriceType["price"];
  name: TourQueryType["title"];
  avatarS3: TourImageType[];
  id: TourQueryType["id"];
};

function TourCard({ price, id, name, avatarS3, address }: PropsType) {
  const isRtl = useIsRtl();
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();

  const handlePress = () => {
    router.push({
      pathname: `/tour/${id}`,
      params: {
        id: id,
        name: name,
      },
    });
  };

  const avatar = avatarS3?.length > 0 ? avatarS3?.[0].small : "";

  return (
    <Pressable style={style.container} onPress={handlePress}>
      <View>
        <ImageBackground
          style={style.ImageBackground(isRtl)}
          imageStyle={style.ImageBackgroundImage}
          source={{
            uri: avatar,
          }}
        />
      </View>
      <View style={style.top}>
        <View style={style.top2}>
          <Text heading2 bold numberOfLines={1}>
            {name}
          </Text>

          <View style={style.rate}>
            <FontAwesome name="star" size={20} color="#FEC30D" />
            <Text style={{ fontSize: 15 }}>{localizeNumber(4.1)}</Text>
          </View>
        </View>
        <View style={style.address}>
          <EvilIcons name="location" size={20} color="black" />
          <Text numberOfLines={1} type="grey3">
            {address}
          </Text>
        </View>
      </View>
      <Divider />
      <View>
        <View style={style.bottom}>
          <View style={style.bottomStyle}>
            <Text subtitle1 bold>
              ${localizeNumber(price?.toString())}
            </Text>
            <Text>/ {tr("night")}</Text>
          </View>
          <Feather name={isRtl ? "arrow-left" : "arrow-right"} size={20} color={"red"} />
        </View>
      </View>
    </Pressable>
  );
}

const style = StyleSheet.create({
  container: {
    width: WIDTH - 50,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 12,
    ...Platform.select({
      web: { boxShadow: "0 0 5px #12121233" },
    }),
  },
  ImageBackground: isRtl => ({
    marginRight: isRtl ? 0 : 5,
    width: "100%",
    height: 200,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: 16,
    marginBottom: 10,
  }),
  ImageBackgroundImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
  bottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 12,
  },
  rate: {
    gap: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  address: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  addressText: {
    fontSize: 14,
    color: "grey",
  },
  top2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomStyle: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    flexDirection: "row",
  },
});

export default TourCard;
