import WhiteSpace from "@atoms/white-space";
import { Input, Text } from "@rneui/themed";
import { ProjectAddInputType } from "@src/gql/generated";
import useTranslation from "@src/hooks/translation";
import { useFormikContext } from "formik";

const TabDetails = () => {
  const { tr } = useTranslation();
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<ProjectAddInputType>();

  return (
    <>
      <Text heading2 bold>
        {tr("Host title and details")}
      </Text>
      <Text type="grey3">
        {tr("To find a host, address and information about a host for travelers in Nuwayside.")}
      </Text>
      <WhiteSpace size={20} />

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

export default TabDetails;
