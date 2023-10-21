import React from "react"
import { BottomSheet } from "@rneui/base"
import Text from "@src/components/atoms/text"
import { AntDesign } from "@expo/vector-icons"
import { View, StyleSheet } from "react-native"
import { Button, useTheme } from "@rneui/themed"
import Container from "@src/components/atoms/container"
import { dateConverter } from "@src/helper/date"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useSelector } from "react-redux"
import { RootState } from "@src/store"
import useTranslation from "@src/hooks/translation"

type PropsType = {
  openPaymentPopup: boolean
  setOpenPaymentPopup: (t: boolean) => void
  totalPrice: number
}

const SuccessfulPaymentDetail = ({ openPaymentPopup, setOpenPaymentPopup, totalPrice }: PropsType) => {
  const {tr} = useTranslation()
  const { theme } = useTheme()
  const route = useRoute()
  const navigation = useNavigation()
  const { price } = useSelector((state: RootState) => state.projectSlice.projectDetail)

  const themeStyles = StyleSheet.create({
    greyText: { color: theme.colors.grey3 },
    bottomDivider: { borderWidth: 1, borderColor: theme.colors.grey0, marginVertical: 32 },
    divider: { borderWidth: 1, borderColor: theme.colors.grey0, marginVertical: 16, borderStyle: "dashed" },
  })

  const handleClick = () => {
    navigation.navigate("InvoiceScreen", {
      transactionId: route.params.transactionId,
    })
  }

  return (
    <BottomSheet isVisible={openPaymentPopup} onBackdropPress={() => setOpenPaymentPopup(false)}>
      <View style={{ backgroundColor: theme.colors.white }}>
        <Container style={styles.container}>
          <View style={styles.header}>
            <View style={styles.checkIconContainer}>
              <AntDesign name="checkcircle" size={40} color={theme.colors.success} />
            </View>
            <Text variant="heading2">{tr("Payment was successful")}</Text>
          </View>

          <View style={themeStyles.divider} />

          <View style={styles.contentContainer}>
            <View style={styles.content}>
              <Text variant="body1" style={themeStyles.greyText}>
                {tr("Tracking Code")}
              </Text>
              <Text variant="body1">1</Text>
            </View>

            <View style={styles.content}>
              <Text variant="body1" style={themeStyles.greyText}>
                {tr("Date")}
              </Text>
              <Text variant="body1">{dateConverter(new Date())}</Text>
            </View>

            <View style={styles.content}>
              <Text variant="body1" style={themeStyles.greyText}>
                {tr("Time")}
              </Text>
              <Text variant="body1">{dateConverter(new Date())}</Text>
            </View>

            <View style={styles.content}>
              <Text variant="body1" style={themeStyles.greyText}>
                {tr("Payment Method")}
              </Text>
              <Text variant="body1">{tr("PayPal")}</Text>
            </View>
          </View>

          <View style={themeStyles.divider} />

          <View style={styles.content}>
            <Text variant="body1" style={themeStyles.greyText}>
              {tr("Amount")}
            </Text>
            <Text variant="body1">$ {totalPrice}</Text>
          </View>

          <View style={themeStyles.bottomDivider} />

          <View style={styles.content}>
            <Button onPress={handleClick} containerStyle={styles.button} type="outline" title={tr("View invoices")} />
            <Button onPress={handleClick} containerStyle={styles.button} title={tr("PDF Receipt")} />
          </View>
        </Container>
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingVertical: 16,
  },
  header: {
    gap: 16,
    alignItems: "center",
  },
  checkIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 50,
    backgroundColor: "rgba(102,205,106,0.2)",
  },

  contentContainer: {
    gap: 8,
  },

  content: {
    gap: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    width: "100%",
    flex: 1,
  },
})

export default SuccessfulPaymentDetail
