import Container from "@atoms/container";
import Input from "@atoms/input";
import {
  BottomSheet,
  BottomSheetProps,
  Button,
  Slider,
  SliderProps,
  useTheme,
} from "@rneui/themed";
import { RateInputType, useRateAddMutation } from "@src/gql/generated";
import useTranslation from "@src/hooks/translation";
import { useState } from "react";
import { StyleSheet } from "react-native";

const RatingBottomSheet = (props: BottomSheetProps & SliderProps & RateInputType) => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  // const [rateAdd, {loading}] = useRateAddMutation({
  //   variables: 
  // })

  return (
    <BottomSheet {...props}>
      <Container>
        <Slider {...props} trackStyle={styles.trackStyle} thumbStyle={styles.thumbStyle(theme)} />
        <Input
          name="description"
          placeholder={tr("add your comment")}
          // onChangeText={handleChange("description")}
          // onBlur={handleBlur("description")}
          // value={values.description}
          // errorMessage={touched.description && (errors.description as string)}
          textAlignVertical="top"
          multiline={true}
          numberOfLines={4}
        />
        <Button>{tr("submit")}</Button>
      </Container>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  trackStyle: { height: 4, backgroundColor: "blue" },
  thumbStyle: theme => ({
    height: 15,
    width: 15,
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.black,
    borderWidth: 3,
  }),
});

export default RatingBottomSheet;
