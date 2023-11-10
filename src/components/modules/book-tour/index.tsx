import { useNavigation } from "@react-navigation/native"
import { Button } from "@rneui/themed"
import { Text } from "@rneui/themed"
import useTranslation from "@src/hooks/translation"
import { RootState } from "@src/store"
import React from "react"
import { StyleSheet, View } from "react-native"
import { useSelector } from "react-redux"

const BookTour = () => {
  const { tr } = useTranslation()
  const navigation = useNavigation()
  const { tourDetail } = useSelector((state: RootState) => state.tourSlice)

  const minPrice = Math.min(...tourDetail?.price?.map((p) => parseFloat(p?.price)))

  const handlePress = () => navigation.navigate("ComingSoonScreen")

  return (
    <View style={style.container}>
      <View>
        <Text variant="body1" style={style.title}>
          Price starts from
        </Text>
        <Text variant="heading1">$ {minPrice.toString()}</Text>
      </View>
      <Button containerStyle={style.containerStyle} buttonStyle={style.buttonStyle} onPress={handlePress}>
        {tr("Book Now")}
      </Button>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 80,
    elevation: 10,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F3F3F3",
  },
  title: {
    color: "#ADAFAE",
  },
  buttonStyle: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
  },
  containerStyle: { borderRadius: 12 },
})

export default BookTour
