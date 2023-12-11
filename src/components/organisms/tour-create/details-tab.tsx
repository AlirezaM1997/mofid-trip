import WhiteSpace from "@atoms/white-space";
import { Input, Text } from "@rneui/themed";
import { TourAddInputType } from "@src/gql/generated";
import useTranslation from "@src/hooks/translation";
import { useFormikContext } from "formik";
import { StyleSheet } from "react-native";

const DetailsTab = () => {
  const { tr } = useTranslation();
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<TourAddInputType>();

  return (
    <>
      <Text heading2 bold>
        {tr("Tour title and details")}
      </Text>
      <Text type="grey3">
        {tr("To find a tour, address and information about a tour for travelers in Nuwayside.")}
      </Text>
      <WhiteSpace size={20} />

      <Input
        name="title"
        placeholder={tr("Tour Title")}
        textAlignVertical="top"
        onChangeText={handleChange("title")}
        onBlur={handleBlur("title")}
        value={values?.title}
        errorMessage={touched?.title && (errors?.title as string)}
      />
      <Input
        name="description"
        placeholder={tr("Tour Details")}
        onChangeText={handleChange("description")}
        onBlur={handleBlur("description")}
        value={values?.description}
        errorMessage={touched?.description && (errors?.description as string)}
        textAlignVertical="top"
        multiline={true}
        numberOfLines={4}
      />
    </>
  );
};

const styles = StyleSheet.create({
  formikContainer: {},
});

export default DetailsTab;
