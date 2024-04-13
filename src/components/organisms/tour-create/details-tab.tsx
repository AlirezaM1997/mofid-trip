import WhiteSpace from "@atoms/white-space";
import { Input, Text } from "@rneui/themed";
import { TourAddInputType } from "@src/gql/generated";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { useFormikContext } from "formik";
import { StyleSheet } from "react-native";

const DetailsTab = () => {
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();

  const { values, setFieldValue, errors, touched, handleBlur } =
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
        onChangeText={txt => {
          setFieldValue("title", localizeNumber(txt));
        }}
        onBlur={handleBlur("title")}
        value={values.title?.toString()}
        errorMessage={touched?.title && (errors?.title as string)}
      />

      <Input
        name="description"
        placeholder={tr("Tour Details")}
        textAlignVertical="top"
        onChangeText={txt => {
          setFieldValue("description", localizeNumber(txt));
        }}
        onBlur={handleBlur("description")}
        value={values?.description}
        errorMessage={touched?.description && (errors?.description as string)}
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
