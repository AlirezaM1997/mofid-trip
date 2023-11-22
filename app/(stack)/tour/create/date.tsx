import * as Yup from "yup";
import { useState } from "react";
import { RootState } from "@src/store";
import { Field, Formik } from "formik";
import Container from "@atoms/container";
import { Button, Divider, Text } from "@rneui/themed";
import CustomCalender from "@modules/calender";
import { StyleSheet, View } from "react-native";
import TourCreateTab from "@modules/virtual-tabs";
import useTranslation from "@src/hooks/translation";
import { useDispatch, useSelector } from "react-redux";
import { MarkedDates } from "react-native-calendars/src/types";
import { setTourCreateData } from "@src/slice/tour-create-slice";
import BottomButtonLayout from "@components/layout/bottom-button";
import { router } from "expo-router";

const initialValues = { startDate: "", endDate: "" };

const Screen = () => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();

  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const { data } = useSelector((state: RootState) => state.tourCreateSlice);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(tr("Title is required")),
    description: Yup.string(),
  });

  const handleSubmit = values => {
    dispatch(
      setTourCreateData({
        ...data,
        ...values,
      })
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ values }) => (
        <BottomButtonLayout
          buttons={[
            <Button onPress={handleSubmit}>{tr("next")}</Button>,
            <Button type="outline" onPress={() => router.back()}>
              {tr("back")}
            </Button>,
          ]}>
          <TourCreateTab index={4} />

          <Container style={styles.container}>
            <View style={styles.header}>
              <Text heading2>{tr("tour date")}</Text>
              <Text caption type="grey2">
                {tr("choose a start and end date for the tour")}
              </Text>
            </View>

            <Field
              name="calender"
              markedDates={markedDates}
              component={CustomCalender}
              setMarkedDates={setMarkedDates}
            />

            <View style={styles.showDateContainer}>
              <Text body2>
                {tr("beginning")}: {Object.keys(markedDates)[0]}
              </Text>
              <Divider vertical={true} style={styles.divider} />
              <Text body2>
                {tr("end")}: {Object.keys(markedDates)[Object.keys(markedDates).length - 1]}
              </Text>
            </View>
          </Container>
        </BottomButtonLayout>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  header: { gap: 6 },
  container: { gap: 24 },
  divider: { width: 50 },
  showDateContainer: { flexDirection: "row", justifyContent: "space-evenly" },
});

export default Screen;
