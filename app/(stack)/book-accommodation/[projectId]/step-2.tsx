import React from "react";
import { Text } from "@rneui/themed";
import Container from "@src/components/atoms/container";
import useTranslation from "@src/hooks/translation";
import WhiteSpace from "@src/components/atoms/white-space";
import { View, StyleSheet } from "react-native";
import { Button, Divider, useTheme } from "@rneui/themed";
import { useSelector } from "react-redux";
import { RootState } from "@src/store";
import { Formik } from "formik";
import { useProjectTransactionAddMutation } from "@src/gql/generated";
import { router, useLocalSearchParams } from "expo-router";
import { Platform } from "react-native";

export default () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { projectId } = useLocalSearchParams();
  const { price, id } = useSelector((state: RootState) => state.projectSlice.projectDetail);
  const { data } = useSelector((state: RootState) => state.transactionSlice);
  const [submit, {}] = useProjectTransactionAddMutation();

  return (
    <Formik
      initialValues={data}
      onSubmit={values => {
        submit({
          variables: {
            data: {
              projectId: projectId,
              dateEnd: values.dateEnd,
              dateStart: values.dateStart,
              description: values.description,
              guests: values.guests.map(obj => {
                const { id, ...newObj } = obj;
                return newObj;
              }),
            },
          },
        }).then(({ data }) => {
          if (data.projectTransactionAdd.status === "OK") {
            router.push("/reservation");
          }
        });
      }}>
      {({ handleSubmit, isValid }) => (
        <>
          <View style={style.container(theme)}>
            <Divider />
            <Container>
              <WhiteSpace size={10} />
              <View
                style={{
                  height: 60,
                  display: "flex",
                  flexDirection: "row",
                  gap: 12,
                }}>
                <Button
                  containerStyle={style.btnItem2}
                  size="lg"
                  onPress={handleSubmit}
                  disabled={!isValid}>
                  {tr("Send Request")}
                </Button>
              </View>
            </Container>
          </View>
        </>
      )}
    </Formik>
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
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  btnItem: {
    flex: 1,
  },
  btnItem2: {
    flex: 2,
  },
});
