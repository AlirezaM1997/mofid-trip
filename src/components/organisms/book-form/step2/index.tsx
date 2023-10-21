import React from "react"
import { StyleSheet, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@src/store"
import GuestFormItem from "@src/components/organisms/guest-form-item"
import { Button, Divider } from "@rneui/themed"
import { defaultGuest, setData } from "@src/slice/transaction-slice"
import WhiteSpace from "@src/components/atoms/white-space"
import Container from "@src/components/atoms/container"
import useTranslation from "@src/hooks/translation"
import { useNavigation } from "@react-navigation/native"
import { useFormikContext } from "formik"

const BookFormStep2 = () => {
  const { tr } = useTranslation()
  const dispatch = useDispatch()
  const { data } = useSelector((state: RootState) => state.transactionSlice)
  const { values, errors } = useFormikContext()

  const handleAddGuest = () => {
    dispatch(
      setData({
        ...data,
        guests: [...data.guests, { id: data.guests.length + 1, ...defaultGuest }],
      })
    )
  }

  return (
    <View style={style.container}>
      {data.guests.map((g, index) => (
        <GuestFormItem key={index} guest={g} index={index} values={values} errors={errors} />
      ))}
      <WhiteSpace size={10} />
      <Container>
        <Button color="secondary" size="lg" onPress={handleAddGuest}>
          {tr("Add Guest")}
        </Button>
      </Container>
    </View>
  )
}

const style = StyleSheet.create({
  container: { marginBottom: 50, flex: 1 },
  row: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
  },
  btn: {
    flex: 1,
  },
})

export default BookFormStep2
