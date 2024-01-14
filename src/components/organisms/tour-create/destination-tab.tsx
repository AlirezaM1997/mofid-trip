import WhiteSpace from "@atoms/white-space";
import LocationPicker from "@modules/formik/fields/location-picker";
import { Input, Text } from "@rneui/themed";
import { TourAddInputType } from "@src/gql/generated";
import useTranslation from "@src/hooks/translation";
import { Field, useFormikContext } from "formik";

const DestinationTab = () => {
  const { tr } = useTranslation();
  const { handleChange, values, touched, errors, handleBlur } = useFormikContext<TourAddInputType>();

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
        name="province"
        placeholder={tr("Province")}
        textAlignVertical="top"
        onChangeText={handleChange("destination.province")}
        onBlur={handleBlur("destination.province")}
        value={values?.destination?.province}
        errorMessage={touched?.destination?.province && (errors?.destination?.province as string)}
      />
      <Input
        name="city"
        placeholder={tr("City")}
        textAlignVertical="top"
        onChangeText={handleChange("destination.city")}
        onBlur={handleBlur("destination.city")}
        value={values?.destination?.city}
        errorMessage={touched?.destination?.city && (errors?.destination?.city as string)}
      />
      <Input
        name="address"
        placeholder={tr("Address")}
        textAlignVertical="top"
        onChangeText={handleChange("destination.address")}
        onBlur={handleBlur("destination.address")}
        value={values?.destination?.address}
        errorMessage={touched?.destination?.address && (errors?.destination?.address as string)}
      />
      <Field latName="destination.lat" lngName="destination.lng" component={LocationPicker} />
    </>
  );
};

export default DestinationTab;
