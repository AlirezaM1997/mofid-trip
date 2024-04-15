import {
  AccountSettingLanguageChoices,
  GuestGenderEnum,
  TourPackageType,
} from "@src/gql/generated";
import React from "react";
import * as Yup from "yup";
import Input from "@atoms/input";
import { RootState } from "@src/store";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { Field, FieldArray, Formik } from "formik";
import Container from "@src/components/atoms/container";
import { useFormatPrice } from "@src/hooks/localization";
import WhiteSpace from "@src/components/atoms/white-space";
import { router, useLocalSearchParams } from "expo-router";
import { Button, Divider, Text, useTheme } from "@rneui/themed";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

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
  const { formatPrice } = useFormatPrice();
  const { localizeNumber } = useLocalizedNumberFormat();
  const { tourId, tourPackage } = useLocalSearchParams();
  const tourPackageObj: TourPackageType = JSON.parse(tourPackage as string);

  const { language } = useSelector((state: RootState) => state.settingDetailSlice.settingDetail);

  const defaultGuest = {
    birthday: "",
    lastname: "",
    firstname: "",
    phoneNumber: "",
    identifyNumber: "",
    gender: GuestGenderEnum.Male,
  };

  const handleBack = () => router.back();

  return (
    <>
      <Formik
        validationSchema={Yup.object({
          guests: Yup.array().of(
            Yup.object().shape({
              firstname: Yup.string().required(tr("First name is required")),
              lastname: Yup.string().required(tr("Last name is required")),
              phoneNumber: Yup.string().required(tr("Phone number name is required")),
              birthday: Yup.string().required(tr("Birth day is required")),
              identifyNumber: Yup.string().required(tr("Identify number day is required")),
            })
          ),
        })}
        initialValues={{
          guests: [defaultGuest],
        }}
        onSubmit={values => {
          // Handle form submission with values
          router.push({
            pathname: `/tour/${tourId}/reservation/add/step-2`,
            params: {
              tourId,
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
                <Text heading2 bold>
                  {tr("Passengers Info")}
                </Text>
                <Text>
                  {tr(
                    "to request and reserve the tour, enter your details and those of your accompanying passengers."
                  )}
                </Text>

                <WhiteSpace size={10} />

                <Text bold>{tr("Your selected package")}</Text>
                <View style={style.row}>
                  <Text>{tourPackageObj?.title}</Text>
                  <Text>{localizeNumber(formatPrice(tourPackageObj?.price) as string)}</Text>
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
                                    {index === 0 ? (
                                      <Text>اطلاعات سرگروه</Text>
                                    ) : language === AccountSettingLanguageChoices.EnUs ? (
                                      tr(numbers[index]) + " " + tr("passenger info")
                                    ) : (
                                      tr("passenger info") + " " + tr(numbers[index])
                                    )}
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
                                type="email"
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
                                  maxLength={11}
                                  value={guest.phoneNumber}
                                  name={`guests[${index}].phoneNumber`}
                                  placeholder={tr("Phone Number")}
                                  onChangeText={handleChange(`guests[${index}].phoneNumber`)}
                                  onBlur={handleBlur(`guests[${index}].phoneNumber`)}
                                  onKeyPress={(event) => {
                                    if (!(Number(event.key) >= 0 && Number(event.key) <= 9) && event.key != 'Backspace') {
                                      event.preventDefault();
                                    }
                                  }}
                                  errorMessage={
                                    touched?.guests?.[index]?.phoneNumber &&
                                    errors?.guests?.[index]?.phoneNumber
                                  }
                                />
                                <Field
                                  component={Input}
                                  required
                                  maxLength={10}
                                  value={guest.identifyNumber}
                                  name={`guests[${index}].identifyNumber`}
                                  placeholder={tr("Identify Number")}
                                  onChangeText={handleChange(`guests[${index}].identifyNumber`)}
                                  onBlur={handleBlur(`guests[${index}].identifyNumber`)}
                                  onKeyPress={(event) => {
                                    if (!(Number(event.key) >= 0 && Number(event.key) <= 9) && event.key != 'Backspace') {
                                      event.preventDefault();
                                    }
                                  }}
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
