import React from "react"
import { Text } from "@rneui/themed"
import { View, StyleSheet } from "react-native"
import { Button, useTheme } from "@rneui/themed"
import dateConverter from "@src/utils/dateConveter"
import { useNavigation } from "@react-navigation/native"
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons"
import WhiteSpace from "@src/components/atoms/white-space"
import useTranslation from "@src/hooks/translation"
import useIsRtl from "@src/hooks/localization"

const PaymentDetails = ({ data }) => {
  const isRtl = useIsRtl()
  const { theme } = useTheme()
  const { tr } = useTranslation()
  const navigation = useNavigation()

  const handleClick = (route) => {
    navigation.navigate(route)
  }

  const themeStyles = {
    detailLabel: {
      color: theme.colors.grey2,
    },
  }

  return (
    <>
      <WhiteSpace size={10} />
      <Text variant="subtitle2" style={[{ color: theme.colors.grey3 }, styles.sectionTitle]}>
        {tr("Entered Details")}
      </Text>
      <View style={styles.container}>
        <View style={styles.detailContainer}>
          <View style={styles.detailRow}>
            <AntDesign name="calendar" size={15} color="black" />
            <View>
              <Text variant="caption" style={themeStyles.detailLabel}>
                {tr("Travel date")}
              </Text>
              <Text variant="subtitle2">{`${dateConverter(data?.dateStart)} To ${dateConverter(data?.dateEnd)}`}</Text>
            </View>
          </View>

          <Button disabled color="secondary" size="md" onPress={() => handleClick("/book/date")}>
            {tr("edit")}
            <MaterialIcons name={isRtl ? "keyboard-arrow-left" : "keyboard-arrow-right"} size={24} color={theme.colors.white} />
          </Button>
        </View>

        <View style={styles.detailContainer}>
          <View style={styles.detailRow}>
            <AntDesign name="user" size={15} color="black" />
            <View>
              <Text variant="caption" style={themeStyles.detailLabel}>
                {tr("passengers")}
              </Text>
              <Text variant="subtitle2">
                {data?.guestSet.length} {tr("Person")}
              </Text>
            </View>
          </View>

          <Button disabled color="secondary" size="md" onPress={() => handleClick("/book/passengers-form")}>
            {tr("edit")}
            <MaterialIcons name={isRtl ? "keyboard-arrow-left" : "keyboard-arrow-right"} size={24} color={theme.colors.white} />
          </Button>
        </View>

        <View style={styles.detailContainer}>
          <View style={styles.detailRow}>
            <Feather name="home" size={15} color="black" />
            <View>
              <Text variant="caption" style={themeStyles.detailLabel}>
                {tr("Place requested")}
              </Text>
              <Text variant="subtitle2">{data?.project?.name}</Text>
            </View>
          </View>

          <Button disabled color="secondary" size="md" onPress={() => handleClick("/accommodation/")}>
            {tr("edit")}
            <MaterialIcons name={isRtl ? "keyboard-arrow-left" : "keyboard-arrow-right"} size={24} color={theme.colors.white} />
          </Button>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    marginBottom: 15,
  },
  container: { gap: 33 },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailRow: {
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
})

export default PaymentDetails
