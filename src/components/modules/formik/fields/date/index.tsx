import { Input, InputProps } from "@rneui/themed"
import Modal from "@src/components/atoms/modal"
import DatePicker from "@src/components/modules/datepicker"
import { FieldProps, useFormikContext } from "formik"
import moment from "moment"
import { useState } from "react"

type FieldDateProps = InputProps & FieldProps

export default function FieldDate({ field, form, meta, ...inputProps }: FieldDateProps) {
  const [open, setOpen] = useState(false)
  const { setFieldValue } = useFormikContext()
  const onFocus = () => setOpen(true)

  return (
    <>
      <Input value={field.value} onFocus={onFocus} onPressIn={() => setOpen(true)} showSoftInputOnFocus={false} {...inputProps} />
      <Modal visible={open}>
          <DatePicker
            onDayPress={(dayPressed) => {
              setFieldValue(field.name, moment(dayPressed).add(-1, "day").format("YYYY-MM-DD"))
              setOpen(false)
            }}
          />
        </Modal>
    </>
  )
}
