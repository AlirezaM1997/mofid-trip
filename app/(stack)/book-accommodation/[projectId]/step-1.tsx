import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Divider, Text, useTheme } from "@rneui/themed";
import Container from "@src/components/atoms/container";
import useTranslation from "@src/hooks/translation";
import WhiteSpace from "@src/components/atoms/white-space";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/store";
import * as Yup from "yup";
import { Formik } from "formik";
import { router } from "expo-router";
import { Platform } from "react-native";
import { setData } from "@src/slice/transaction-slice";
import BookFormStep1 from "@organisms/book-form/step1";

export default () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.projectSlice.projectDetail);
  const { data } = useSelector((state: RootState) => state.transactionSlice);

  return (
    <>
      <WhiteSpace size={20} />
      <Container>
        <Text bold>{tr("Passengers Info")}</Text>
        <Text>
          {tr(
            "to request and reserve the tour, enter your details and those of your accompanying passengers."
          )}
        </Text>
      </Container>

      <Formik
        initialValues={data}
        validationSchema={Yup.object({
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
        onSubmit={values => {
          router.push(`/book-accommodation/${id}/step-3`);
          dispatch(setData(values));
        }}>
        {({ handleSubmit }) => (
          <>
            <BookFormStep1 />
            <View style={style.container(theme)}>
              <Divider />
              <Container>
                <WhiteSpace size={10} />
                <View style={style.row}>
                  <Button size="lg" containerStyle={style.btn} onPress={handleSubmit}>
                    {tr("Next")}
                  </Button>
                  <Button
                    size="lg"
                    containerStyle={style.btn}
                    onPress={() => router.push(`/book-accommodation/${id}/step-1`)}
                    color="secondary">
                    {tr("Back")}
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
  },
  btn: {
    flex: 1,
  },
});
