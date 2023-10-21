import Text from "@src/components/atoms/text"
import { ProjectQueryType } from "@src/gql/generated"
import { EvilIcons, Feather, FontAwesome } from "@expo/vector-icons"
import React from "react"
import { View, ImageBackground, StyleSheet, Pressable, Platform } from "react-native"
import { Divider } from "@rneui/themed"
import { useNavigation } from "@react-navigation/native"
import TruncatedText from "@src/components/atoms/text/truncatedText"
import useTranslation from "@src/hooks/translation"
import useIsRtl from "@src/hooks/localization"

type PropsType = {
  project: ProjectQueryType
}

function PlaceCard({ project }: PropsType) {
  const isRtl = useIsRtl()
  const { tr } = useTranslation()
  const navigation = useNavigation()
  // const handleClick = () => navigate("/accommodation/" + project.id);

  const handlePress = () => {
    navigation.navigate({
      name: "ProjectScreen",
      params: {
        id: project.id,
        name: project.name,
      },
    })
  }

  const avatar = project?.accommodation?.avatarS3.length > 0 ? project?.accommodation?.avatarS3[0].small : ""

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
          <TruncatedText title={project.name} style={style.name} />

          <View style={style.rate}>
            <FontAwesome name="star" size={20} color="#FEC30D" />
            <Text style={{ fontSize: 15 }}>4.9</Text>
          </View>
        </View>
        <View style={style.address}>
          <EvilIcons name="location" size={20} color="black" />
          <TruncatedText title={project.accommodation.address} style={style.addressText} />
        </View>
      </View>
      <Divider />
      <View>
        <View style={style.bottom}>
          <View style={style.bottomStyle}>
            <Text variant="subtitle1" style={style.price}>
              ${project.price.toString()}
            </Text>
            <Text>/ {tr("night")}</Text>
          </View>
          <Feather name={isRtl ? "arrow-left" : "arrow-right"} size={20} color={"red"} />
        </View>
      </View>
    </Pressable>
  )
}

const style = StyleSheet.create({
  container: {
    minWidth: 300,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 12,
    ...Platform.select({
      web: { boxShadow: "0 0 5px #12121233" },
    }),
  },
  ImageBackground: (isRtl) => ({
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
  price: { fontWeight: "bold" },
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
  name: { fontSize: 18, fontWeight: "bold" },
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
})

export default PlaceCard
