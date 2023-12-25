import { ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { BottomSheet, Button, CheckBox, Divider, Input, ListItem, Text } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import useTranslation from "@src/hooks/translation";
import { HEIGHT, WIDTH } from "@src/constants";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import { useURL } from "expo-linking";
import { useReportAddMutation, useReportCategoryListQuery } from "@src/gql/generated";
import LoadingIndicator from "./Loading-indicator";
import { useLocalSearchParams } from "expo-router";
import * as Yup from "yup";
import { FieldArray, Formik } from "formik";
import Toast from "react-native-toast-message";

const Report = ({ closeMoreDetails }) => {
  const { name } = useLocalSearchParams();
  const { tr } = useTranslation();
  const url = useURL();
  const tour = url?.split("/")[3] === "tour";
  const [isVisible, setIsVisible] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  // const [tempData , setTempData] = useState();

  const [reportAdd, { loading, data, error }] = useReportAddMutation();

  const { loading: loadingReportCapacityList, data: dataReportCapacityList } =
    useReportCategoryListQuery();

  const handleOpen = () => {
    setIsVisible(true);
    closeMoreDetails();
  };
  const handleClose = () => setIsVisible(false);

  // const handleSubmit = () => {
  //   reportAdd({
  //     variables: {
  //       data: tempData,
  //     },
  //   });
  // };

  const initialValues = {
    checkBoxList: new Array(categoryList.length).fill(false),
    textBox: "",
  };

  const validationSchema = Yup.object().shape({
    checkBoxList: Yup.array().test(
      "at-least-one-true",
      "At least one boolean must be true",
      array => array.some(value => value)
    ),
    textBox: Yup.string().when("checkBoxList", {
      is: checkBoxList => checkBoxList[checkBoxList.length - 1] === true,
      then: () => Yup.string().required("Field is required"),
      otherwise: () => Yup.string(),
    }),
  });

  // useEffect(() => {
  //   if (!loading && data) {
  //     Toast.show({
  //       type: "success",
  //       text1: tr("Successful"),
  //       text2: tr("Profile saved successfully"),
  //     });
  //   }
  //   if (error) {
  //     Toast.show({
  //       type: "error",
  //       text1: tr("Error"),
  //       text2: JSON.stringify(error.message),
  //     });
  //   }
  // }, [loading, data, error]);

  useEffect(() => {
    if (!loadingReportCapacityList && dataReportCapacityList) {
      setCategoryList(dataReportCapacityList.reportCategoryList.data);
    }
  }, [loadingReportCapacityList, dataReportCapacityList]);

  if (loadingReportCapacityList) return <LoadingIndicator />;

  return (
    <>
      <ListItem
        onPress={handleOpen}
        containerStyle={{
          direction: "rtl",
          paddingVertical: 10,
          borderBottomRightRadius: 8,
          borderBottomLeftRadius: 8,
        }}>
        <AntDesign name="warning" size={16} />
        <Text numberOfLines={1} body2>
          {tr("violation report")}
        </Text>
      </ListItem>

      <BottomSheet
        isVisible={isVisible}
        onBackdropPress={handleClose}
        containerStyle={{
          height: HEIGHT,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          justifyContent: "flex-end",
        }}>
        <Container
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Text caption type="grey3">
            {name}
          </Text>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <Text caption>{tr("violation report")}</Text>
            <AntDesign onPress={handleClose} name="close" size={16} />
          </View>
        </Container>
        <WhiteSpace size={8} />
        <Divider />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={values => console.log(values)}>
          {({ handleSubmit, handleChange, handleBlur, values }) => (
            <>
              <ScrollView style={{ maxHeight: HEIGHT }}>
                <Container style={{ minHeight: HEIGHT, position: "relative" }}>
                  <WhiteSpace size={24} />
                  <Text heading2>{tr("violation report")}</Text>
                  <WhiteSpace />
                  <Text caption type="grey2">
                    {tour
                      ? tr(
                          "if you see a problem in the tour, you can report this violation to the admin so that it can be addressed."
                        )
                      : tr(
                          "if you see a problem in the host, you can report this violation to the admin so that it can be addressed."
                        )}
                  </Text>
                  <FieldArray name="checkBoxList">
                    {({ form, replace }) => {
                      const { values } = form;
                      const { checkBoxList } = values;
                      return checkBoxList?.map((checked, index) => (
                        <ListItem
                          bottomDivider
                          containerStyle={{ direction: "rtl", paddingHorizontal: 0 }}
                          key={index}>
                          <CheckBox
                            checked={checked}
                            title={categoryList[index].name}
                            name={`checkBoxList[${index}]`}
                            onPress={() => replace(index, !checked)}
                          />
                        </ListItem>
                      ));
                    }}
                  </FieldArray>

                  {values.checkBoxList[5] && (
                    <>
                      <View style={{ gap: 16 }}>
                        <WhiteSpace />
                        <Text caption>
                          {tr("if you chose other, please also write a note and explanation")}
                        </Text>
                        <Input
                          name="textBox"
                          value={values.textBox}
                          onBlur={handleBlur("textBox")}
                          onChangeText={handleChange("textBox")}
                          placeholder={tr("description")}
                          multiline={true}
                          numberOfLines={4}
                        />
                      </View>
                    </>
                  )}
                </Container>
              </ScrollView>
              <View style={{ position: "absolute", bottom: 55, width: WIDTH, gap: 16 }}>
                <Divider />
                <Container>
                  <Button onPress={handleSubmit}>{tr("confirm and send")}</Button>
                </Container>
              </View>
            </>
          )}
        </Formik>
      </BottomSheet>
    </>
  );
};

export default Report;
