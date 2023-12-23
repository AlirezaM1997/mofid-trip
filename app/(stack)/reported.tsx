import { View } from "react-native";
import React from "react";
import { FieldArray, Formik } from "formik";
import { CheckBox } from "@rneui/themed";

const Page = () => {
  const initialValues = {
    checked: [false, true, false],
  };
  return (
    <Formik initialValues={initialValues} onSubmit={values => console.log(values)}>
      {({ handleChange, setFieldValue, handleSubmit, values }) => (
        <FieldArray name="checked">
          {fieldArrayProps => {
            console.log(fieldArrayProps);
            const { push, replace, form } = fieldArrayProps;
            const { values } = form;
            const { checked } = values;
            console.log('====================================');
            console.log(checked);
            console.log('====================================');
            return (
              <View>
                {checked.map((checked, index) => (
                  <View key={index}>
                    <CheckBox
                      checked={checked}
                      name={`checked[${index}]`}
                      onPress={() => replace(index, !checked)}
                    />
                  </View>
                ))}
              </View>
            );
          }}
        </FieldArray>
      )}
    </Formik>
  );
};

export default Page;
