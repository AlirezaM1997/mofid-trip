import * as Yup from "yup";
import { Formik } from "formik";
import { RootState } from "@src/store";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import { StyleSheet, View, ViewStyle } from "react-native";
import { TourGenderEnum } from "@src/gql/generated";
import useTranslation from "@src/hooks/translation";
import { useDispatch, useSelector } from "react-redux";
import { router, useLocalSearchParams } from "expo-router";
import BottomButtonLayout from "@components/layout/bottom-button";
import { Button, CheckBox, Text, useTheme } from "@rneui/themed";
import { setHostTransactionData } from "@src/slice/host-transaction-slice";
import Input from "@atoms/input";

const Screen = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const { projectId, name } = useLocalSearchParams();
  const { data } = useSelector((state: RootState) => state.hostTransactionSlice);

  const initialValues = {
    gender: data.guests.gender,
    guestNumber: data.guests.guestNumber || "",
    childAccept: data.guests.childAccept,
  };

  const validationSchema = Yup.object().shape({
    guestNumber: Yup.number()
      .positive(tr("capacity is required"))
      .required(tr("capacity is required")),
    gender: Yup.string(),
    childAccept: Yup.boolean(),
  });

  const handleSubmit = values => {
    dispatch(
      setHostTransactionData({
        ...data,
        guests: { ...values, guestNumber: +values.guestNumber },
      })
    );

    router.push({
      pathname: "host/transaction/add/date",
      params: { projectId, name },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ handleChange, handleBlur, setFieldValue, handleSubmit, values, touched, errors }) => (
        <BottomButtonLayout
          buttons={[
            <Button onPress={handleSubmit}>{tr("Next")}</Button>,
            <Button type="outline" color="secondary" onPress={() => router.back()}>
              {tr("back")}
            </Button>,
          ]}>
          <WhiteSpace size={20} />
          <Container>
            <Text heading2 bold>
              {tr("capacity and Gender")}
            </Text>
            <Text type="grey3">{tr("Select the capacity and gender of the tour passengers")}</Text>
            <WhiteSpace size={20} />
            <Input
              name="guestNumber"
              placeholder={tr("enter the capacity (quantity)")}
              textAlignVertical="top"
              onChangeText={handleChange("guestNumber")}
              onBlur={handleBlur("guestNumber")}
              value={values.guestNumber}
              errorMessage={touched.guestNumber && (errors.guestNumber as string)}
            />

            <CheckBox
              checked={values.childAccept}
              title={tr("The tour is open to children under 12 years old")}
              onPress={() => setFieldValue("childAccept", !values.childAccept)}
            />

            <WhiteSpace size={10} />

            <View style={styles.checkboxListContainer}>
              <View style={styles.checkboxContainerStyle(theme)}>
                <CheckBox
                  containerStyle={styles.checkbox}
                  checked={values.gender === TourGenderEnum.Both}
                  title={tr("both")}
                  onPress={() => setFieldValue("gender", TourGenderEnum.Both)}
                  iconType="material-community"
                  checkedIcon="radiobox-marked"
                  uncheckedIcon="radiobox-blank"
                />
              </View>
              <View style={styles.checkboxContainerStyle(theme)}>
                <CheckBox
                  containerStyle={styles.checkbox}
                  checked={values.gender === TourGenderEnum.Male}
                  title={tr("male")}
                  onPress={() => setFieldValue("gender", TourGenderEnum.Male)}
                  iconType="material-community"
                  checkedIcon="radiobox-marked"
                  uncheckedIcon="radiobox-blank"
                />
              </View>
              <View style={styles.checkboxContainerStyle(theme)}>
                <CheckBox
                  containerStyle={styles.checkbox}
                  checked={values.gender === TourGenderEnum.Female}
                  title={tr("female")}
                  onPress={() => setFieldValue("gender", TourGenderEnum.Female)}
                  iconType="material-community"
                  checkedIcon="radiobox-marked"
                  uncheckedIcon="radiobox-blank"
                />
              </View>
            </View>
          </Container>
        </BottomButtonLayout>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  checkboxContainerStyle: (theme => ({
    backgroundColor: theme.colors.grey0,
    borderColor: theme.colors.grey1,
    borderWidth: 2,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 8,
    flex: 1,
  })) as ViewStyle,
  checkboxListContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  checkbox: {
    backgroundColor: "transparent",
  },
});

export default Screen;
