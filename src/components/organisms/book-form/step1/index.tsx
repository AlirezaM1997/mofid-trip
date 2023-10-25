import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@src/store"
import Container from "@src/components/atoms/container"
import useTranslation from "@src/hooks/translation"
import { Field, useFormikContext } from "formik"
import FieldDate from "@src/components/modules/formik/fields/date"
import WhiteSpace from "@atoms/white-space"

const BookFormStep1 = () => {
  const { tr } = useTranslation()
  const dispatch = useDispatch()
  const { data } = useSelector((state: RootState) => state.transactionSlice)
  const [isDatePickerVisible, setDatePickerVisible] = useState(false)
  const [activeInput, setActiveInput] = useState(null)

  const { handleChange, errors, values, setFieldTouched, setFieldValue } = useFormikContext()

  // const handleChange = (e, dateTime) => {
  //   if (e.type === "set") {
  //     if (activeInput === "checkin") {
  //       dispatch(
  //         setData({
  //           ...data,
  //           dateStart: dayjs(new Date(dateTime)).format("YYYY-MM-DD"),
  //         })
  //       )
  //     } else {
  //       dispatch(
  //         setData({
  //           ...data,
  //           dateEnd: dayjs(new Date(dateTime)).format("YYYY-MM-DD"),
  //         })
  //       )
  //     }
  //   }
  //   setActiveInput("")
  // }

  // const handleDateChangeForWeb = (e, type) => {
  //   if (type === "checkin") {
  //     dispatch(
  //       setData({
  //         ...data,
  //         dateStart: e.target.value,
  //       })
  //     )
  //   } else {
  //     dispatch(
  //       setData({
  //         ...data,
  //         dateEnd: e.target.value,
  //       })
  //     )
  //   }
  // }

  return (
    <View style={style.root}>
      <WhiteSpace size={10} />
      <Container>
        <Field component={FieldDate} name="dateStart" label={tr('check-in')} errorMessage={errors.dateStart} />
        <Field component={FieldDate} name="dateEnd" label={tr('check-out')} errorMessage={errors.dateEnd} />
      </Container>
    </View>
  )
}

const style = StyleSheet.create({
  containerStyle: { flex: 1 },
  root: { flex: 1 },
})

export default BookFormStep1
