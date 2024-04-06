import React from "react";
import { router } from "expo-router";
import { Badge, Divider, useTheme } from "@rneui/themed";
import { Text } from "@rneui/themed";
import useIsRtl, { useFormatPrice } from "@src/hooks/localization";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import {
  AccommodationQueryType,
  RateType,
  TourPackageType,
  TourQueryType,
} from "@src/gql/generated";
import { Feather, FontAwesome, EvilIcons } from "@expo/vector-icons";
import {
  View,
  ImageBackground,
  StyleSheet,
  Pressable,
  Platform,
  ViewStyle,
  ImageStyle,
} from "react-native";
import { WIDTH } from "@src/constants";
import WhiteSpace from "@atoms/white-space";

type PropsType = {
  address: AccommodationQueryType["address"];
  discount: TourPackageType["discount"];
  price: TourPackageType["price"];
  name: TourQueryType["title"];
  containerStyle?: ViewStyle;
  avatarS3: TourQueryType["avatarS3"];
  id: TourQueryType["id"];
  rate: RateType;
};

function TourSliderCard({
  id,
  name,
  rate,
  price,
  address,
  avatarS3,
  discount,
  containerStyle,
}: PropsType) {
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

  const tourPrice =
    (price as number) <= 0 ? (
      <Text body2 bold>
        {tr("it is free")}
      </Text>
    ) : (
      <>
        <View style={style.bottomStyle}>
          {discount ? (
            <Text body2 bold>
              {localizeNumber(
                ((price as number) * (1 - (discount as number) / 100)).toLocaleString()
              )}
            </Text>
          ) : (
            ""
          )}
          <Text
            body2
            bold
            type={discount ? "primary" : "secondary"}
            style={discount ? { textDecorationLine: "line-through" } : {}}>
            {localizeNumber(formatPrice(price as number) as string)}
          </Text>
        </View>
      </>
    );

  const avatar =
    (avatarS3?.length as number) > 0
      ? { uri: avatarS3?.[0]?.large }
      : require("@assets/image/defaultHost.svg");

  return (
    <Pressable style={[style.container, containerStyle]} onPress={handlePress}>
      <ImageBackground
        style={style.ImageBackground(isRtl)}
        imageStyle={style.ImageBackgroundImage as ImageStyle}
        source={avatar}
      />

      {discount ? (
        <Badge color="primary" value={`%${discount} تخفیف`} badgeStyle={style.badgeStyle} />
      ) : (
        ""
      )}

      <View style={style.top}>
        <View>
          <Text bold numberOfLines={1}>
            {name}
          </Text>
          <WhiteSpace size={6} />
          <View style={style.address}>
            <EvilIcons name="location" size={18} color={theme.colors.black} />
            <Text caption numberOfLines={1} type="grey3">
              {address}
            </Text>
          </View>
        </View>
        {rate?.avgRate && (
          <View style={style.rate}>
            <FontAwesome name="star" size={20} color={theme.colors.warning} />
            <Text body2>{localizeNumber(rate.avgRate as string)}</Text>
          </View>
        )}
      </View>

      <WhiteSpace size={10} />
      <Divider />

      <View style={style.bottom}>
        {tourPrice}
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
  badgeStyle: {
    position: "absolute",
    borderRadius: 100,
    borderWidth: 0,
    bottom: 0,
    left: 8,
  },
  address: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  top: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  bottomStyle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default TourSliderCard;
