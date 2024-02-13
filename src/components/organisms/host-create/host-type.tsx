import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import LoadingIndicator from "@modules/Loading-indicator";
import useTranslation from "@src/hooks/translation";
import { Card, CheckBox, useTheme } from "@rneui/themed";
import { Text } from "@rneui/themed";
import { ProjectAddInputType, useCategoryListQuery } from "@src/gql/generated";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

const TabHostType = () => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const { loading, data } = useCategoryListQuery({
    variables: {
      page: {
        pageNumber: 1,
        pageSize: 99,
      },
    },
  });
  const [defaultValues, setDefaultValues] = useState([]);
  const { values, setFieldValue } = useFormikContext<ProjectAddInputType>();

  const handlePress = categoryId => {
    if (values.categories.includes(categoryId)) {
      const newValues = values.categories?.filter(cat => cat !== categoryId);
      setFieldValue("categories", newValues);
    } else {
      setFieldValue("categories", [...values.categories, categoryId]);
    }
  };

  useEffect(() => {
    if (!loading && data) {
      setDefaultValues(data.categoryList.data);
    }
  }, [loading, data]);

  if (!defaultValues?.length) return <LoadingIndicator />;

  return (
    <>
    <View style={styles.headerTitle}>
      <Text heading2 bold>{tr("Host Type")}</Text>
      <Text type="grey3">{tr("Determine the type of space and your hosting environment.")}</Text>
    </View>

      {defaultValues?.map((category, index) => (
        <>
          <Card
            key={index}
            containerStyle={
              values.categories?.includes(category.id)
                ? styles.selectedCard(theme)
                : styles.nonSelectedCard
            }>
            <Pressable onPress={() => handlePress(category.id)}>
              <Container style={styles.CheckBox}>
                <CheckBox
                  checked={values.categories?.includes(category.id)}
                  disabled
                  title={category.name}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checkedColor={theme.colors.black}
                  disabledTitleStyle={{color:theme.colors.black}}
                />
              </Container>
            </Pressable>
          </Card>
          <WhiteSpace />
        </>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  selectedCard: theme => ({
    borderColor: theme.colors.black,
    borderWidth: 1,
  }),
  nonSelectedCard: {
    borderColor: "transparent",
    borderWidth: 1,
  },
  headerTitle:{gap:5},
  CheckBox:{paddingVertical:10}
});
export default TabHostType;
