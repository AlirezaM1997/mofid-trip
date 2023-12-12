import { ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { BottomSheet, Button, CheckBox, Divider, Input, ListItem, Text } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import useTranslation from "@src/hooks/translation";
import { HEIGHT, WIDTH } from "@src/constants";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import { useURL } from "expo-linking";
import { useReportCategoryListQuery } from "@src/gql/generated";
import LoadingIndicator from "./Loading-indicator";
import { useLocalSearchParams } from "expo-router";
import * as Yup from "yup";
import { FieldArray, Formik } from "formik";

const Report = ({ closeMoreDetails }) => {
  const { name } = useLocalSearchParams();
  const { tr } = useTranslation();
  const url = useURL();
  const tour = url?.split("/")[3] === "tour";
  const [isVisible, setIsVisible] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  const { loading, data } = useReportCategoryListQuery();

  const handleOpen = () => {
    setIsVisible(true);
    closeMoreDetails();
  };
  const handleClose = () => setIsVisible(false);

  const initialValues = {
    CheckBox:[],
    texBox: "",
  };

  const validationSchema = Yup.object().shape({
    CheckBox:Yup.array(),
    texBox: Yup.string(),
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
          // validationSchema={validationSchema}
          onSubmit={values => console.log(values)}>
          {({ handleChange, setFieldValue, handleSubmit, values }) => (
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
                  <FieldArray name="checkBox">
                    {(arrayHelpers) =>
                      categoryList.map((category, index) => {
                        const arrFilter = values.CheckBox.filter(
                          p => p.date === category.date
                        );
                        return(<ListItem><CheckBox checked={arrFilter.length === category.arr?.length} title={category[index]}/></ListItem>)
                      })
                    }
                  </FieldArray>
                  {/* <View style={{ gap: 8 }}>
                    <CheckBox
                      title={categoryList[0]}
                      checked={values.s}
                      onPress={() => setFieldValue("s", !values.s)}
                    />
                    <Divider />
                    <CheckBox
                      title={categoryList[0]}
                      checked={values.ss}
                      onPress={() => setFieldValue("ss", !values.ss)}
                    />
                    <Divider />
                    <CheckBox
                      title={categoryList[0]}
                      checked={values.sss}
                      onPress={() => setFieldValue("sss", !values.sss)}
                    />
                    <Divider />
                    <CheckBox
                      title={categoryList[0]}
                      checked={values.ssss}
                      onPress={() => setFieldValue("ssss", !values.ssss)}
                    />
                    <Divider />
                    <CheckBox
                      title={categoryList[0]}
                      checked={values.sssss}
                      onPress={() => setFieldValue("sssss", !values.sssss)}
                    />
                    <Divider />
                    <CheckBox
                      title={categoryList[0]}
                      checked={values.ssssss}
                      onPress={() => setFieldValue("ssssss", !values.ssssss)}
                    />
                  </View> */}
                  {values.ssssss && (
                    <View style={{ gap: 8, paddingTop: 16 }}>
                      <Text caption>ye chizi benevis</Text>
                      <Input
                        placeholder="tozihat"
                        multiline={true}
                        onChangeText={handleChange("textBox")}
                      />
                    </View>
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
