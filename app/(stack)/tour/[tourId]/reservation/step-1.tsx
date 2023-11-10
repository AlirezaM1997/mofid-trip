import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Divider, useTheme } from "@rneui/themed";
import Container from "@src/components/atoms/container";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import WhiteSpace from "@src/components/atoms/white-space";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/store";
import * as Yup from "yup";
import { Field, FieldArray, Formik } from "formik";
import { router, useLocalSearchParams } from "expo-router";
import { Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { GuestGenderEnum, TourPackageType } from "@src/gql/generated";
import Input from "@atoms/input";
import { Text } from "@rneui/themed";
import useTourTable from "@src/hooks/db/tour";
import numbro from "numbro";
import { formatPrice } from "@src/helper/extra";

const defaultGuest = {
  firstname: "",
  lastname: "",
  phoneNumber: "",
  identifyNumber: "",
  birthday: "",
  gender: GuestGenderEnum.Male,
};

const numbers = [
  "First",
  "Second",
  "Third",
  "Fourth",
  "Fifth",
  "Sixth",
  "Seventh",
  "Eighth",
  "Ninth",
  "Tenth",
  "Eleventh",
  "Twelfth",
  "Thirteenth",
  "Fourteenth",
  "Fifteenth",
  "Sixteenth",
  "Seventeenth",
  "Eighteenth",
  "Nineteenth",
  "Twentieth",
  "Twenty-first",
  "Twenty-second",
  "Twenty-third",
  "Twenty-fourth",
  "Twenty-fifth",
  "Twenty-sixth",
  "Twenty-seventh",
  "Twenty-eighth",
  "Twenty-ninth",
  "Thirtieth",
  "Thirty-first",
  "Thirty-second",
  "Thirty-third",
  "Thirty-fourth",
  "Thirty-fifth",
  "Thirty-sixth",
  "Thirty-seventh",
  "Thirty-eighth",
  "Thirty-ninth",
  "Fortieth",
  "Forty-first",
  "Forty-second",
  "Forty-third",
  "Forty-fourth",
  "Forty-fifth",
  "Forty-sixth",
  "Forty-seventh",
  "Forty-eighth",
  "Forty-ninth",
  "Fiftieth",
];

export default () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { tourId, tourPackage } = useLocalSearchParams();
  const { findById } = useTourTable();
  const tour = findById(tourId as string);
  const tourPackageObj: TourPackageType = JSON.parse(tourPackage as string);
  const { localizeNumber } = useLocalizedNumberFormat();

  const handleBack = () => router.back();

  return (
    <>
      <Formik
        validationSchema={Yup.object({
          guests: Yup.array().of(
            Yup.object().shape({
              firstname: Yup.string().required("First name is required"),
              lastname: Yup.string().required("Last name is required"),
              phoneNumber: Yup.string().required("Phone number name is required"),
              birthday: Yup.string().required("Birth day is required"),
              identifyNumber: Yup.string().required("Identify number day is required"),
            })
          ),
        })}
        initialValues={{
          guests: [defaultGuest],
        }}
        onSubmit={values => {
          // Handle form submission with values
          console.log(values);
          router.push({
            pathname: `/tour/${tour.id}/reservation/step-2`,
            params: {
              tourId: tour.id,
              guests: JSON.stringify(values.guests),
              tourPackage: tourPackage,
            },
          });
        }}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <>
            <ScrollView style={style.scrollView}>
              <Container>
                <WhiteSpace size={20} />
                <Text heading2>{tr("Passengers Info")}</Text>
                <Text>
                  {tr(
                    "to request and reserve the tour, enter your details and those of your accompanying passengers."
                  )}
                </Text>

                <WhiteSpace size={10} />

                <Text bold>{tr("Your selected package")}</Text>
                <View style={style.row}>
                  <Text>{tourPackageObj.title}</Text>
                  <Text>{localizeNumber(formatPrice(tourPackageObj.price))}</Text>
                </View>

                <View>
                  <FieldArray
                    name="guests"
                    render={({ remove, push }) => (
                      <View>
                        {values.guests && values.guests.length > 0
                          ? values.guests.map((guest, index) => (
                              <View key={index}>
                                <View style={style.row}>
                                  <Text heading2>
                                    {tr(numbers[index]) + " " + tr("passenger info")}
                                  </Text>
                                  <Button
                                    title={tr("delete")}
                                    type="clear"
                                    onPress={() => remove(index)}
                                    color="error"
                                    size="sm"
                                  />
                                </View>
                                <Field
                                  component={Input}
                                  required
                                  value={guest.firstname}
                                  name={`guests[${index}].firstname`}
                                  placeholder={tr("First Name")}
                                  onChangeText={handleChange(`guests[${index}].firstname`)}
                                  onBlur={handleBlur(`guests[${index}].firstname`)}
                                  errorMessage={
                                    touched?.guests?.[index]?.firstname &&
                                    errors?.guests?.[index]?.firstname
                                  }
                                />
                                <Field
                                  component={Input}
                                  required
                                  value={guest.lastname}
                                  name={`guests[${index}].lastname`}
                                  placeholder={tr("Last Name")}
                                  onChangeText={handleChange(`guests[${index}].lastname`)}
                                  onBlur={handleBlur(`guests[${index}].lastname`)}
                                  errorMessage={
                                    touched?.guests?.[index]?.lastname &&
                                    errors?.guests?.[index]?.lastname
                                  }
                                />
                                <Field
                                  component={Input}
                                  required
                                  value={guest.phoneNumber}
                                  name={`guests[${index}].phoneNumber`}
                                  placeholder={tr("Phone Number")}
                                  onChangeText={handleChange(`guests[${index}].phoneNumber`)}
                                  onBlur={handleBlur(`guests[${index}].phoneNumber`)}
                                  errorMessage={
                                    touched?.guests?.[index]?.phoneNumber &&
                                    errors?.guests?.[index]?.phoneNumber
                                  }
                                />
                                <Field
                                  component={Input}
                                  required
                                  value={guest.identifyNumber}
                                  name={`guests[${index}].identifyNumber`}
                                  placeholder={tr("Identify Number")}
                                  onChangeText={handleChange(`guests[${index}].identifyNumber`)}
                                  onBlur={handleBlur(`guests[${index}].identifyNumber`)}
                                  errorMessage={
                                    touched?.guests?.[index]?.identifyNumber &&
                                    errors?.guests?.[index]?.identifyNumber
                                  }
                                />
                                <Field
                                  component={Input}
                                  required
                                  value={guest.birthday}
                                  name={`guests[${index}].birthday`}
                                  placeholder={tr("Birthday")}
                                  onChangeText={handleChange(`guests[${index}].birthday`)}
                                  onBlur={handleBlur(`guests[${index}].birthday`)}
                                  errorMessage={
                                    touched?.guests?.[index]?.birthday &&
                                    errors?.guests?.[index]?.birthday
                                  }
                                  type="date"
                                />
                              </View>
                            ))
                          : null}
                        <Button onPress={() => push(defaultGuest)} type="outline" color="secondary">
                          <Feather name="plus-circle" size={24} color={theme.colors.black} />
                          {tr("Add new passenger")}
                        </Button>
                      </View>
                    )}
                  />
                </View>
              </Container>
              <WhiteSpace size={100} />
            </ScrollView>
            <View style={style.container(theme)}>
              <Divider />
              <Container>
                <WhiteSpace size={10} />
                <View style={style.row}>
                  <Button
                    size="lg"
                    containerStyle={style.btn}
                    color="secondary"
                    type="outline"
                    onPress={handleBack}>
                    {tr("Back")}
                  </Button>
                  <Button size="lg" containerStyle={style.btn} onPress={handleSubmit}>
                    {tr("Next")}
                  </Button>
                </View>
              </Container>
            </View>
          </>
        )}
      </Formik>
    </>
  );
};

const style = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: theme => ({
    backgroundColor: theme.colors.white,
    flex: 1,
    ...Platform.select({
      web: {
        position: "fixed",
        bottom: 0,
        width: "100%",
      },
    }),
  }),
  row: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    flex: 1,
  },
});
