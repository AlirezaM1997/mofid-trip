import Text from "@src/components/atoms/text"
import { getCapacity } from "@src/helper/tour"
import useTranslation from "@src/hooks/translation"
import { RootState } from "@src/store"
import { StyleSheet, View } from "react-native"
import { useSelector } from "react-redux"

const Item = ({ title, subtitle }) => (
  <View style={style.itemContainer}>
    <Text style={style.title} variant="body1">
      {title}
    </Text>
    <Text style={style.subTitle} variant="body2">
      {subtitle}
    </Text>
  </View>
)

const ProjectBoldFeatures = ({capacity}) => {
  const { tr } = useTranslation()
  const totalCapacity = getCapacity(capacity)

  return (
    <View style={style.container}>
      <Item title={totalCapacity} subtitle={tr("Capacity")} />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
  },
  itemContainer: {
    borderWidth: 1,
    flex: 1,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    paddingVertical: 18,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  subTitle: {
    fontSize: 18,
  },
})

export default ProjectBoldFeatures
