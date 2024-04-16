import WhiteSpace from "@atoms/white-space";
import { Input, Text } from "@rneui/themed";
import { Field, useFormikContext } from "formik";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { TourAddInputType } from "@src/gql/generated";
import LocationPicker from "@modules/formik/fields/location-picker";

const DestinationTab = () => {
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();

  const { setFieldValue, values, touched, errors, handleBlur } =
    useFormikContext<TourAddInputType>();

  return (
    <>
      <Text heading2 bold>
        {tr("tour destination")}
      </Text>
      <Text type="grey3">{tr("choose the final destination of your tour")}</Text>
      <WhiteSpace size={20} />
      <Input
        name="province"
        placeholder={tr("Province")}
        textAlignVertical="top"
        onChangeText={txt => {
          setFieldValue("destination.province", localizeNumber(txt));
        }}
        onBlur={handleBlur("destination.province")}
        value={values?.destination?.province as string}
        errorMessage={(touched?.destination?.province && errors?.destination?.province) as string}
      />
      <Input
        name="city"
        placeholder={tr("City")}
        textAlignVertical="top"
        onChangeText={txt => {
          setFieldValue("destination.city", localizeNumber(txt));
        }}
        onBlur={handleBlur("destination.city")}
        value={values?.destination?.city as string}
        errorMessage={(touched?.destination?.city && errors?.destination?.city) as string}
      />
      <Input
        name="address"
        placeholder={tr("Address")}
        textAlignVertical="top"
        onChangeText={txt => {
          setFieldValue("destination.address", localizeNumber(txt));
        }}
        onBlur={handleBlur("destination.address")}
        value={values?.destination?.address}
        errorMessage={(touched?.destination?.address && errors?.destination?.address) as string}
      />
      <Field latName="destination.lat" lngName="destination.lng" component={LocationPicker} />
    </>
  );
};

export default DestinationTab;
