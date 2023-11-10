import { useTheme } from "@rneui/themed"
import { Text } from "@rneui/themed"
import useTranslation from "@src/hooks/translation"
import React from "react"
import { View, StyleSheet } from "react-native"

type PropsType = {
  tax: string | number
  days: string | number
  price: string | number
  totalPrice: string | number
  priceBasedOnDays: string | number
}

const PriceDetails = ({ price, days, priceBasedOnDays, tax, totalPrice }: PropsType) => {
  const {tr} = useTranslation()
  const { theme } = useTheme()

  const themeStyles = {
    heading: {
      textTransform: "capitalize",
      color: theme.colors.grey3,
    },
    label: {
      textTransform: "capitalize",
      color: theme.colors.grey2,
    },
  }

  return (
    <View style={styles.container}>
      <Text variant="subtitle2" style={themeStyles.heading}>
        {tr("Payment details")}
      </Text>
      <View style={styles.detailsContainer}>
        <View style={styles.rowContainer}>
          <Text variant="body1" style={themeStyles.label}>
            {tr("per night")}
          </Text>
          <Text variant="body1" style={styles.label}>
            ${price}
          </Text>
        </View>

        <View style={styles.rowContainer}>
          <Text variant="body1" style={themeStyles.label}>
            ${price} x {days} {tr("night")}
          </Text>
          <Text variant="body1" style={styles.label}>
            ${priceBasedOnDays}
          </Text>
        </View>

        <View style={styles.rowContainer}>
          <Text variant="body1" style={themeStyles.label}>
            {tr("tax")}
          </Text>
          <Text variant="body1" style={styles.label}>
            ${tax}
          </Text>
        </View>

        <View style={styles.rowContainer}>
          <Text variant="body1" style={themeStyles.label}>
            {tr("Total")}
          </Text>
          <Text variant="body1" style={styles.label}>
            ${totalPrice}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 11,
  },
  label: {
    textTransform: "capitalize",
  },
  detailsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 16,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
})

export default PriceDetails
