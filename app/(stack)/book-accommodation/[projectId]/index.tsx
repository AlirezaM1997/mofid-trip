import React, { useEffect, useState } from "react";
import { BackHandler, View, StyleSheet } from "react-native";
import { Button, Divider, useTheme } from "@rneui/themed";
import Text from "@src/components/atoms/text";
import BookFormStep3 from "@src/components/organisms/book-form/step3";
import BookFormStep2 from "@src/components/organisms/book-form/step2";
import BookFormStep1 from "@src/components/organisms/book-form/step1";
import Container from "@src/components/atoms/container";
import useTranslation from "@src/hooks/translation";
import WhiteSpace from "@src/components/atoms/white-space";
import { useSelector } from "react-redux";
import { RootState } from "@src/store";
import * as Yup from "yup";
import { Formik } from "formik";
import moment from "moment";
import { useUserTransactionAddMutation } from "@src/gql/generated";
import { router, useLocalSearchParams } from "expo-router";
import { Platform } from "react-native";
import { useIsAuthenticated } from "@src/hooks/user";

const BookAccommodation = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const [step, setStep] = useState(1);
  const isAuthenticated = useIsAuthenticated();
  const { projectId } = useLocalSearchParams();
  const { price, id } = useSelector(
    (state: RootState) => state.projectSlice.projectDetail
  );
  const { data } = useSelector((state: RootState) => state.transactionSlice);
  const [submit, {}] = useUserTransactionAddMutation();

  useEffect(() => {
    const handler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (step > 1) {
        setStep((step) => step - 1);
        // stay on page
        return true;
      } else {
        // exit the page
        return false;
      }
    });

    return () => {
      handler.remove();
    };
  }, [step]);

  return (
    <Formik
      initialValues={data}
      validationSchema={Yup.object({
        dateStart: Yup.date()
          .min(
            moment().format("YYYY-MM-DD"),
            "Date start can't be before today"
          )
          .required("Check-in is required")
          .typeError("Invalid Date"),
        dateEnd: Yup.date()
          .min(
            Yup.ref("dateStart"),
            "Departure date can't be before arrival date"
          )
          .required("Check-out is required")
          .typeError("Invalid Date"),
        guests: Yup.array().of(
          Yup.object().shape({
            name: Yup.string().required("Name is required"),
            // identifyNumber: Yup.string()
            //   .max(9, "Must be a most 8 characters")
            //   .matches(/^[A-Za-z]\d{8}$/, "Invalid passport number")
            //   .required("Passport number is required"),
          })
        ),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        if (!isAuthenticated)
          return router.push({
            pathname: "/authentication",
            params: { protectedScreen: `/book-accommodation/${id}` },
          });
        setSubmitting(true);
        await submit({
          variables: {
            data: {
              projectId: projectId,
              dateEnd: values.dateEnd,
              dateStart: values.dateStart,
              description: values.description,
              guests: values.guests.map((obj) => {
                const { id, ...newObj } = obj;
                return newObj;
              }),
            },
          },
        }).then(({ data }) => {
          if (data.userTransactionAdd.status === "OK") {
            setSubmitting(false);
            router.push("/reservation");
          }
        });
      }}
    >
      {({ handleSubmit, errors, values, isValid }) => (
        <>
          {step === 1 ? (
            <BookFormStep1 />
          ) : step === 2 ? (
            <BookFormStep2 />
          ) : step === 3 ? (
            <BookFormStep3 step={step} setStep={setStep} />
          ) : null}

          <View style={style.container(theme)}>
            <Divider />
            <Container>
              <WhiteSpace size={10} />
              {step === 3 ? (
                <View
                  style={{
                    height: 60,
                    display: "flex",
                    flexDirection: "row",
                    gap: 12,
                  }}
                >
                  <View style={style.priceContainer}>
                    <Text>{tr("Total Price")}</Text>
                    <Text variant="heading2" style={style.priceText}>
                      ${price}
                    </Text>
                  </View>
                  <Button
                    containerStyle={style.btnItem2}
                    size="lg"
                    onPress={handleSubmit}
                    disabled={!isValid}
                  >
                    {tr("Send Request")}
                  </Button>
                </View>
              ) : (
                <>
                  <View style={style.row}>
                    <Button
                      size="lg"
                      containerStyle={style.btn}
                      onPress={() => setStep(step - 1)}
                      color="secondary"
                      disabled={step === 1}
                    >
                      {tr("Back")}
                    </Button>
                    <Button
                      size="lg"
                      containerStyle={style.btn}
                      onPress={() => setStep(step + 1)}
                    >
                      {tr("Next")}
                    </Button>
                  </View>
                </>
              )}
            </Container>
          </View>
        </>
      )}
    </Formik>
  );
};

const style = StyleSheet.create({
  container: (theme) => ({
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
  },
  btn: {
    flex: 1,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  priceContainer: {
    flex: 1,
  },
  priceText: {
    fontWeight: "bold",
  },
  btnItem: {
    flex: 1,
  },
  btnItem2: {
    flex: 2,
  },
});

export default BookAccommodation;
