import {
  View,
  ImageBackground,
  StyleSheet,
  Pressable,
  Platform,
  ImageStyle,
  ViewStyle,
} from "react-native";
import {
  AccommodationQueryType,
  RateType,
  TourPackageType,
  TourQueryType,
} from "@src/gql/generated";
import React from "react";
import { router } from "expo-router";
import { Text } from "@rneui/themed";
import { WIDTH } from "@src/constants";
import { Divider, useTheme } from "@rneui/themed";
import useIsRtl, { useFormatPrice } from "@src/hooks/localization";
import { EvilIcons, Feather, FontAwesome } from "@expo/vector-icons";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

type PropsType = {
  address: AccommodationQueryType["address"];
  price: TourPackageType["price"];
  name: TourQueryType["title"];
  avatarS3: TourQueryType["avatarS3"];
  id: TourQueryType["id"];
  rate: RateType;
};

function TourSliderCard({ price, id, name, rate, avatarS3, address }: PropsType) {
  const isRtl = useIsRtl();
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const { localizeNumber } = useLocalizedNumberFormat();
  const { formatPrice } = useFormatPrice();

  const handlePress = () => {
    router.push({
      pathname: `/tour/${id}`,
      params: {
        id: id,
        name: name,
      },
    });
  };

  const avatar =
    (avatarS3?.length as number) > 0
      ? { uri: avatarS3?.[0]?.orginal }
      : require("@assets/image/defaultHost.svg");

  return (
    <Pressable style={style.container} onPress={handlePress}>
      <ImageBackground
        style={style.ImageBackground(isRtl)}
        imageStyle={style.ImageBackgroundImage as ImageStyle}
        source={avatar}
      />
      <View style={style.top}>
        <View style={style.top2}>
          <Text bold numberOfLines={1}>
            {name}
          </Text>
          {rate.avgRate && (
            <View style={style.rate}>
              <FontAwesome name="star" size={20} color={theme.colors.warning} />
              <Text body2>{localizeNumber(rate.avgRate as string)}</Text>
            </View>
          )}
        </View>
        <View style={style.address}>
          <EvilIcons name="location" size={18} color={theme.colors.black} />
          <Text caption numberOfLines={1} type="grey3">
            {address}
          </Text>
        </View>
      </View>

      <Divider />

      <View style={style.bottom}>
        {price <= 0 ? (
          <Text body2 bold>
            {tr("it is free")}
          </Text>
        ) : (
          <>
            <View style={style.bottomStyle}>
              <Text body2 bold>
                {localizeNumber(formatPrice(price) as string)}
              </Text>
              <Text body2 bold>
                / {tr("night")}
              </Text>
            </View>
          </>
        )}
        <Feather
          name={isRtl ? "chevron-left" : "chevron-right"}
          size={18}
          color={theme.colors.primary}
        />
      </View>
    </Pressable>
  );
}

const style = StyleSheet.create({
  container: {
    width: WIDTH - 80,
    maxWidth: 350,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 16,
    marginVertical: 5,
    ...Platform.select({
      web: { boxShadow: "0 0 5px #12121233" },
    }),
  },
  ImageBackground: ((isRtl: boolean) => ({
    marginRight: isRtl ? 0 : 5,
    width: "100%",
    height: (WIDTH - 80) * 0.6116,
    maxHeight: 350 * 0.6116,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: 16,
    marginBottom: 10,
  })) as ViewStyle,
  ImageBackgroundImage: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  top: {
    paddingHorizontal: 10,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  rate: {
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  address: {
    flexDirection: "row",
    gap: 2,
    marginVertical: 12,
    alignItems: "center",
  },
  top2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomStyle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
});

export default TourSliderCard;
