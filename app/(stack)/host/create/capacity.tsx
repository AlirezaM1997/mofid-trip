import Container from "@atoms/container";
import Input from "@atoms/input";
import WhiteSpace from "@atoms/white-space";
import BottomButtonLayout from "@components/layout/bottom-button";
import ComingSoon from "@modules/coming-soon";
import HostCreateTabs from "@modules/virtual-tabs/host-create-tabs";
import { Button, CheckBox, Text, useTheme } from "@rneui/themed";
import { TourGenderEnum } from "@src/gql/generated";
import useTranslation from "@src/hooks/translation";
import { setHostCreateData } from "@src/slice/host-create-slice";
import { RootState } from "@src/store";
import { router } from "expo-router";
import { Formik } from "formik";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const HostCreateCapacityScreen = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { data } = useSelector((state: RootState) => state.hostCreateSlice);

  const initialValues = {
    capacityNumber: data.capacity.capacityNumber,
    gender: data.capacity.gender,
    childAccept: data.capacity.childAccept,
  };

  //TODO: the capacity number should accept persian number
  const validationSchema = Yup.object().shape({
    capacityNumber: Yup.number().positive().required(tr("Capacity is required")),
    gender: Yup.string(),
    childAccept: Yup.boolean(),
  });

  const handleSubmit = values => {
    dispatch(
      setHostCreateData({
        ...data,
        capacity: {
          ...values,
          capacityNumber: parseInt(values.capacityNumber),
        },
      })
    );
    router.push({
      pathname: "host/create/date",
      params: {
        x: -102 * 4,
      },
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
          <HostCreateTabs index={3} />
          <WhiteSpace size={20} />
          <Container>
            <Text heading2 bold>
              {tr("Capacity and Gender")}
            </Text>
            <Text type="grey3">{tr("Select the capacity and gender of the host passengers")}</Text>
            <WhiteSpace size={20} />
            <Input
              name="capacityNumber"
              placeholder={tr("enter the capacity (quantity)")}
              textAlignVertical="top"
              onChangeText={handleChange("capacityNumber")}
              onBlur={handleBlur("capacityNumber")}
              value={values.capacityNumber}
              errorMessage={touched.capacityNumber && (errors.capacityNumber as string)}
            />

            <CheckBox
              checked={values.childAccept}
              title={tr("The host is open to children under 12 years old")}
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
  checkboxContainerStyle: theme => ({
    backgroundColor: theme.colors.grey0,
    borderColor: theme.colors.grey1,
    borderWidth: 2,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 8,
    flex: 1,
  }),
  checkboxListContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  checkbox: {
    backgroundColor: "transparent",
  },
});

export default HostCreateCapacityScreen;
