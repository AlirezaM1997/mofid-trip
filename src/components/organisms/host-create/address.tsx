import WhiteSpace from "@atoms/white-space";
import useTranslation from "@src/hooks/translation";
import { Input, Text } from "@rneui/themed";
import { ProjectAddInputType } from "@src/gql/generated";
import { Field, useFormikContext } from "formik";
import LocationPickerHost from "@modules/formik/fields/location-picker-host";

const TabAddress = () => {
  const { tr } = useTranslation();
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<ProjectAddInputType>();

  return (
    <>
      <Text heading2 bold>
        {tr("Place of movement")}
      </Text>
      <Text type="grey3">
        {tr(
          "To easily find the origin and start the host, set the address and the map of the place of departure."
        )}
      </Text>
      <WhiteSpace size={20} />
      <Input
        name="province"
        placeholder={tr("Province")}
        textAlignVertical="top"
        onChangeText={handleChange("accommodation.province")}
        onBlur={handleBlur("accommodation.province")}
        value={values?.accommodation?.province}
        errorMessage={
          touched?.accommodation?.province && (errors?.accommodation?.province as string)
        }
      />
      <Input
        name="city"
        placeholder={tr("City")}
        textAlignVertical="top"
        onChangeText={handleChange("accommodation.city")}
        onBlur={handleBlur("accommodation.city")}
        value={values.accommodation.city}
        errorMessage={touched?.accommodation?.city && (errors?.accommodation?.city as string)}
      />
      <Input
        name="address"
        placeholder={tr("Address")}
        textAlignVertical="top"
        onChangeText={handleChange("accommodation.address")}
        onBlur={handleBlur("accommodation.address")}
        value={values.accommodation.address}
        errorMessage={touched?.accommodation?.address && (errors?.accommodation?.address as string)}
      />
      <Field name="lat" component={LocationPickerHost} />
    </>
  );
};

export default TabAddress;
