import { RootState } from "@src/store"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import { BottomSheet } from "@rneui/base"
import Text from "@src/components/atoms/text"
import { View, StyleSheet } from "react-native"
import { Button, useTheme } from "@rneui/themed"
import SuccessfulPaymentDetail from "./paymentDetails"
import Container from "@src/components/atoms/container"
import { Transaction_Status, useUserTransactionEditMutation } from "@src/gql/generated"
import useTranslation from "@src/hooks/translation"

const ConfirmPopup = ({ totalPrice, checkboxValue }) => {
  const { tr } = useTranslation()
  const { theme } = useTheme()
  const [open, setOpen] = useState(false)
  const [cancel] = useUserTransactionEditMutation()
  const [openPaymentPopup, setOpenPaymentPopup] = useState(false)
  const { id: transactionId } = useSelector((state: RootState) => state.transactionSlice.data)

  const payHandler = async () => {
    const { data } = await cancel({
      variables: {
        data: {
          transactionId,
          status: { step: Transaction_Status.Successful, isActive: true },
        },
      },
    })

    if (data?.userTransactionEdit?.statusCode === 200) {
      setOpen(false)
      setOpenPaymentPopup(true)
    }
  }

  return (
    <>
      <BottomSheet isVisible={open} onBackdropPress={() => setOpen(false)}>
        <View style={{ backgroundColor: theme.colors.white }}>
          <Container style={styles.bottomSheetContainer}>
            <View style={styles.textContainer}>
              <Text variant="heading2">{tr("Are you sure to finalize reservation?")}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <Button type="outline" containerStyle={styles.button} title={tr("No, Cancel")} onPress={() => setOpen(false)} />
              <Button containerStyle={styles.button} title={tr("Yes")} onPress={payHandler} />
            </View>
          </Container>
        </View>
      </BottomSheet>

      <Container>
        <View style={styles.container}>
          <Text variant="body1" style={{ color: theme.colors.grey2 }}>
            {tr("Total Amount")}
          </Text>
          <Text variant="body1">${totalPrice}</Text>
        </View>
        <Button disabled={!checkboxValue} size="lg" title={tr("Pay")} onPress={() => setOpen(true)} />
      </Container>

      <SuccessfulPaymentDetail openPaymentPopup={openPaymentPopup} setOpenPaymentPopup={setOpenPaymentPopup} totalPrice={totalPrice} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  bottomSheetContainer: {
    marginVertical: 24,
  },

  textContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 4,
  },
  button: {
    flex: 1,
    width: "100%",
  },
})

export default ConfirmPopup
