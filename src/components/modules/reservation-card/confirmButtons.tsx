import { View } from "react-native"
import React, { useState } from "react"
import { Pressable } from "react-native"
import { BottomSheet, Button, Divider } from "@rneui/themed"
import { StyleSheet } from "react-native"
import { useDispatch } from "react-redux"
import Toast from "react-native-toast-message"
import { setData } from "@src/slice/transaction-slice"
import { useNavigation } from "@react-navigation/native"
import { StatusInputType, Transaction_Status, useUserTransactionEditMutation } from "@src/gql/generated"
import SuccessfulPaymentDetail from "../payment-detail/paymentDetails"
import { Feather } from "@expo/vector-icons"
import Container from "@src/components/atoms/container"
import Text from "@src/components/atoms/text"
import WhiteSpace from "@src/components/atoms/white-space"
import useTranslation from "@src/hooks/translation"

type PropsType = {
  transactionId: string
  apiTransactionStep: string
  status: { step: string | number; isActive: boolean }
  setStatus: (status: { step: string | number; isActive: boolean }) => void
  onCancelRequest: () => {}
}

const ConfirmButton = ({ apiTransactionStep, status, setStatus, transactionId, onCancelRequest }: PropsType) => {
  const { tr } = useTranslation()
  const navigation = useNavigation()
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const dispatch = useDispatch()

  const [cancel] = useUserTransactionEditMutation()

  const onCancel = async () => setIsVisible(true)

  const handleCancel = async () => {
    const newStatus = {
      step: apiTransactionStep === Transaction_Status.Accept ? Transaction_Status.Payment : apiTransactionStep,
      isActive: false,
    }
    setStatus(newStatus)

    const { data } = await cancel({
      variables: {
        data: {
          transactionId: transactionId,
          status: newStatus as StatusInputType,
        },
      },
    })

    if (data?.userTransactionEdit?.statusCode === 200) {
      Toast.show({
        type: "success",
        text1: "Successful",
        text2: data.userTransactionEdit.message,
      })
    }
    setIsVisible(false)
  }

  const payToReserve = () => {
    navigation.navigate("PayDetailScreen", {
      params: {
        transactionId: transactionId,
      },
    })
  }
  const openReserveBill = () => {
    dispatch(setData({ id: transactionId }))
    navigation.navigate("InvoiceScreen", {
      transactionId: transactionId,
    })
  }

  const buttonType = () => {
    const lookup = {
      REQUEST: {
        title: tr("Cancel Request"),
        type: "outline",
        changeHandler: onCancel,
        color: "secondary",
        cancel: false,
      },
      ACCEPT: {
        title: tr("Pay"),
        type: "solid",
        changeHandler: payToReserve,
        color: "primary",
        cancel: true,
      },
      SUCCESSFUL: {
        title: tr("View PDF Receipt"),
        type: "solid",
        changeHandler: openReserveBill,
        color: "primary",
        cancel: false,
      },
    }
    if (!status.isActive) return { title: tr("Rejected"), type: "solid", disabled: true }
    if (status.step in lookup) return lookup[status.step]
  }

  return (
    <>
      <View style={styles.buttonContainer}>
        {buttonType()?.cancel && <Button title={tr("Cancel Request")} color="secondary" type="outline" onPress={onCancel} containerStyle={styles.button} />}

        <Button
          type={buttonType()?.type}
          title={buttonType()?.title}
          color={buttonType()?.color}
          containerStyle={styles.button}
          disabled={buttonType()?.disabled}
          onPress={buttonType()?.changeHandler}
        />
      </View>
      <BottomSheet isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
        <Pressable style={styles.close} onPress={() => setIsVisible(false)}>
          <Feather name="x-circle" size={24} color="transparent" />
          <Text variant="heading1">{tr("Delete")}</Text>
          <Feather name="x-circle" size={24} color="black" />
        </Pressable>
        <Divider />
        <View style={styles.contentContainerStyle}>
          <Container>
            <WhiteSpace size={10} />
            <Text style={styles.centerText} variant="body1">{tr("Are you sure to cancel?")}</Text>
            <WhiteSpace size={10} />
            <Button onPress={handleCancel}>{tr("Yes")}</Button>
            <WhiteSpace size={10} />
          </Container>
        </View>
      </BottomSheet>
    </>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 6,
  },
  button: {
    flex: 1,
    width: "100%",
  },
  close: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    padding: 10,
    backgroundColor: "#fff",
  },
  contentContainerStyle: { backgroundColor: "#fff" },
  centerText: {
    textAlign: 'center'
  }
})

export default ConfirmButton
