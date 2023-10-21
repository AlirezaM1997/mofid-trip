import Text from "@src/components/atoms/text"
import { diffDays } from "@src/helper/date"
import { getCapacity, getGender } from "@src/helper/tour"
import useTranslation from "@src/hooks/translation"
import { RootState } from "@src/store"
import { StyleSheet, View } from "react-native"
import { useSelector } from "react-redux"

const TourFeatures = () => {
  const { tr } = useTranslation()
  const { tourDetail } = useSelector((state: RootState) => state.tourSlice)

  const startTime = new Date(tourDetail.startTime)
  const endTime = new Date(tourDetail.endTime)

  return (
    <View>
      <View style={style.tourFeatures}>
        <View style={[style.featureItem, style.featureItemLeft]}>
          <Text variant="subtitle2">{tr("Travel Date")}</Text>
          <Text variant="heading2">
            {startTime.toLocaleDateString()} {endTime.toLocaleDateString()}
          </Text>
        </View>
        <View style={[style.featureItem, style.featureItemRight]}>
          <Text variant="subtitle2">{tr("Travel Duration")}</Text>
          <Text variant="heading2">{diffDays(startTime, endTime)}</Text>
        </View>
      </View>
      <View style={style.tourFeatures}>
        <View style={[style.featureItem, style.featureItemLeft]}>
          <Text variant="subtitle2">{tr("Gender")}</Text>
          <Text style={style.capacity} variant="heading2">
            {getGender(tourDetail.capacity)}
          </Text>
        </View>
        <View style={[style.featureItem, style.featureItemRight]}>
          <Text variant="subtitle2">{tr("Travel Date")}</Text>
          <Text variant="heading2">{getCapacity(tourDetail.capacity)}</Text>
        </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  tourFeatures: {
    display: "flex",
    flexDirection: "row",
    margin: 5,
  },
  featureItem: {
    borderWidth: 1,
    flex: 1,
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  featureItemLeft: {
    marginRight: 5,
  },
  featureItemRight: {
    marginLeft: 5,
  },
  capacity: { textAlign: "center" },
})

export default TourFeatures
