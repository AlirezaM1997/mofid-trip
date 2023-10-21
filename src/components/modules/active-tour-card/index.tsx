import React from "react"
import { Ionicons, FontAwesome } from "@expo/vector-icons"
import Text from "@src/components/atoms/text"
import { TourTypes } from "@src/gql/generated"
import { Pressable, StyleSheet, View } from "react-native"
import { Image } from "@rneui/themed"
import { useNavigation } from "@react-navigation/native"
import WhiteSpace from "@src/components/atoms/white-space"
import { period } from "@src/helper/date"
import useTranslation from "@src/hooks/translation"

type PropsType = {
  tour: TourTypes
}

function ActiveTourCard({ tour }: PropsType) {
  const { tr } = useTranslation()
  const navigation = useNavigation()
  const handleClick = () =>
    navigation.navigate({
      name: "TourScreen",
      params: {
        id: tour.id,
      },
    })

  const days = period(tour.startTime, tour.endTime)

  return (
    <>
      <View style={{ display: "flex", flexDirection: "column" }}>
        <Pressable style={style.tour} onPress={handleClick}>
          <Image source={{ uri: tour?.avatarS3?.[0]?.small || "" }} style={style.tourImage} />
          <View style={style.tourDetailContainer}>
            <View>
              <Text style={style.tourName}>{tour.title}</Text>
            </View>
            <View style={style.tourAddressContainer}>
              <Ionicons name="location-outline" size={18} color="black" />
              <Text style={style.tourAddressText}>
                {days.toString()}-Day Tour - {tour.facilities?.[0]?.enName}
              </Text>
            </View>
            <View style={style.tourPriceAndRateContainer}>
              <View style={style.tourPrice}>
                <FontAwesome name="dollar" size={16} color="black" />
                <Text>{tour?.price?.[0]?.price.toString()}</Text>
                <Text>/ {tr("night")}</Text>
              </View>
              <View style={style.tourRate}>
                <FontAwesome name="star" size={20} color="#FEC30D" />
                <Text>4.9</Text>
              </View>
            </View>
          </View>
        </Pressable>
        <WhiteSpace size={10} />
      </View>
    </>
  )
}

const style = StyleSheet.create({
  tour: {
    display: "flex",
    flexDirection: "row",
    elevation: 5,
    backgroundColor: "#fff",
    shadowColor: "#878787",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowRadius: 16,
    borderRadius: 12,
    minWidth: 300,
  },
  tourImage: {
    width: 95,
    height: 95,
    marginLeft: 8,
    marginRight: 12,
    borderRadius: 8,
    marginVertical: 8,
    objectFit: "cover",
  },
  tourDetailContainer: {
    width: 180,
    marginRight: 12,
    display: "flex",
    marginVertical: 15,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  tourName: {
    width: 177,
    height: "auto",
    overflow: "hidden",
  },
  tourAddressContainer: {
    gap: 2,
    display: "flex",
    color: "#878787",
    flexDirection: "row",
    alignItems: "center",
  },
  tourAddressText: {
    width: 160,
    height: "auto",
    color: " #878787",
    overflow: "hidden",
    textTransform: "capitalize",
  },
  tourPriceAndRateContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tourPrice: {
    gap: 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tourRate: {
    gap: 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
})

export default ActiveTourCard
