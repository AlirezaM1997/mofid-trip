import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import BottomButtonLayout from "@components/layout/bottom-button";
import LoadingIndicator from "@modules/Loading-indicator";
import ComingSoon from "@modules/coming-soon";
import HostCreateTabs from "@modules/virtual-tabs/host-create-tabs";
import { Card, useTheme } from "@rneui/themed";
import { Text } from "@rneui/themed";
import { Button } from "@rneui/themed";
import { useCategoryListQuery } from "@src/gql/generated";
import useTranslation from "@src/hooks/translation";
import { setHostCreateData } from "@src/slice/host-create-slice";
import { RootState } from "@src/store";
import { router } from "expo-router";
import { Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const HostCreateHostTypeScreen = () => {
  const dispatch = useDispatch();
  const innerRef = useRef();
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const { data } = useSelector((state: RootState) => state.hostCreateSlice);
  const { loading, data: dataCategory } = useCategoryListQuery({
    variables: {
      page: {
        pageNumber: 1,
        pageSize: 99,
      },
    },
  });
  const [defaultValues, setDefaultValues] = useState([]);
  const initialValues = { categories: data.categories };
  const validationSchema = Yup.object().shape({
    categories: Yup.array()
      .required("This field is required")
      .min(1, "At least one item is required"),
  });

  const handlePress = categoryId => {
    const form = innerRef.current;
    if (form.values.categories.includes(categoryId)) {
      const newValues = form?.values.categories?.filter(cat => cat !== categoryId);
      form.setFieldValue("categories", newValues);
    } else {
      form.setFieldValue("categories", [...form?.values.categories, categoryId]);
    }
  };

  const handleSubmit = () => {
    const form = innerRef.current;
    dispatch(
      setHostCreateData({
        ...data,
        ...form.values,
      })
    );
    router.push({
      pathname: "host/create/address",
      params: {
        x: -100 * 2,
      },
    });
  };

  useEffect(() => {
    if (!loading && dataCategory) {
      setDefaultValues(dataCategory.categoryList.data);
    }
  }, [loading, data]);

  if (!defaultValues?.length) return <LoadingIndicator />;

  return (
    <Formik
      innerRef={innerRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ values, errors, touched, handleSubmit }) => (
        <BottomButtonLayout
          buttons={[
            <Button onPress={handleSubmit}>{tr("Next")}</Button>,
            <Button type="outline" color="secondary" onPress={() => router.back()}>
              {tr("back")}
            </Button>,
          ]}>
          <HostCreateTabs index={1} />

          <Container>
            <Text heading2>{tr("Host Type")}</Text>
            <Text type="grey3">
              {tr("Determine the type of space and your hosting environment.")}
            </Text>
          </Container>

          {defaultValues?.map(category => (
            <>
              <Card
                containerStyle={
                  values.categories?.includes(category.id)
                    ? styles.selectedCard(theme)
                    : styles.nonSelectedCard(theme)
                }>
                <Pressable onPress={() => handlePress(category.id)}>
                  <Container>
                    <WhiteSpace />
                    <Text>{category.name}</Text>
                    <WhiteSpace />
                  </Container>
                </Pressable>
              </Card>
              <WhiteSpace />
            </>
          ))}
        </BottomButtonLayout>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  selectedCard: theme => ({
    borderColor: theme.colors.info,
    borderWidth: 1,
  }),
  nonSelectedCard: theme => ({
    borderColor: "transparent",
    borderWidth: 1,
  }),
});

export default HostCreateHostTypeScreen;
