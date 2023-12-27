import { ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { BottomSheet, Button, CheckBox, Divider, Input, ListItem, Text } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import useTranslation from "@src/hooks/translation";
import { HEIGHT } from "@src/constants";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import { useURL } from "expo-linking";
import {
  ReportTypeEnum,
  useReportAddMutation,
  useReportCategoryListQuery,
} from "@src/gql/generated";
import LoadingIndicator from "./Loading-indicator";
import { useLocalSearchParams } from "expo-router";
import * as Yup from "yup";
import { FieldArray, Formik } from "formik";

const Report = ({ closeMoreDetails }) => {
  const { name, id } = useLocalSearchParams();
  const { tr } = useTranslation();
  const url = useURL();
  const tour = url?.split("/")[3] === "tour";
  const [isVisible, setIsVisible] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  const [reportAdd] = useReportAddMutation();

  const { loading, data } = useReportCategoryListQuery();

  const handleOpen = () => {
    setIsVisible(true);
    closeMoreDetails();
  };

  const handleClose = () => setIsVisible(false);

  const handleًReport = variables => {
    reportAdd({
      variables: {
        data: {
          objectId: +id,
          objectType: tour ? ReportTypeEnum.Tour : ReportTypeEnum.Project,
          types: variables.checkBoxList.filter(item => item.checked === true).map(item => item.id),
          description: variables.checkBoxList[variables.checkBoxList.length - 1]
            ? variables.textBox
            : "",
        },
      },
    });
    handleClose();
  };

  const initialValues = {
    checkBoxList: categoryList.map(item => ({ id: item.id, checked: false })),
    textBox: "",
  };

  const validationSchema = Yup.object().shape({
    checkBoxList: Yup.array()
      .of(
        Yup.object({
          id: Yup.string(),
          checked: Yup.boolean(),
        })
      )
      .test("at-least-one-true", "یکی از گزینه های بالا را انتخاب کنید*", function (value) {
        return value.some(obj => obj.checked === true);
      }),
    textBox: Yup.string().when("checkBoxList", {
      is: checkBoxList => checkBoxList[checkBoxList.length - 1].checked === true,
      then: () => Yup.string().required("توضیجی بنویسید*"),
      otherwise: () => Yup.string(),
    }),
  });

  useEffect(() => {
    if (!loading && data) {
      setCategoryList(data.reportCategoryList.data);
    }
  }, [loading, data]);

  if (loading) return <LoadingIndicator />;

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
          onSubmit={handleًReport}>
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            setFieldTouched,
            touched,
            values,
            errors,
          }) => (
            <>
              <ScrollView style={{ maxHeight: HEIGHT }}>
                <View style={{ minHeight: HEIGHT, justifyContent: "space-between" }}>
                  <Container>
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
                        return checkBoxList?.map((obj, index) => (
                          <ListItem
                            bottomDivider
                            containerStyle={{ direction: "rtl", paddingHorizontal: 0 }}
                            key={index}>
                            <CheckBox
                              checked={obj.checked}
                              title={categoryList[index].name}
                              name={`checkBoxList[${index}]`}
                              onPress={() =>
                                replace(index, {
                                  id: categoryList[index].id,
                                  checked: !obj.checked,
                                })
                              }
                            />
                          </ListItem>
                        ));
                      }}
                    </FieldArray>
                    {touched.checkBoxList && errors.checkBoxList && (
                      <>
                        <WhiteSpace />
                        <Text caption type="error">
                          {errors.checkBoxList}
                        </Text>
                      </>
                    )}

                    {values.checkBoxList[5].checked && (
                      <>
                        <View style={{ gap: 16, paddingTop: 8 }}>
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
                        {touched.textBox && errors.textBox && (
                          <>
                            <Text caption type="error">
                              {errors.textBox}
                            </Text>
                            <WhiteSpace />
                          </>
                        )}
                      </>
                    )}
                  </Container>
                  <View style={{ gap: 16, paddingBottom: 55 }}>
                    <Divider />
                    <Container>
                      <Button
                        onPress={() => {
                          handleSubmit();
                          setFieldTouched("checkBoxList");
                          setFieldTouched("textBox");
                        }}>
                        {tr("confirm and send")}
                      </Button>
                    </Container>
                  </View>
                </View>
              </ScrollView>
            </>
          )}
        </Formik>
      </BottomSheet>
    </>
  );
};

export default Report;
