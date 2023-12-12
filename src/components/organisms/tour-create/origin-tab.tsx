import WhiteSpace from "@atoms/white-space";
import LocationPicker from "@modules/formik/fields/location-picker";
import useTranslation from "@src/hooks/translation";
import { Input, Text } from "@rneui/themed";
import { TourAddInputType } from "@src/gql/generated";
import { Field, useFormikContext } from "formik";

const OriginTab = () => {
  const { tr } = useTranslation();
  const { values, handleChange, handleBlur, touched, errors } =
    useFormikContext<TourAddInputType>();

  return (
    <>
      <Text heading2 bold>
        {tr("Place of movement")}
      </Text>
      <Text type="grey3">
        {tr(
          "To easily find the origin and start the tour, set the address and the map of the place of departure."
        )}
      </Text>
      <WhiteSpace size={20} />
      <Input
        name="address"
        placeholder={tr("Address")}
        textAlignVertical="top"
        onChangeText={handleChange("origin.address")}
        onBlur={handleBlur("origin.address")}
        value={values?.origin?.address}
        errorMessage={touched?.origin?.address && (errors?.origin?.address as string)}
      />
      <Field name="lat" component={LocationPicker} />
    </>
  );
};

export default OriginTab;
