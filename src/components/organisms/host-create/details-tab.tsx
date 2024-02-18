import { Input, Text } from "@rneui/themed";
import { ProjectAddInputType } from "@src/gql/generated";
import useTranslation from "@src/hooks/translation";
import { useFormikContext } from "formik";
import { StyleSheet, View } from "react-native";

const TabDetails = () => {
  const { tr } = useTranslation();
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<ProjectAddInputType>();

  return (
    <>
      <View style={styles.headerTitle}>
        <Text heading2 bold>
          {tr("Host title and details")}
        </Text>
        <Text type="grey3">
          {tr("To find a host, address and information about a host for travelers in Nuwayside.")}
        </Text>
      </View>

      <Input
        name="name"
        placeholder={tr("Host Title")}
        textAlignVertical="top"
        onChangeText={handleChange("name")}
        onBlur={handleBlur("name")}
        value={values.name}
        errorMessage={touched.name && (errors.name as string)}
      />
      <Input
        name="description"
        placeholder={tr("Host Details")}
        onChangeText={handleChange("description")}
        onBlur={handleBlur("description")}
        value={values.description}
        errorMessage={touched.description && (errors.description as string)}
        textAlignVertical="top"
        multiline={true}
        numberOfLines={4}
      />
    </>
  );
};
const styles = StyleSheet.create({
  headerTitle: { gap: 5, marginBottom: 20 },
});

export default TabDetails;
