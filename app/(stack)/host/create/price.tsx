import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import BottomButtonLayout from "@components/layout/bottom-button";
import HostCreateTabs from "@modules/virtual-tabs/host-create-tabs";
import { Badge, Divider, Input, Text, Button } from "@rneui/themed";
import { WIDTH } from "@src/constants";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { setHostCreateData } from "@src/slice/host-create-slice";
import { RootState } from "@src/store";
import { router } from "expo-router";
import { Formik } from "formik";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const HostCreatePriceScreen = () => {
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.hostCreateSlice);

  const recommendedPrices = [
    { title: localizeNumber(tr("Free")), value: 0 },
    { title: localizeNumber(tr("100,000 Tooman")), value: 100000 },
    { title: localizeNumber(tr("500,000 Tooman")), value: 500000 },
    { title: localizeNumber(tr("1,000,000 Tooman")), value: 1000000 },
    { title: localizeNumber(tr("2,000,000 Tooman")), value: 2000000 },
    { title: localizeNumber(tr("5,000,000 Tooman")), value: 5000000 },
  ];

  const recommendedDiscounts = [
    { title: localizeNumber("10%"), value: 10 },
    { title: localizeNumber("20%"), value: 20 },
    { title: localizeNumber("30%"), value: 30 },
    { title: localizeNumber("50%"), value: 50 },
  ];

  const validationSchema = Yup.object().shape({
    price: Yup.number()
      .positive(tr("Only positive numbers acceptable"))
      .typeError(tr("Only number acceptable"))
      .required(tr("Required")),
    discount: Yup.number()
      .positive()
      .max(100, tr("Discount can not be greater than 100"))
      .required(),
  });

  const initialValues = {
    price: data.price,
    discount: data.discount,
  };

  const handleSubmit = values => {
    dispatch(
      setHostCreateData({
        ...data,
        price: parseFloat(values.price),
        discount: parseFloat(values.discount),
      })
    );
    router.push({
      pathname: "host/create/images",
      params: {
        x: -95 * 7,
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit }) => (
        <BottomButtonLayout
          buttons={[
            <Button onPress={handleSubmit}>{tr("Next")}</Button>,
            <Button type="outline" color="secondary" onPress={() => router.back()}>
              {tr("back")}
            </Button>,
          ]}>
          <HostCreateTabs index={5} />
          <WhiteSpace />
          <Container>
            <Text heading2 bold>
              {tr("Host Price")}
            </Text>
            <Text>
              {tr(
                "Choose or write the cost of your host, you can give a discount to the original price."
              )}
            </Text>

            <WhiteSpace />

            <Input
              value={values.price?.toString()}
              label={tr("Price") + " (" + tr("Tooman") + ")"}
              onChangeText={handleChange("price")}
              onBlur={handleBlur("price")}
              errorMessage={touched.price && (errors.price as string)}
            />
            <View style={styles.badgeRow}>
              {recommendedPrices.map(recom => (
                <Badge
                  value={recom.title}
                  color="grey2"
                  type="solid"
                  containerStyle={styles.badgeContainerStyle}
                  badgeStyle={styles.badgeStyle}
                  onPress={() => setFieldValue("price", recom.value)}
                />
              ))}
            </View>
          </Container>

          <WhiteSpace />
          <Divider />
          <WhiteSpace />

          <Container>
            <Input
              value={values.discount}
              onChangeText={handleChange("discount")}
              onBlur={handleBlur("discount")}
              errorMessage={touched.discount && (errors.discount as string)}
              label={tr("Discount") + " (%)"}
            />
            <View style={styles.badgeRow}>
              {recommendedDiscounts.map(recom => (
                <Badge
                  value={recom.title}
                  color="grey2"
                  type="solid"
                  containerStyle={styles.badgeContainerStyle}
                  badgeStyle={styles.badgeStyle2}
                  onPress={() => setFieldValue("discount", recom.value)}
                />
              ))}
            </View>
          </Container>
        </BottomButtonLayout>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  badgeRow: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  badgeContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    flexGrow: 1,
  },
  badgeStyle: {
    minWidth: WIDTH / 2 - 85,
    paddingHorizontal: 0,
    alignSelf: "center",
    flexGrow: 1,
    width: "100%",
  },
  badgeStyle2: {
    minWidth: WIDTH / 4 - 100,
    paddingHorizontal: 0,
    alignSelf: "center",
    flexGrow: 1,
    width: "100%",
  },
});

export default HostCreatePriceScreen;
