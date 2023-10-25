import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/store";
import GuestFormItem from "@src/components/organisms/guest-form-item";
import { Button, Divider } from "@rneui/themed";
import { defaultGuest, setData } from "@src/slice/transaction-slice";
import WhiteSpace from "@src/components/atoms/white-space";
import Container from "@src/components/atoms/container";
import useTranslation from "@src/hooks/translation";
import { useFormikContext } from "formik";

const BookFormStep2 = () => {
  const { tr } = useTranslation();
  // TODO: remove this line and all dependencies
  // const { data } = useSelector((state: RootState) => state.transactionSlice);
  const { values, setValues } = useFormikContext();
  const lastGuestId = useRef(2);

  const handleAddGuest = () => {
    setValues({
      ...values,
      guests: [...values.guests, { id: lastGuestId.current, ...defaultGuest }],
    });
    lastGuestId.current = lastGuestId.current + 1;
  };

  return (
    <View style={style.container}>
      {values?.guests.map((g, index) => (
        <GuestFormItem key={index + "g"} index={index} />
      ))}
      <Container>
        <Button color="secondary" size="lg" onPress={handleAddGuest}>
          {tr("Add Guest")}
        </Button>
      </Container>
      <WhiteSpace size={80} />
    </View>
  );
};

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
});

export default BookFormStep2;
